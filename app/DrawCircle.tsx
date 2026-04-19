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
      viewBox="0 0 100 22"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M 51,2 C 74,1 97,5.5 97.5,11 C 97,16.5 73,20.5 49,20 C 25,20.5 3,16 2.5,11 C 3,5.5 28,1.5 51,2 Z"
        fill="none"
        stroke="#9A1124"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
