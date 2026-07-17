"use client";

import { useState } from "react";
import { MoveHorizontal } from "lucide-react";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  title: string;
  location: string;
};

export function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  title,
  location,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(52);

  return (
    <article className="before-after-card">
      <div className="before-after-stage">
        <img className="before-image" src={before} alt={beforeAlt} loading="lazy" />
        <div
          className="after-image-wrap"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img className="after-image" src={after} alt={afterAlt} loading="lazy" />
        </div>

        <div className="before-label">Before</div>
        <div className="after-label">After</div>
        <div className="slider-divider" style={{ left: `${position}%` }}>
          <span><MoveHorizontal size={18} /></span>
        </div>

        <input
          className="before-after-range"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Compare before and after images for ${title}`}
        />
      </div>
      <div className="before-after-copy">
        <small>{location}</small>
        <h2>{title}</h2>
        <p>
          Drag the control to compare the existing property with an illustrative
          architectural transformation.
        </p>
      </div>
    </article>
  );
}
