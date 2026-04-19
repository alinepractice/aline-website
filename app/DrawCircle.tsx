"use client";

import { useEffect, useRef } from "react";
import s from "./page.module.css";

export default function DrawCircle() {
  const ellipseRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const el = ellipseRef.current;
    if (!el) return;

    const len = el.getTotalLength();
    if (!len) return;

    // Add a small buffer so the stroke always draws past the start point —
    // this guarantees a fully closed oval with no gap at the join.
    const dash = len + 4;
    el.style.strokeDasharray  = `${dash}`;
    el.style.strokeDashoffset = `${dash}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.strokeDashoffset = "0";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        requestAnimationFrame(() => {
          el.style.transition = "stroke-dashoffset 2.4s cubic-bezier(0.4, 0, 0.25, 1)";
          el.style.strokeDashoffset = "0";
        });
        observer.disconnect();
      },
      { threshold: 0.6 }
    );

    observer.observe(el.closest("svg")!);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={s.connectCircleSvg}
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
    >
      <ellipse
        ref={ellipseRef}
        cx="50"
        cy="9"
        rx="47"
        ry="8.5"
        fill="none"
        stroke="#9A1124"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
