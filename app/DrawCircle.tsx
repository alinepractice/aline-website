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

    // Start invisible
    el.style.strokeDasharray  = `${len}`;
    el.style.strokeDashoffset = `${len}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.strokeDashoffset = "0";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // rAF ensures the browser has painted the hidden state
        // before the transition begins
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
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
    >
      <ellipse
        ref={ellipseRef}
        cx="50"
        cy="14"
        rx="46"
        ry="13"
        fill="none"
        stroke="#9A1124"
        strokeWidth="0.6"
      />
    </svg>
  );
}
