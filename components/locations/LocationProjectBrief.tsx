import Link from "next/link";

type Brief = [string, [string, string][], [string, string][]];
const briefs: Record<string, Brief> = {
  "harborne-architects": [
    "Planning a property refurbishment in Harborne?",
    [
      [
        "Define what the renovation needs to change",
        "If you are researching home refurbishment, start by separating decorative work from changes to the building. New finishes may need a contractor; moving walls, changing the layout or adding space can benefit from architectural design. Bring a list of the rooms that feel cramped, dark or disconnected."
      ],
      [
        "Compare remodelling with an extension",
        "We can test a revised ground-floor layout against a rear or side extension. The comparison considers useful space, circulation and garden access, so you can decide whether extra building work is justified before committing to a larger scheme."
      ]
    ],
    [
      [
        "See the Harborne extension project",
        "/projects/house-extension-in-harborne-birmingham"
      ],
      [
        "Explore architectural fees",
        "/estimate"
      ]
    ]
  ],
  "edgbaston-architects": [
    "House renovations and property refurbishment in Edgbaston",
    [
      [
        "Retain what makes the house worth renovating",
        "Start with the features you want to keep and the practical problems you need to solve. We can explore room connections, kitchen and dining layouts, utility space and garden access together, rather than treating an extension as a separate addition."
      ],
      [
        "Agree the design work before commissioning building work",
        "A refurbishment brief should distinguish architectural changes from repairs, finishes and specialist investigations. We agree the survey, design and drawing stages around that brief. Contractors carry out the building work, with structural and other specialist advice identified separately."
      ]
    ],
    [
      [
        "House renovation and extension design",
        "/services/house-extensions"
      ],
      [
        "Building Regulations drawings",
        "/services/building-regulations"
      ]
    ]
  ],
  "wolverhampton-architects": [
    "Kitchen and house extensions in Wolverhampton",
    [
      [
        "Plan the existing rooms as well as the new space",
        "For a kitchen extension, we test where cooking, dining and sitting will happen, how people move through the house and where utility functions can go. We also consider whether the original middle rooms will still have a useful purpose and sufficient daylight."
      ],
      [
        "Compare single-storey and two-storey options",
        "A ground-floor extension may solve the immediate brief; a two-storey addition needs a coordinated plan for bedrooms, bathrooms and circulation above. We can compare the options before developing the agreed drawings, with structure, roof form and neighbour relationships considered from the outset."
      ]
    ],
    [
      [
        "House extension architectural services",
        "/services/house-extensions"
      ],
      [
        "Understand extension costs",
        "/knowledge-centre/house-extension-costs"
      ]
    ]
  ],
  "sutton-coldfield-architects": [
    "Loft conversion or extension in Sutton Coldfield?",
    [
      [
        "Start with the room you need",
        "A new bedroom, home office or larger family kitchen can suggest very different solutions. We compare the potential of the existing roof and floor plan with an extension, so the brief leads the design rather than an assumed type of building work."
      ],
      [
        "Test the stair before fixing the loft layout",
        "Usable space depends on more than the roof footprint. Our early review considers headroom, stair position and the effect on the floor below. Structural and fire-safety design then need to be coordinated with the agreed architectural scheme."
      ]
    ],
    [
      [
        "Loft conversion design service",
        "/services/loft-conversions"
      ],
      [
        "House extension design service",
        "/services/house-extensions"
      ]
    ]
  ]
};

export function LocationProjectBrief({ slug }: { slug: string }) {
 const brief = briefs[slug];
 if (!brief) return null;
 return <section className="section" style={{background:"#f7f6f2",color:"#303638"}}><div className="shell" style={{paddingBlock:32}}><h2 style={{color:"#303638",fontWeight:450,fontSize:"clamp(26px,3vw,38px)",maxWidth:900}}>{brief[0]}</h2><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,300px),1fr))",gap:32,marginTop:28}}>{brief[1].map(([title,copy])=><div key={title}><h3 style={{color:"#303638",fontSize:21,fontWeight:500}}>{title}</h3><p style={{color:"#454c4c",lineHeight:1.75}}>{copy}</p></div>)}</div><nav aria-label="Related project services" style={{display:"flex",flexWrap:"wrap",gap:24,marginTop:24}}>{brief[2].map(([label,href])=><Link key={href} href={href} style={{color:"#893b24",textDecoration:"underline",textUnderlineOffset:4}}>{label}</Link>)}</nav></div></section>;
}
