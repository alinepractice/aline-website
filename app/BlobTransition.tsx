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

  useEffect(() => {
    // Reduced-motion: show everything immediately, skip animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spanRefs.current.forEach(w => {
        if (!w) return;
        w.style.opacity   = "1";
        w.style.transform = "none";
        w.style.filter    = "none";
      });
      if (bodyRef.current) {
        bodyRef.current.style.opacity   = "1";
        bodyRef.current.style.transform = "none";
      }
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
          maxWidth:  "760px",
          width:     "100%",
          padding:   "0 clamp(1rem, 2.5vw, 2rem)",
          textAlign: "center",
        }}
      >
        {/* Heading — forms word by word */}
        <p
          style={{
            fontSize:      "clamp(1.4rem, 3vw, 1.85rem)",
            fontWeight:    300,
            lineHeight:    1.5,
            letterSpacing: "0.015em",
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

        {/* Body paragraph — appears after heading */}
        <div
          ref={bodyRef}
          style={{
            fontSize:   "clamp(1rem, 1.9vw, 1.15rem)",
            fontWeight: 300,
            lineHeight: 2.0,
            color:      "rgba(0, 0, 0, 0.82)",
            textWrap:   "pretty",
            opacity:    0,
            willChange: "opacity, transform",
          }}
        >
          <p style={{ marginBottom: "1.6rem" }}>
            Our work is grounded in connection and in noticing opportunities
            within everyday moments. Growth happens through shared experiences,
            through being present, and in how we respond to one another.
            Learning unfolds within relationships.
          </p>
          <p style={{ marginBottom: "1.6rem" }}>
            By staying attuned, we recognize meaningful moments and support
            them with intention. We prioritize pausing and tuning in, creating
            space to better understand and respond to each individual&rsquo;s
            sensory and emotional experience.
          </p>
          <p>
            Through respectful presence and shared enjoyment, we join in
            moments and follow the child&rsquo;s lead. By honoring individual
            differences, we support each child&rsquo;s unique way of
            experiencing the world and shape how we align our approach across
            ABA and speech therapy.
          </p>
        </div>
      </div>
    </div>
  );
}
