"use client";

import { useEffect } from "react";

// Warm cream → deep warm tan  (#EDE4D0 → #B8AA8E)
const FROM = { r: 237, g: 228, b: 208 };
const TO   = { r: 184, g: 170, b: 142 };

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ScrollArc() {
  useEffect(() => {
    let raf = 0;

    function update() {
      const vh        = window.innerHeight;
      const scrollTop = window.scrollY;

      // Anchor the transition to the values section so it's
      // consistent regardless of screen size or content length.
      const valuesEl  = document.getElementById("values-section");
      const sectionTop = valuesEl
        ? valuesEl.getBoundingClientRect().top + scrollTop
        : vh * 0.9;

      const fadeStart = sectionTop - vh * 0.3;
      const fadeEnd   = sectionTop + vh * 2.2;
      const t = smooth(
        Math.max(0, Math.min(1, (scrollTop - fadeStart) / (fadeEnd - fadeStart)))
      );

      const r = Math.round(lerp(FROM.r, TO.r, t));
      const g = Math.round(lerp(FROM.g, TO.g, t));
      const b = Math.round(lerp(FROM.b, TO.b, t));

      document.documentElement.style.setProperty("--bg", `rgb(${r},${g},${b})`);
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
      document.documentElement.style.removeProperty("--bg");
    };
  }, []);

  return null;
}
