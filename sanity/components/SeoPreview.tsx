import { useFormValue, type StringInputProps } from "sanity";

export function SeoPreview(_props: StringInputProps) {
  const title = String(useFormValue(["title"]) || "Untitled project");
  const location = String(useFormValue(["location"]) || "");
  const description = String(useFormValue(["description"]) || "Add a project description to generate the search summary.");
  const slugValue = useFormValue(["slug"]) as { current?: string } | undefined;
  const seoTitle = `${title}${location ? `, ${location}` : ""} | Hepburn Architects`;
  const seoDescription = description.length > 158 ? `${description.slice(0, 155).trim()}…` : description;
  const canonical = `https://www.hepburnarchitects.net/projects/${slugValue?.current || "project-url"}`;

  return (
    <div style={{border: "1px solid #d8d2c8", borderRadius: 12, padding: 18, background: "#fff"}}>
      <div style={{fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#c95d2e", marginBottom: 10}}>Automatic read-only metadata</div>
      <div style={{fontSize: 19, color: "#1a0dab", marginBottom: 4}}>{seoTitle}</div>
      <div style={{fontSize: 13, color: "#188038", marginBottom: 6, wordBreak: "break-all"}}>{canonical}</div>
      <div style={{fontSize: 14, color: "#4d5156", lineHeight: 1.45}}>{seoDescription}</div>
      <div style={{marginTop: 12, fontSize: 12, color: "#777"}}>Title: {seoTitle.length} characters · Description: {seoDescription.length} characters</div>
    </div>
  );
}
