export const feeServices = [
  ["survey", "Measured survey"],
  ["planning", "Design and planning package"],
  ["building", "Building Regulations package"],
] as const;

export const feeProjectTypes = [
  { value: "single-storey-extension", label: "Single-storey extension", field: "singleStorey", uplift: 0, metric: "area" },
  { value: "two-storey-extension", label: "Two-storey extension", field: "twoStorey", uplift: 20, metric: "area" },
  { value: "wraparound-extension", label: "Wrap-around extension", field: "wraparound", uplift: 15, metric: "area" },
  { value: "loft", label: "Loft conversion", field: "loft", uplift: 5, metric: "area" },
  { value: "remodelling", label: "Internal remodelling", field: "remodelling", uplift: 0, metric: "area" },
  { value: "garden-room", label: "Garden room", field: "gardenRoom", uplift: -10, metric: "area" },
  { value: "hmo", label: "HMO conversion", field: "hmo", uplift: 20, metric: "bedrooms" },
  { value: "flats", label: "House-to-flats conversion", field: "flats", uplift: 30, metric: "units" },
  { value: "change-of-use", label: "Change of use", field: "changeOfUse", uplift: 30, metric: "area" },
  { value: "newbuild", label: "New-build house", field: "newbuild", uplift: 50, metric: "area" },
  { value: "replacement", label: "Replacement dwelling", field: "replacement", uplift: 45, metric: "area" },
  { value: "development", label: "Small residential development", field: "development", uplift: 80, metric: "units" },
] as const;

export const defaultFeeSettings = {
  survey: 450, planning: 1650, building: 1500,
  discountPercent: 10, rangeReductionPercent: 13,
  fullPlanningPercent: 10, complexPlanningPercent: 22,
  areaOver40Percent: 10, areaOver80Percent: 20, areaOver150Percent: 35,
  perExtraUnitPercent: 18, perExtraBedroomPercent: 8, surveyNonAreaPercent: 15,
  projectUplifts: Object.fromEntries(feeProjectTypes.map(p => [p.field, p.uplift])) as Record<string, number>,
};

export type FeeSettings = typeof defaultFeeSettings;
export type FeeInputs = { type: string; area: number; units: number; bedrooms: number; route: string; selected: readonly string[] };
const record = (value: unknown): Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
const number = (value: unknown, fallback: number, min: number, max: number) => typeof value === "number" && Number.isFinite(value) && value >= min && value <= max ? value : fallback;

// Only allow recognised, finite settings. Missing fields retain the existing fees.
export function resolveFeeSettings(value: unknown): FeeSettings {
  const raw = record(value);
  const result = { ...defaultFeeSettings, projectUplifts: { ...defaultFeeSettings.projectUplifts } };
  for (const key of Object.keys(defaultFeeSettings) as (keyof FeeSettings)[]) {
    if (key === "projectUplifts") continue;
    const isFee = key === "survey" || key === "planning" || key === "building";
    const max = isFee ? 100000 : key === "discountPercent" || key === "rangeReductionPercent" ? 100 : 500;
    result[key] = number(raw[key], defaultFeeSettings[key], 0, max);
  }
  const uplifts = record(raw.projectUplifts);
  for (const project of feeProjectTypes) result.projectUplifts[project.field] = number(uplifts[project.field], project.uplift, -90, 500);
  return result;
}

export const roundFee = (value: number) => Math.round(value / 50) * 50;

export function calculateFees(settings: FeeSettings, input: FeeInputs) {
  const project = feeProjectTypes.find(p => p.value === input.type) ?? feeProjectTypes[0];
  const scale = project.metric === "units" ? 1 + Math.max(0, input.units - 1) * settings.perExtraUnitPercent / 100
    : project.metric === "bedrooms" ? 1 + Math.max(0, input.bedrooms - 4) * settings.perExtraBedroomPercent / 100
    : 1 + (input.area > 150 ? settings.areaOver150Percent : input.area > 80 ? settings.areaOver80Percent : input.area > 40 ? settings.areaOver40Percent : 0) / 100;
  let multiplier = (1 + settings.projectUplifts[project.field] / 100) * scale;
  if (input.route === "full") multiplier *= 1 + settings.fullPlanningPercent / 100;
  if (input.route === "complex") multiplier *= 1 + settings.complexPlanningPercent / 100;
  return feeServices.filter(([key]) => input.selected.includes(key)).map(([key, label]) => {
    const adjusted = roundFee(key === "survey"
      ? settings[key] * (project.metric === "area" ? 1 : 1 + settings.surveyNonAreaPercent / 100)
      : settings[key] * multiplier * (1 - settings.discountPercent / 100));
    return { key, label, adjusted, lower: roundFee(adjusted * (1 - settings.rangeReductionPercent / 100)) };
  });
}
