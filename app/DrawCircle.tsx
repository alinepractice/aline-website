"use client";

import { useEffect, useRef } from "react";
import s from "./page.module.css";

export default function DrawCircle() {
  const ellipseRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const el = ellipseRef.current;
    if (!el) return;

    const len = el.getTotalLength();
    el.style.strokeDasharray  = String(len);
    el.style.strokeDashoffset = String(len);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.strokeDashoffset = "0";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.animate(
            [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
            { duration: 2600, easing: "cubic-bezier(0.4, 0, 0.25, 1)", fill: "forwards" }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(el.closest("svg")!);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={s.connectCircleSvg}
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
    >
      {/*
        Native <ellipse> — the only SVG primitive that guarantees a
        mathematically perfect curve with zero approximation error.
        cx=50 cy=14 (shifted above the midpoint of 15 for optical balance)
        rx=46 ry=13 — wide, low curvature, generous vertical breathing room
      */}
      <ellipse
        ref={ellipseRef}
        cx="50"
        cy="14"
        rx="46"
        ry="13"
        fill="none"
        stroke="#9A1124"
        strokeWidth="2.2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
