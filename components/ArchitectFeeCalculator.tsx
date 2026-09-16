"use client";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { LeadGate } from "@/components/LeadGate";
import { feeBand, trackEvent } from "@/lib/analytics";
import { useEffect, useRef } from "react";

import { calculateFees, feeServices as services, feeProjectTypes as projectTypes, type FeeSettings } from "@/lib/fee-settings";

const formatCurrency = (value: number) => `£${value.toLocaleString("en-GB")}`;
const formatRange = (lower: number, upper: number) => `${formatCurrency(lower)}–${formatCurrency(upper)}`;

export function ArchitectFeeCalculator({ settings }: { settings: FeeSettings }){
  const started = useRef(false);
  const [type,setType]=useState("single-storey-extension");
  const [area,setArea]=useState(30);
  const [units,setUnits]=useState(2);
  const [bedrooms,setBedrooms]=useState(5);
  const [route,setRoute]=useState("straightforward");
  const [selected,setSelected]=useState<string[]>(["planning","building"]);
  const current=projectTypes.find(x=>x.value===type)??projectTypes[0];

  const breakdown = calculateFees(settings, { type, area, units, bedrooms, route, selected });

  const totalLower=breakdown.reduce((s,x)=>s+x.lower,0);
  const totalUpper=breakdown.reduce((s,x)=>s+x.adjusted,0);
  const totalRange=breakdown.length?formatRange(totalLower,totalUpper):"No services selected";
  const scaleSummary=current.metric==="units"?`${units} residential unit${units===1?"":"s"}`:current.metric==="bedrooms"?`${bedrooms} HMO bedrooms`:`${area} m²`;

  useEffect(() => { if (started.current) return; started.current = true; trackEvent("fee_calculator_start", { project_type: current.value, step_number: 1, page_path: window.location.pathname }); }, [current.value]);
  useEffect(() => { if (started.current) trackEvent("fee_calculator_step", { project_type: current.value, selected_services: selected.join(","), step_number: 1, page_path: window.location.pathname }); }, [current.value, selected]);

  return <div className="fee-tool" data-track-location="calculator">
    <div className="fee-form">
      <label>Project type<select value={type} onChange={e=>setType(e.target.value)}>{projectTypes.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select></label>
      {current.metric==="area" && <label>Approximate project floor area<div className="area-value" aria-hidden="true">{area} m²</div><input aria-label="Approximate project floor area" aria-valuetext={`${area} square metres`} type="range" min="10" max="300" step="5" value={area} onChange={e=>setArea(Number(e.target.value))}/></label>}
      {current.metric==="units" && <label>Number of proposed homes or flats<div className="area-value" aria-hidden="true">{units}</div><input aria-label="Number of proposed homes or flats" aria-valuetext={`${units} residential units`} type="range" min="1" max="12" value={units} onChange={e=>setUnits(Number(e.target.value))}/></label>}
      {current.metric==="bedrooms" && <label>Proposed HMO bedrooms<div className="area-value" aria-hidden="true">{bedrooms}</div><input aria-label="Number of proposed HMO bedrooms" aria-valuetext={`${bedrooms} HMO bedrooms`} type="range" min="3" max="12" value={bedrooms} onChange={e=>setBedrooms(Number(e.target.value))}/></label>}
      <label>Planning complexity<select value={route} onChange={e=>setRoute(e.target.value)}><option value="straightforward">Straightforward / permitted development</option><option value="full">Full planning application</option><option value="complex">Complex site / previous refusal</option></select></label>
      <fieldset><legend>Services required</legend>{services.map(([key,label])=><label className="check-row" key={key}><input type="checkbox" checked={selected.includes(key)} onChange={()=>setSelected(c=>c.includes(key)?c.filter(i=>i!==key):[...c,key])}/><span>{label}</span></label>)}</fieldset>
      <p className="muted small-copy">Measured survey is optional. Fees remain indicative because access, planning history, heritage, site constraints and specialist information can affect the final scope.</p>
    </div>
    <div className="fee-result"><LeadGate onSuccess={() => trackEvent("fee_calculator_complete", { project_type: current.value, selected_services: selected.join(","), estimated_fee_band: feeBand(totalUpper), step_number: 1, page_path: window.location.pathname })} source="architect-fee" projectSummary={{projectType:current.label,projectScale:scaleSummary,planningComplexity:route,selectedServices:selected.map(k=>services.find(s=>s[0]===k)?.[1]??k),indicativeFee:totalRange}}>
      <small className="eyebrow">Estimated architectural fee range</small><strong className="total">{totalRange}</strong>
      <p>Based on the information selected. A tailored fixed fee will be confirmed after we review the property, brief, planning route and full scope.</p>
      <div className="breakdown">{breakdown.map(x=><div key={x.key}><span>{x.label}</span><strong>{formatRange(x.lower,x.adjusted)}</strong></div>)}</div>
      <div className="include"><div className="include-heading"><CheckCircle2/>Included</div><ul><li>Architect consultation and project review</li><li>Selected design, planning and technical stages</li><li>Reasonable revisions within the appointed stage</li><li>Planning coordination where selected</li></ul></div>
      <div className="include"><div className="include-heading"><XCircle/>Usually excluded</div><ul><li>Structural engineer and specialist consultant fees</li><li>Authority application charges</li><li>Ecology, trees, drainage and flood-risk reports</li><li>Party Wall, SAP and warranty costs</li></ul></div>
      <div className="notice">Indicative guide only. This is not a quotation or contractual offer.</div>
    </LeadGate></div>
  </div>
}
