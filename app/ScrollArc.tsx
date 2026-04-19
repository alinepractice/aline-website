"use client";

import { useEffect, useRef } from "react";

export default function ScrollArc() {
  const darkPathRef = useRef<SVGPathElement>(null);
  const lightPathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf = 0;

    function smooth(t: number) {
      return t * t * (3 - 2 * t);
    }

    // Build an organic arc path using cubic bezier — asymmetric, oval-like
    function arcPath(vw: number, vh: number, y: number, bulge: number): string {
      // Cubic bezier: control points offset left and right of center
      // creates a wide oval-arc shape, not a perfect circle arc
      const cp1x = vw * 0.28;
      const cp1y = y - bulge * 1.1;
      const cp2x = vw * 0.72;
      const cp2y = y - bulge * 0.7;
      return `
        M 0,${y + bulge * 0.35}
        C ${cp1x},${cp1y} ${cp2x},${cp2y} ${vw},${y + bulge * 0.2}
        L ${vw},${vh * 15}
        L 0,${vh * 15}
        Z
      `;
    }

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

      const bulge = vh * 0.1;

      // Arc 1 — dark tone sweeps in (0–65% of scroll)
      const darkRaw = Math.min(1, raw / 0.68);
      const darkP = smooth(darkRaw);
      const darkY = vh * 1.08 - darkP * (vh * 1.3);
      darkPath.setAttribute("d", arcPath(vw, vh, darkY, bulge));

      // Arc 2 — light return sweeps in (50–100% of scroll), covering dark
      const lightRaw = Math.max(0, (raw - 0.48) / 0.52);
      const lightP = smooth(lightRaw);
      const lightY = vh * 1.08 - lightP * (vh * 1.3);
      lightPath.setAttribute("d", arcPath(vw, vh, lightY, bulge));
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

        {/* Mid-scroll: earthy darker warmth */}
        <rect x="0" y="0" width="10000" height="10000"
          fill="#e5d9be" clipPath="url(#arc-dark)" />

        {/* Return to origin tone — same as page top, completing the loop */}
        <rect x="0" y="0" width="10000" height="10000"
          fill="#f3eeda" clipPath="url(#arc-light)" />
      </svg>
    </div>
  );
}
