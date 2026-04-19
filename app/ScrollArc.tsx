"use client";

import { useEffect, useRef } from "react";

export default function ScrollArc() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf = 0;

    function update() {
      const path = pathRef.current;
      const svg = svgRef.current;
      if (!path || !svg) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);

      // Ease the progress slightly so arc enters smoothly around mid-scroll
      const raw = Math.min(1, scrollTop / maxScroll);
      const progress = raw * raw * (3 - 2 * raw); // smoothstep

      svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);

      // Arc enters from the bottom ~30% through the page, exits top at ~100%
      const y = vh * 1.1 - progress * (vh * 1.35);

      // Gentle asymmetric wave — left rises, right trails
      const bulge = vh * 0.09;

      const d = `
        M 0,${y + bulge * 0.3}
        Q ${vw * 0.5},${y - bulge} ${vw},${y + bulge * 0.5}
        L ${vw},${vh * 15}
        L 0,${vh * 15}
        Z
      `;
      path.setAttribute("d", d);
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
          <clipPath id="arc-clip" clipPathUnits="userSpaceOnUse">
            <path ref={pathRef} />
          </clipPath>
        </defs>
        {/* Earthier tone — deeper warmth, same family */}
        <rect
          x="0" y="0"
          width="10000" height="10000"
          fill="#e5d9be"
          clipPath="url(#arc-clip)"
        />
      </svg>
    </div>
  );
}
