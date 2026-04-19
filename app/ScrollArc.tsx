"use client";

import { useEffect, useRef } from "react";

export default function ScrollArc() {
  const darkPathRef = useRef<SVGPathElement>(null);
  const lightPathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf = 0;

    function update() {
      const darkPath = darkPathRef.current;
      const lightPath = lightPathRef.current;
      const svg = svgRef.current;
      if (!darkPath || !lightPath || !svg) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const raw = Math.min(1, scrollTop / maxScroll);

      svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);

      const smooth = (t: number) => t * t * (3 - 2 * t);

      // ── Arc 1: dark sweeps in from 0% → exits around 65% scroll ──
      const darkRaw = Math.min(1, raw / 0.7);
      const darkP = smooth(darkRaw);
      const darkY = vh * 1.1 - darkP * (vh * 1.35);
      const darkBulge = vh * 0.09;
      darkPath.setAttribute("d", `
        M 0,${darkY + darkBulge * 0.3}
        Q ${vw * 0.5},${darkY - darkBulge} ${vw},${darkY + darkBulge * 0.5}
        L ${vw},${vh * 15} L 0,${vh * 15} Z
      `);

      // ── Arc 2: light sweeps in from 52% → covers dark by 100% ──
      const lightRaw = Math.max(0, (raw - 0.5) / 0.5);
      const lightP = smooth(lightRaw);
      const lightY = vh * 1.1 - lightP * (vh * 1.35);
      const lightBulge = vh * 0.09;
      lightPath.setAttribute("d", `
        M 0,${lightY + lightBulge * 0.3}
        Q ${vw * 0.5},${lightY - lightBulge} ${vw},${lightY + lightBulge * 0.5}
        L ${vw},${vh * 15} L 0,${vh * 15} Z
      `);
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <clipPath id="arc-dark" clipPathUnits="userSpaceOnUse">
            <path ref={darkPathRef} />
          </clipPath>
          <clipPath id="arc-light" clipPathUnits="userSpaceOnUse">
            <path ref={lightPathRef} />
          </clipPath>
        </defs>

        {/* Dark tone — mid-scroll warmth */}
        <rect x="0" y="0" width="10000" height="10000"
          fill="#e5d9be" clipPath="url(#arc-dark)" />

        {/* Light tone — arrival, covers dark on the way down */}
        <rect x="0" y="0" width="10000" height="10000"
          fill="#f5f0e6" clipPath="url(#arc-light)" />
      </svg>
    </div>
  );
}
