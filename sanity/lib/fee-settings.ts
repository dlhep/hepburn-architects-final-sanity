import { client } from "./client";
import { isSanityConfigured } from "../env";
import { resolveFeeSettings, type FeeSettings } from "@/lib/fee-settings";

export async function getFeeSettings(): Promise<FeeSettings | null> {
  if (!isSanityConfigured) return resolveFeeSettings(null);
  try {
    // Read only the published singleton. Draft edits must never change public fees.
    const settings = await client.fetch(
      '*[_type == "feeSettings" && _id == "feeSettings"][0]',
      {},
      { perspective: "published", useCdn: false, cache: "no-store", timeout: 8000 },
    );
    return resolveFeeSettings(settings);
  } catch {
    // Do not silently quote the old defaults when saved fees cannot be retrieved.
    console.error("Published fee settings could not be retrieved");
    return null;
  }
}
