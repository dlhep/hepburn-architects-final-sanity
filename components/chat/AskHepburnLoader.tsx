"use client";

import dynamic from "next/dynamic";

const AskHepburn = dynamic(() => import("./AskHepburn"), { ssr: false });

export function AskHepburnLoader() {
  return <AskHepburn />;
}
