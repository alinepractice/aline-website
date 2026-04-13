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

    // progress: 0 when element bottom-edge enters viewport, 1 when ~40% into view
    const progress = Math.min(
      1,
      Math.max(0, (vh - rect.top) / (vh * 0.5))
    );

    // Smooth ease-out curve
    const eased = 1 - Math.pow(1 - progress, 3);

    // Parallax: content rises from further away with noticeable depth
    const translateY = (1 - eased) * 80;
    const scale = 0.92 + eased * 0.08;
    const rotateX = (1 - eased) * 4;

    el.style.opacity = `${eased}`;
    el.style.transform = `perspective(1000px) translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    update();

    const onScroll = () => requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  return (
    <div
      ref={ref}
      className={`${s.fadeIn} ${className}`}
    >
      {children}
    </div>
  );
}
