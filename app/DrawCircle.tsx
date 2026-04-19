"use client";

import { useEffect, useRef } from "react";
import s from "./page.module.css";

export default function DrawCircle() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray  = String(len);
    path.style.strokeDashoffset = String(len);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.animate(
            [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
            { duration: 2600, easing: "cubic-bezier(0.4, 0, 0.25, 1)", fill: "forwards" }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(path.closest("svg")!);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={s.connectCircleSvg}
      viewBox="0 0 100 26"
      preserveAspectRatio="none"
    >
      {/*
        Perfect ellipse via 4-arc cubic bezier (k = 0.5523).
        cx=50 cy=12 rx=46 ry=11.
        Center sits slightly above the mathematical midpoint (13)
        so the text reads as optically centered within the oval.
      */}
      <path
        ref={pathRef}
        d="M 50,1 C 75.4,1 96,5.9 96,12 C 96,18.1 75.4,23 50,23 C 24.6,23 4,18.1 4,12 C 4,5.9 24.6,1 50,1 Z"
        fill="none"
        stroke="#9A1124"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
