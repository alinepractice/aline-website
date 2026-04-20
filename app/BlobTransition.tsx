"use client";

import { useEffect, useRef } from "react";

// Heading split into phrases — each settles independently as you scroll
const PHRASES = [
  { text: "At",           start: 0.08 },
  { text: "Aline,",       start: 0.17 },
  { text: "we are",       start: 0.27 },
  { text: "relationship", start: 0.38 },
  { text: "driven.",      start: 0.50 },
];

const DUR   = 0.18; // each phrase takes 18% of scroll-progress to fully resolve
const ease3 = (t: number) => 1 - (1 - t) ** 3;

export default function BlobTransition() {
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Respect reduced-motion: show all words immediately, skip scroll binding
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spanRefs.current.forEach(w => {
        if (!w) return;
        w.style.opacity   = "1";
        w.style.transform = "none";
        w.style.filter    = "none";
      });
      return;
    }

    let raf        = 0;
    let lastScroll = -1;

    function update() {
      const scroll = window.scrollY;
      if (scroll === lastScroll) return;
      lastScroll = scroll;

      const zone = document.querySelector<HTMLElement>("[data-transition-zone]");
      if (!zone) return;

      const scrollZone = zone.offsetHeight - window.innerHeight;
      const progress   = scrollZone > 0
        ? Math.min(1, Math.max(0, scroll / scrollZone))
        : 0;

      // Logo dissolves in the first 45% of the transition
      const logo = document.querySelector<SVGSVGElement>("[data-hero-logo]");
      if (logo) {
        logo.style.opacity = `${Math.max(0, 1 - progress / 0.45)}`;
      }

      // Phrases form progressively, then gently fade out in the last 15%
      // so the sticky zone exits cleanly into the real values section
      const fadeOut = progress > 0.85 ? (1 - progress) / 0.15 : 1;

      spanRefs.current.forEach((w, i) => {
        if (!w) return;
        const raw = Math.min(1, Math.max(0, (progress - PHRASES[i].start) / DUR));
        const t   = ease3(raw);
        w.style.opacity   = `${t * fadeOut}`;
        w.style.transform = `translateY(${(1 - t) * 18}px)`;
        w.style.filter    = `blur(${(1 - t) * 5}px)`;
      });
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      const logo = document.querySelector<SVGSVGElement>("[data-hero-logo]");
      if (logo) logo.style.opacity = "1";
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position:       "absolute",
        inset:          0,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        pointerEvents:  "none",
        zIndex:         5,
      }}
    >
      <p
        style={{
          fontSize:      "clamp(1.12rem, 2.3vw, 1.38rem)",
          fontWeight:    300,
          lineHeight:    1.45,
          letterSpacing: "0.01em",
          textAlign:     "center",
          maxWidth:      "580px",
          padding:       "0 clamp(1.5rem, 5vw, 6rem)",
          color:         "rgba(0, 0, 0, 0.82)",
          margin:        0,
        }}
      >
        {PHRASES.map(({ text }, i) => (
          <span
            key={i}
            ref={el => { spanRefs.current[i] = el; }}
            style={{ display: "inline", opacity: 0, willChange: "opacity, transform, filter" }}
          >
            {text}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}
