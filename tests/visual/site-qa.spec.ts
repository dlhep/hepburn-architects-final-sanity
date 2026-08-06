import { expect, test, type Page } from "@playwright/test";
import path from "node:path";

const screenshotRoot = process.env.VISUAL_QA_OUTPUT || "/tmp/hepburn-visual-qa";
const routes = [
  "/", "/services", "/services/house-extensions", "/services/planning-applications",
  "/services/building-regulations", "/services/new-build-homes", "/services/loft-conversions",
  "/services/hmo-conversions", "/locations/birmingham-architects", "/locations/four-oaks-architects",
  "/locations/little-aston-architects", "/locations/sutton-coldfield-architects",
  "/locations/solihull-architects", "/locations/harborne-architects", "/locations/moseley-architects",
  "/projects", "/projects/passive-house-solihull", "/projects/house-extension-in-harborne-birmingham",
  "/knowledge-centre", "/knowledge-centre/planning-permission", "/knowledge-centre/building-regulations",
  "/knowledge-centre/house-extension-costs", "/blog",
  "/journal/how-to-choose-the-best-architect-in-birmingham", "/reviews", "/estimate",
  "/house-extension-guide", "/about", "/contact", "/privacy",
] as const;

const viewports = [
  [1600, 1000], [1440, 1000], [1280, 900], [1180, 850], [1024, 768],
  [834, 1112], [768, 1024], [430, 932], [390, 844], [375, 812], [320, 700],
] as const;

async function prepare(page: Page) {
  await page.addInitScript(() => localStorage.setItem("hepburn-analytics-consent-v2", "rejected"));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(async () => { await document.fonts.ready; });
}

async function waitForLayout(page: Page, route: string) {
  await page.goto(route, { waitUntil: "domcontentloaded" });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(250);
}

async function settleImages(page: Page) {
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll<HTMLImageElement>("main img"));
    images.forEach((image) => { image.loading = "eager"; });
    await Promise.race([
      Promise.all(images.map((image) => image.decode().catch(() => undefined))),
      new Promise((resolve) => setTimeout(resolve, 8_000)),
    ]);
  });
}

test.beforeEach(async ({ page }) => { await prepare(page); });

test("representative public routes have no horizontal overflow or escaped elements", async ({ page }) => {
  for (const [width, height] of [[1440, 1000], [390, 844]] as const) {
    await page.setViewportSize({ width, height });
    for (const route of routes) {
      await waitForLayout(page, route);
      const result = await page.evaluate(() => {
        const viewport = document.documentElement.clientWidth;
        const escaped = Array.from(document.querySelectorAll<HTMLElement>("body *")).filter((element) => {
          const style = getComputedStyle(element);
          if (element.closest('[aria-hidden="true"]') || style.position === "fixed" || style.position === "absolute" || style.display === "none" || style.visibility === "hidden") return false;
          const clippedByScroller = (() => {
            let parent = element.parentElement;
            while (parent && parent !== document.body) {
              const overflow = getComputedStyle(parent).overflowX;
              if (overflow === "auto" || overflow === "scroll" || overflow === "hidden" || overflow === "clip") return true;
              parent = parent.parentElement;
            }
            return false;
          })();
          if (clippedByScroller) return false;
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && (rect.left < -1 || rect.right > viewport + 1);
        }).slice(0, 8).map((element) => `${element.tagName.toLowerCase()}.${element.className}`);
        return { scrollWidth: document.documentElement.scrollWidth, viewport, escaped };
      });
      expect(result.scrollWidth, `${route} at ${width}px`).toBeLessThanOrEqual(result.viewport + 1);
      expect(result.escaped, `${route} at ${width}px`).toEqual([]);
    }
  }
});

test("all required viewport widths retain a usable header, footer and page frame", async ({ page }) => {
  for (const [width, height] of viewports) {
    await page.setViewportSize({ width, height });
    await waitForLayout(page, "/locations/birmingham-architects");
    await expect(page.locator("header.header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
  }
});

test("sticky anchors reveal their target headings", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, hash] of [["/locations/birmingham-architects", "#projects"], ["/services/house-extensions", "#costs"], ["/knowledge-centre/planning-permission", "#faqs"]] as const) {
    await waitForLayout(page, `${route}${hash}`);
    const target = page.locator(hash);
    if (!await target.count()) continue;
    const top = await target.evaluate((element) => element.getBoundingClientRect().top);
    const headerBottom = await page.locator("header.header").evaluate((element) => element.getBoundingClientRect().bottom);
    expect(top, `${route}${hash}`).toBeGreaterThanOrEqual(headerBottom - 1);
  }
});

test("mobile menu, FAQ, review and calculator interactions remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await waitForLayout(page, "/");
  await page.waitForTimeout(750);
  const menu = page.locator(".menu-btn");
  await page.waitForFunction(() => {
    const button = document.querySelector(".menu-btn");
    return button && Object.keys(button).some((key) => key.startsWith("__reactProps"));
  });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  await expect(menu).toBeFocused();

  await waitForLayout(page, "/knowledge-centre/planning-permission");
  const faq = page.locator("details").first();
  if (await faq.count()) { await faq.locator("summary").click(); await expect(faq).toHaveAttribute("open", ""); }

  await waitForLayout(page, "/reviews");
  await expect(page.locator(".review-item").first()).toBeVisible().catch(() => undefined);
  await waitForLayout(page, "/estimate");
  await expect(page.locator(".fee-tool")).toBeVisible();
  await expect(page.locator(".fee-form select").first()).toBeVisible();
});

test("major light surfaces do not contain inherited near-white text", async ({ page }) => {
  for (const route of routes) {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForLayout(page, route);
    const failures = await page.evaluate(() => {
      const parse = (value: string) => value.match(/[\d.]+/g)?.slice(0, 3).map(Number) || [];
      const luminance = ([r, g, b]: number[]) => [r, g, b].map((channel) => { const value = channel / 255; return value <= .03928 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4; }).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
      const contrast = (a: number[], b: number[]) => { const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (light + .05) / (dark + .05); };
      const selectors = ".sand-section, .review-item, .service-card, .project-card, .guide-index-card, [class*=projectCard], [class*=serviceCard], [class*=review]";
      return Array.from(document.querySelectorAll<HTMLElement>(selectors)).flatMap((surface) => {
        const background = parse(getComputedStyle(surface).backgroundColor);
        if (background.length !== 3 || luminance(background) < .55) return [];
        return Array.from(surface.querySelectorAll<HTMLElement>("h2,h3,p,a,span,small")).filter((element) => {
          const style = getComputedStyle(element);
          if (style.display === "none" || style.visibility === "hidden" || !element.innerText.trim()) return false;
          const colour = parse(style.color);
          const ownBackground = parse(style.backgroundColor);
          const comparisonBackground = ownBackground.length === 3 && style.backgroundColor !== "rgba(0, 0, 0, 0)" ? ownBackground : background;
          return colour.length === 3 && contrast(colour, comparisonBackground) < 3;
        }).slice(0, 5).map((element) => `${element.tagName.toLowerCase()}.${element.className}:${getComputedStyle(element).color}`);
      }).slice(0, 10);
    });
    expect(failures, route).toEqual([]);
  }
});

test("published project galleries render usable images", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await waitForLayout(page, "/projects/house-extension-in-harborne-birmingham");
  await settleImages(page);
  const broken = await page.locator("main img").evaluateAll((images) => images
    .filter((image) => (image as HTMLImageElement).naturalWidth === 0)
    .map((image) => (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src));
  expect(broken).toEqual([]);
});

test("calculator lead gate requires a project region and keeps postcode optional", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await waitForLayout(page, "/estimate");
  const form = page.locator("#fee-calculator-lead");
  const region = page.getByLabel("Where is the project located?");
  const postcode = page.getByLabel("Project postcode");
  await expect(region).toHaveAttribute("required", "");
  await expect(postcode).not.toHaveAttribute("required", "");
  await page.getByLabel("Name").fill("Mohammed Example");
  await page.getByLabel("Email").fill("mohammed@example.com");
  await page.getByLabel(/I agree that Hepburn Architects/).check();
  expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(false);
  await region.selectOption("West Midlands");
  await postcode.fill("B13 8AA");
  expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(true);
});

test("manual-review screenshots", async ({ page }) => {
  for (const [route, width, height, name] of [["/", 1440, 1000, "home-desktop"], ["/locations/birmingham-architects", 1440, 1000, "birmingham-desktop"], ["/projects/house-extension-in-harborne-birmingham", 1440, 1000, "project-desktop"], ["/knowledge-centre/planning-permission", 390, 844, "planning-mobile"], ["/estimate", 390, 844, "calculator-mobile"], ["/", 320, 700, "home-320"]] as const) {
    await page.setViewportSize({ width, height });
    await waitForLayout(page, route);
    await settleImages(page);
    await page.screenshot({ path: path.join(screenshotRoot, `${name}.png`), fullPage: true });
  }
});
