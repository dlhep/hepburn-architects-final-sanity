import { absoluteUrl } from "./utils";

export function structuredImage(url?: string) {
  if (!url) return undefined;
  return url.startsWith("https://") ? url : absoluteUrl(url);
}
