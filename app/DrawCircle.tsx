"use client";

import { useEffect, useRef } from "react";
import s from "./page.module.css";

// Same path drawn 3× — wide faint halo, mid glow, thin crisp core —
// with a tiny blur applied to the group. Layering creates the soft
// pressure-variation you get from a real brush or felt-tip marker.
const PATH =
  "M 51,2 C 74,1 97,5.5 97.5,11 C 97,16.5 73,20.5 49,20 C 25,20.5 3,16 2.5,11 C 3,5.5 28,1.5 51,2 Z";

export default function DrawCircle() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
    // All three paths share the same shape so getTotalLength is the same for each
    const len = paths[0].getTotalLength();

    paths.forEach((p) => {
      p.style.strokeDasharray  = String(len);
      p.style.strokeDashoffset = String(len);
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paths.forEach((p) => (p.style.strokeDashoffset = "0"));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          paths.forEach((p) =>
            p.animate(
              [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
              {
                duration: 2600,
                easing: "cubic-bezier(0.4, 0, 0.25, 1)",
                fill: "forwards",
              }
            )
          );
          observer.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={s.connectCircleSvg}
      viewBox="0 0 100 22"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Gentle blur softens the layered strokes into one brush-like mark */}
        <filter id="brush-soft" x="-8%" y="-40%" width="116%" height="180%">
          <feGaussianBlur stdDeviation="0.3" />
        </filter>
      </defs>

      <g filter="url(#brush-soft)" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer halo — wide, barely-there */}
        <path d={PATH} fill="none" stroke="#9A1124" strokeWidth="3.2" opacity="0.06" />
        {/* Mid body — medium weight, soft */}
        <path d={PATH} fill="none" stroke="#9A1124" strokeWidth="1.1" opacity="0.20" />
        {/* Core line — thin and crisp */}
        <path d={PATH} fill="none" stroke="#9A1124" strokeWidth="0.38" opacity="0.90" />
      </g>
    </svg>
  );
}
