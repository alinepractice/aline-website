"use client";

import { useEffect, useRef, useState } from "react";
import s from "./page.module.css";

type Phase = "idle" | "floating" | "popping" | "landed";

const FLOAT_MS = 3200;
const POP_MS   = 400;
const BUFFER   = 80;

export default function TitleBubble() {
  const [phase, setPhase] = useState<Phase>("idle");
  const wrapRef = useRef<HTMLDivElement>(null);
  const timers  = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("landed");
      return;
    }

    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
        if (entry.isIntersecting) {
          timers.current = [
            setTimeout(() => setPhase("floating"), 16),
            setTimeout(() => setPhase("popping"),  FLOAT_MS + BUFFER),
            setTimeout(() => setPhase("landed"),   FLOAT_MS + BUFFER + POP_MS),
          ];
        } else {
          setPhase("idle");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={s.titleBubbleWrap}>
      {(phase === "floating" || phase === "popping") && (
        <div
          className={s.bubble}
          data-phase={phase}
          data-shape="title"
          data-glare="true"
          style={{
            "--from-x":      "-340px",
            "--y-drift":     "12px",
            "--delay":       "0s",
            "--float-ms":    `${FLOAT_MS}ms`,
            "--bubble-size": "90px",
          } as React.CSSProperties}
        />
      )}
      <p
        className={[
          s.valuesGuide,
          phase === "landed" ? s.cardLanded : s.cardHidden,
        ].join(" ")}
      >
        Values and approach
      </p>
    </div>
  );
}
