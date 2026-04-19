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
      const progress = Math.min(1, scrollTop / maxScroll);

      // Update SVG dimensions to match viewport
      svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);

      // Arc Y: starts just below viewport (fully hidden), sweeps past top as you scroll
      const y = vh * 1.08 - progress * (vh * 1.25);

      // Curve bulge — gentle wave, slightly asymmetric for organic feel
      const bulge = vh * 0.13;

      // Quadratic bezier arc, fills downward
      const d = `
        M 0,${y}
        Q ${vw * 0.45},${y - bulge} ${vw},${y + bulge * 0.4}
        L ${vw},${vh * 12}
        L 0,${vh * 12}
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
        {/* Slightly deeper warm tone — same family as #f3eeda */}
        <rect
          x="0"
          y="0"
          width="10000"
          height="10000"
          fill="#e8dfc8"
          clipPath="url(#arc-clip)"
        />
      </svg>
    </div>
  );
}
