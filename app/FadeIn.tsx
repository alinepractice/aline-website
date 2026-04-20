"use client";

import { useEffect, useRef, useCallback } from "react";
import s from "./page.module.css";

export default function FadeIn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // Progress: 0 when bottom edge enters viewport, 1 when 50% in view
    const progress = Math.min(
      1,
      Math.max(0, (vh - rect.top) / (vh * 0.5))
    );

    // Springy quart ease — snappy entry, settles softly
    const eased = 1 - Math.pow(1 - progress, 4);

    // More travel + a touch of tilt for liveliness
    const translateY = (1 - eased) * 52;
    const scale = 0.96 + eased * 0.04;
    const rotateX = (1 - eased) * 2.5;

    el.style.opacity = `${Math.min(1, eased * 1.1)}`;
    el.style.transform = `perspective(1200px) translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    update();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [update]);

  return (
    <div ref={ref} className={`${s.fadeIn} ${className}`}>
      {children}
    </div>
  );
}
