"use client";

import { useState } from "react";
import { useFormValue } from "sanity";
import { calculateFees, feeProjectTypes, feeServices, resolveFeeSettings } from "@/lib/fee-settings";

const money = (value: number) => `£${value.toLocaleString("en-GB")}`;
const control = { padding: "10px", width: "100%", font: "inherit", boxSizing: "border-box" as const };

export function FeePreview() {
  const settings = resolveFeeSettings(useFormValue([]));
  const [type, setType] = useState("single-storey-extension");
  const [scale, setScale] = useState(30);
  const [route, setRoute] = useState("straightforward");
  const [selected, setSelected] = useState<string[]>(["planning", "building"]);
  const project = feeProjectTypes.find(p => p.value === type) ?? feeProjectTypes[0];
  const rows = calculateFees(settings, { type, area: scale, units: scale, bedrooms: scale, route, selected });
  const total = rows.reduce((sum, row) => sum + row.adjusted, 0);
  const lower = rows.reduce((sum, row) => sum + row.lower, 0);
  const showRange = true;
  return <div style={{ padding: 16, border: "1px solid #8886", borderRadius: 8, fontSize: 16, lineHeight: 1.5 }}>
    <p style={{ marginTop: 0 }}><strong>Try your fees before publishing</strong></p>
    <p>Preview uses the values you are editing. Visitors see your last published fees. Click Publish when ready, then reload the fee calculator. These settings apply only to this website.</p>
    <div style={{ display: "grid", gap: 12 }}>
      <label>Project type<select style={control} value={type} onChange={e => { setType(e.target.value); const p = feeProjectTypes.find(p => p.value === e.target.value); setScale(p?.metric === "area" ? 30 : p?.metric === "bedrooms" ? 5 : 2); }}>{feeProjectTypes.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}</select></label>
      <label>{project.metric === "area" ? "Project floor area (m²)" : project.metric === "bedrooms" ? "HMO bedrooms" : "Proposed homes / flats"}<input style={control} type="number" min={project.metric === "area" ? 10 : project.metric === "bedrooms" ? 3 : 1} max={project.metric === "area" ? 300 : 12} value={scale} onChange={e => { const min = project.metric === "area" ? 10 : project.metric === "bedrooms" ? 3 : 1; setScale(Math.max(min, Math.min(project.metric === "area" ? 300 : 12, Number(e.target.value)))); }} /></label>
      <label>Planning complexity<select style={control} value={route} onChange={e => setRoute(e.target.value)}><option value="straightforward">Straightforward / permitted development</option><option value="full">Full planning application</option><option value="complex">Complex site / previous refusal</option></select></label>
      <fieldset style={{ margin: 0, padding: 12 }}><legend>Services</legend>{feeServices.map(([key, label]) => <label key={key} style={{ display: "block" }}><input type="checkbox" checked={selected.includes(key)} onChange={() => setSelected(current => current.includes(key) ? current.filter(k => k !== key) : [...current, key])} /> {label}</label>)}</fieldset>
    </div>
    <div aria-live="polite" style={{ marginTop: 16 }}>
      {rows.map(row => <div key={row.key} style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, padding: "6px 0" }}><span>{row.label}</span><strong>{showRange ? `${money(row.lower)}–` : ""}{money(row.adjusted)}</strong></div>)}
      <p><strong>Estimated total: {rows.length ? `${showRange ? `${money(lower)}–` : ""}${money(total)}` : "No services selected"}</strong></p>
    </div>
    <p style={{ marginBottom: 0 }}>Planning and Building Regulations: base fee × project adjustment × size adjustment × planning complexity × discount. Survey has a separate uplift for HMOs and multi-unit schemes. Each fee is rounded to the nearest £50.</p>
  </div>;
}
