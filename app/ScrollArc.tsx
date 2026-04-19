"use client";

import { useEffect, useRef } from "react";

export default function ScrollArc() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf = 0;

    function smooth(t: number) {
      return t * t * (3 - 2 * t);
    }

    // Build a closed organic oval using 4 cubic bezier curves.
    // Slight asymmetry in control points = organic, not mechanical.
    function ovalPath(
      cx: number,
      cy: number,
      rx: number,
      ry: number
    ): string {
      // Bezier approximation constant for ellipse ≈ 0.5523
      // Vary slightly per quadrant for organic feel
      const kx = rx * 0.555;
      const ky = ry * 0.555;

      return [
        `M ${cx},${cy - ry}`,
        // Right arc (top-right → bottom-right)
        `C ${cx + kx * 0.92},${cy - ry}  ${cx + rx},${cy - ky * 0.88}  ${cx + rx},${cy}`,
        // Bottom arc (bottom-right → bottom-left) — curves UPWARD
        `C ${cx + rx},${cy + ky * 1.06}  ${cx + kx * 0.88},${cy + ry}  ${cx},${cy + ry}`,
        // Left arc (bottom-left → top-left)
        `C ${cx - kx * 0.95},${cy + ry}  ${cx - rx},${cy + ky * 0.94}  ${cx - rx},${cy}`,
        // Top arc (top-left → top-right)
        `C ${cx - rx},${cy - ky * 0.98}  ${cx - kx * 0.9},${cy - ry}  ${cx},${cy - ry}`,
        "Z",
      ].join(" ");
    }

    function update() {
      const path = pathRef.current;
      const svg = svgRef.current;
      if (!path || !svg) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const raw = Math.min(1, scrollTop / maxScroll);

      svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);

      // Oval dimensions — wide enough to bleed off screen edges,
      // tall enough to create soft transitions as it sweeps through
      const rx = vw * 0.56 + 140; // bleeds off both sides → only top/bottom arcs visible
      const ry = vh * 1.05;        // slightly taller than viewport

      // Center X: slightly left of center for organic asymmetry
      const cx = vw * 0.49;

      // Center Y: oval enters from below, sweeps through mid-scroll, exits above
      // - raw 0:    centerY = 2.25vh  → top of oval at 1.2vh (just below viewport)
      // - raw 0.3:  entering viewport from bottom
      // - raw 0.55: centered in viewport — peak of darker zone
      // - raw 0.8:  exiting above viewport
      // - raw 1.0:  completely above viewport → background returns to base
      const centerY = vh * (2.25 - smooth(raw) * 3.4);

      path.setAttribute("d", ovalPath(cx, centerY, rx, ry));
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
          <clipPath id="oval-clip" clipPathUnits="userSpaceOnUse">
            <path ref={pathRef} />
          </clipPath>
        </defs>

        {/* Earthy mid-scroll tone — contained within the organic oval */}
        <rect
          x="0" y="0"
          width="10000" height="10000"
          fill="#e5d9be"
          clipPath="url(#oval-clip)"
        />
      </svg>
    </div>
  );
}
