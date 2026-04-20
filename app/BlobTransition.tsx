"use client";

import { useEffect, useRef } from "react";

const PHRASES = [
  { text: "At",           start: 0.06 },
  { text: "Aline,",       start: 0.14 },
  { text: "we are",       start: 0.22 },
  { text: "relationship", start: 0.30 },
  { text: "driven.",      start: 0.40 },
];
const PHRASE_DUR = 0.16;

const ease3  = (t: number) => 1 - (1 - t) ** 3;
const clamp  = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const appear = (prog: number, start: number, dur = 0.13) =>
  ease3(clamp((prog - start) / dur, 0, 1));

export default function BlobTransition() {
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bodyRef  = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLParagraphElement>(null);
  const gridRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reduced-motion: show everything immediately, skip animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spanRefs.current.forEach(w => {
        if (!w) return;
        w.style.opacity   = "1";
        w.style.transform = "none";
        w.style.filter    = "none";
      });
      [bodyRef, guideRef, gridRef].forEach(r => {
        if (r.current) {
          r.current.style.opacity   = "1";
          r.current.style.transform = "none";
        }
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
      const prog       = scrollZone > 0 ? clamp(scroll / scrollZone, 0, 1) : 0;

      // Logo dissolves in first 38% of scroll
      const logo = document.querySelector<SVGSVGElement>("[data-hero-logo]");
      if (logo) logo.style.opacity = `${Math.max(0, 1 - prog / 0.38)}`;

      // Heading phrases form word by word
      spanRefs.current.forEach((w, i) => {
        if (!w) return;
        const t = ease3(clamp((prog - PHRASES[i].start) / PHRASE_DUR, 0, 1));
        w.style.opacity   = `${t}`;
        w.style.transform = `translateY(${(1 - t) * 16}px)`;
        w.style.filter    = `blur(${(1 - t) * 5}px)`;
      });

      // Body paragraph — appears once heading has settled
      if (bodyRef.current) {
        const t = appear(prog, 0.60);
        bodyRef.current.style.opacity   = `${t}`;
        bodyRef.current.style.transform = `translateY(${(1 - t) * 10}px)`;
      }

      // Guide label
      if (guideRef.current) {
        const t = appear(prog, 0.74);
        guideRef.current.style.opacity   = `${t}`;
        guideRef.current.style.transform = `translateY(${(1 - t) * 8}px)`;
      }

      // Values names
      if (gridRef.current) {
        const t = appear(prog, 0.82);
        gridRef.current.style.opacity   = `${t}`;
        gridRef.current.style.transform = `translateY(${(1 - t) * 8}px)`;
      }
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
      <div
        style={{
          maxWidth:  "580px",
          width:     "100%",
          padding:   "0 clamp(1.5rem, 5vw, 6rem)",
          textAlign: "center",
        }}
      >
        {/* Heading — forms word by word */}
        <p
          style={{
            fontSize:      "clamp(1.12rem, 2.3vw, 1.38rem)",
            fontWeight:    300,
            lineHeight:    1.45,
            letterSpacing: "0.01em",
            color:         "rgba(0, 0, 0, 0.82)",
            marginBottom:  "2.5rem",
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

        {/* Guide label — appears after heading */}
        <p
          ref={guideRef}
          style={{
            fontSize:      "0.75rem",
            fontWeight:    400,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         "rgba(0, 0, 0, 0.32)",
            opacity:       0,
            marginBottom:  "2rem",
            willChange:    "opacity, transform",
          }}
        >
          The values that guide our approach
        </p>

        {/* Values */}
        <div
          ref={gridRef}
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap:                 "0 clamp(1rem, 3vw, 2rem)",
            textAlign:           "center",
            opacity:             0,
            marginBottom:        "clamp(3rem, 5vw, 4.5rem)",
            willChange:          "opacity, transform",
          }}
        >
          {["Flexibility", "Independence", "Bravery", "Safe Choices"].map(name => (
            <div
              key={name}
              style={{
                fontSize:   "clamp(1rem, 1.9vw, 1.15rem)",
                fontWeight: 400,
                color:      "rgba(0, 0, 0, 0.82)",
              }}
            >
              {name}
            </div>
          ))}
        </div>

        {/* Body paragraph — appears last */}
        <div
          ref={bodyRef}
          style={{
            fontSize:   "clamp(0.95rem, 1.7vw, 1.05rem)",
            fontWeight: 300,
            lineHeight: 1.85,
            color:      "rgba(0, 0, 0, 0.82)",
            opacity:    0,
            willChange: "opacity, transform",
          }}
        >
          Our work is grounded in connection and in noticing opportunities
          within everyday moments. Growth happens through shared experiences,
          through being present, and in how we respond to one another.
          Learning unfolds within relationships. By staying attuned, we
          recognize meaningful moments and support them with intention. We
          prioritize pausing and tuning in, creating space to better
          understand and respond to each individual&rsquo;s sensory and
          emotional experience. Through respectful presence and shared
          enjoyment, we join in moments and follow the child&rsquo;s lead. By
          honoring individual differences, we support each child&rsquo;s
          unique way of experiencing the world and shape how we align our
          approach across ABA and speech therapy.
        </div>
      </div>
    </div>
  );
}
