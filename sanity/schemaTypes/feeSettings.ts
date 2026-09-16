import { defineField, defineType } from "sanity";
import { defaultFeeSettings, feeProjectTypes } from "@/lib/fee-settings";
import { FeePreview } from "../components/FeePreview";

const percent = (name: string, title: string, description: string, max = 500) => defineField({
  name, title, description, type: "number", group: "adjustments",
  validation: rule => rule.required().min(0).max(max),
});

export const feeSettingsType = defineType({
  name: "feeSettings", title: "Fee Settings", type: "document",
  groups: [
    { name: "fees", title: "Base fees", default: true },
    { name: "projects", title: "Project adjustments" },
    { name: "adjustments", title: "Size, complexity & discount" },
    { name: "preview", title: "Preview estimate" },
  ],
  initialValue: defaultFeeSettings,
  fields: [
    ...([['survey', 'Measured survey (£)'], ['planning', 'Design and planning package (£)'], ['building', 'Building Regulations package (£)']] as const).map(([name, title]) => defineField({
      name, title, type: "number", group: "fees",
      description: name === "survey" ? "Base survey fee. Rounded to the nearest £50. A separate uplift applies to HMOs and multi-unit schemes." : "Base fee before project, size and complexity adjustments and the calculator discount. Use Preview estimate to see the final result.",
      validation: rule => rule.required().min(0).max(100000),
    })),
    defineField({ name: "projectUplifts", title: "Project adjustments (%)", type: "object", group: "projects", description: "0 = base price; 20 = add 20%; -10 = reduce by 10%. These adjustments apply to planning and Building Regulations, not the survey.", validation: rule => rule.required(), fields: feeProjectTypes.map(project => defineField({ name: project.field, title: project.label, type: "number", validation: rule => rule.required().min(-90).max(500) })) }),
    percent("discountPercent", "Calculator discount (%)", "Existing discount: 10%. Applies to planning and Building Regulations after other adjustments. Enter 0 to remove it.", 100),
    percent("rangeReductionPercent", "Fee range: lower-end reduction (%)", "The lower end is this percentage below the calculated fee, rounded to £50. Existing value: 13%.", 100),
    percent("fullPlanningPercent", "Full planning uplift (%)", "Added for a full planning application; existing value: 10%."),
    percent("complexPlanningPercent", "Complex planning uplift (%)", "Used instead of the full planning uplift for complex sites or previous refusals; existing value: 22%."),
    percent("areaOver40Percent", "Area over 40–80 m²: uplift (%)", "Existing value: 10%. Only the matching area band is used."),
    percent("areaOver80Percent", "Area over 80–150 m²: uplift (%)", "Existing value: 20%. Only the matching area band is used."),
    percent("areaOver150Percent", "Area over 150 m²: uplift (%)", "Existing value: 35%. Only the matching area band is used."),
    percent("perExtraUnitPercent", "Each home / flat after the first: uplift (%)", "Used for flat conversions and small developments; existing value: 18% per additional unit."),
    percent("perExtraBedroomPercent", "Each HMO bedroom after four: uplift (%)", "Existing value: 8% per bedroom above four."),
    percent("surveyNonAreaPercent", "Survey uplift for HMO / multi-unit schemes (%)", "Applied to the survey only; existing value: 15%."),
    defineField({ name: "estimatePreview", title: "Preview estimate", type: "string", group: ["fees", "projects", "adjustments", "preview"], readOnly: true, components: { input: FeePreview } }),
  ],
  preview: { prepare: () => ({ title: "Fee Settings", subtitle: "Calculator prices and adjustments" }) },
});
