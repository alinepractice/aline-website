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

    // How far into the viewport the element is (0 = just entering bottom, 1 = fully in view)
    const progress = Math.min(
      1,
      Math.max(0, (vh - rect.top) / (vh * 0.6))
    );

    // Soft eased progress for a gentle roll
    const eased = progress * progress * (3 - 2 * progress); // smoothstep

    el.style.opacity = `${eased}`;
    el.style.transform = `
      translateY(${(1 - eased) * 40}px)
      scale(${0.97 + eased * 0.03})
      perspective(1200px)
      rotateX(${(1 - eased) * 2}deg)
    `;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial state
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
