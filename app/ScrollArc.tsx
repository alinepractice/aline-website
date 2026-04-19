"use client";

import { useEffect, useRef } from "react";

export default function ScrollArc() {
  const maskPathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf = 0;

    function smooth(t: number) {
      return t * t * (3 - 2 * t);
    }

    function update() {
      const maskPath = maskPathRef.current;
      const svg = svgRef.current;
      if (!maskPath || !svg) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollTop = window.scrollY;

      svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);

      const bow = vh * 0.035;

      // Anchor the fade to the actual DOM position of the values section —
      // arc enters from below exactly when "At Aline, we are relationship driven."
      // comes into view, then sweeps upward over ~1.8 viewport heights until fully dark.
      const valuesEl = document.getElementById("values-section");
      const sectionTop = valuesEl
        ? valuesEl.getBoundingClientRect().top + scrollTop
        : vh * 0.92;

      const fadeStart = sectionTop - vh;        // values top at viewport bottom
      const fadeEnd   = sectionTop + vh * 1.8; // fully dark 1.8 viewport-heights later
      const t = Math.max(0, Math.min(1, (scrollTop - fadeStart) / (fadeEnd - fadeStart)));
      const eased = smooth(t);

      const curveY = vh * (1.0 - eased * 1.25);

      // Extend path well beyond viewport sides to prevent blur fringe at edges
      const pad = 800;
      const d = [
        `M ${-pad},${curveY + bow * 0.3}`,
        `C ${vw * 0.28},${curveY - bow}  ${vw * 0.72},${curveY - bow}  ${vw + pad},${curveY + bow * 0.3}`,
        `L ${vw + pad},12000`,
        `L ${-pad},12000`,
        "Z",
      ].join(" ");

      maskPath.setAttribute("d", d);
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
          {/* Vertical-only blur → soft horizontal fade at the arc boundary */}
          <filter id="arc-edge-blur">
            <feGaussianBlur stdDeviation="0 55" />
          </filter>

          {/* Mask: blurred arc shape fills the zone below the curve */}
          <mask
            id="arc-mask"
            maskUnits="userSpaceOnUse"
            x="-1000"
            y="-1000"
            width="30000"
            height="30000"
          >
            <path ref={maskPathRef} fill="white" filter="url(#arc-edge-blur)" />
          </mask>

          {/* Grain: fractal noise for the soft film-texture feel */}
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.68"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>

        {/* Earthy tone — fades in from arc edge, stays dark to bottom */}
        <rect
          x="-800"
          y="-800"
          width="30000"
          height="30000"
          fill="#D1CBB4"
          mask="url(#arc-mask)"
        />

        {/* Grain texture layered over the dark zone */}
        <rect
          x="-800"
          y="-800"
          width="30000"
          height="30000"
          filter="url(#grain)"
          mask="url(#arc-mask)"
          opacity="0.1"
          style={{ mixBlendMode: "soft-light" } as React.CSSProperties}
        />
      </svg>
    </div>
  );
}
