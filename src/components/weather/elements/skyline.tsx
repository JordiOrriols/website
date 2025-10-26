import React from "react";

export default function CitySkyline(props: { fill?: string }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-center opacity-30">
      <svg
        viewBox="0 0 800 200"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,200 L0,120 L50,120 L50,80 L80,80 L80,100 L120,100 L120,90 L150,90 L150,120 L200,120 L200,60 L240,60 L240,120 L280,120 L280,70 L310,70 L310,120 L350,120 L350,50 L380,50 L380,120 L420,120 L420,90 L460,90 L460,120 L500,120 L500,40 L530,40 L530,120 L570,120 L570,80 L600,80 L600,120 L650,120 L650,70 L680,70 L680,120 L730,120 L730,90 L760,90 L760,120 L800,120 L800,200 Z"
          fill={props.fill || "#1E293B"}
        />
      </svg>
    </div>
  );
}
