import { planning_extensions } from "./planning-extensions";
import { conversions_development } from "./conversions-development";
import { process_design } from "./process-design";
import { planning_heritage } from "./planning-heritage";

export type { GuideArticle, GuideFaq, GuideSection, GuideSource } from "./types";

export const guideArticles = {
  ...planning_extensions,
  ...conversions_development,
  ...process_design,
  ...planning_heritage,
};

export function getGuideArticle(slug: string) {
  return guideArticles[slug as keyof typeof guideArticles];
}
