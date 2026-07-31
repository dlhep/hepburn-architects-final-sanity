import "server-only";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 10;
const buckets = new Map<string, number[]>();

export function checkChatRateLimit(identifier: string) {
  const now = Date.now();
  const recent = (buckets.get(identifier) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return false;
  recent.push(now);
  buckets.set(identifier, recent);
  if (buckets.size > 2_000) {
    for (const [key, times] of buckets) {
      if (!times.some((time) => now - time < WINDOW_MS)) buckets.delete(key);
    }
  }
  return true;
}
