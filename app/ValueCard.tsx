"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import s from "./page.module.css";

type Phase = "idle" | "floating" | "popping" | "landed";

const FLOAT_MS = 3000; // slow, dreamy float
const POP_MS   = 400;  // pop duration
const BUFFER   = 80;   // padding so float fully finishes

export default function ValueCard({
  name,
  description,
  animate,
  fromLeft,
  xDist,
  yDrift,
  delay,
}: {
  name: string;
  description: string;
  animate: boolean;
  fromLeft: boolean;
  xDist: number;
  yDrift: number;
  delay: number; // seconds
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [open,  setOpen]  = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (!animate) {
      setPhase("idle");
      setOpen(false);
      return;
    }

    // Reduced-motion: skip straight to landed
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("landed");
      return;
    }

    const d = delay * 1000;
    timers.current = [
      setTimeout(() => setPhase("floating"), 16),
      setTimeout(() => setPhase("popping"),  d + FLOAT_MS + BUFFER),
      setTimeout(() => setPhase("landed"),   d + FLOAT_MS + BUFFER + POP_MS),
    ];

    return () => timers.current.forEach(clearTimeout);
  }, [animate, delay]);

  const handleClick = useCallback(() => {
    if (phase === "landed") setOpen(p => !p);
  }, [phase]);

  return (
    <div className={s.cardWrapper}>

      {/* Soap bubble — visible only while floating or popping */}
      {(phase === "floating" || phase === "popping") && (
        <div
          className={s.bubble}
          data-phase={phase}
          style={{
            "--from-x":   `${fromLeft ? -xDist : xDist}px`,
            "--y-drift":  `${yDrift}px`,
            "--delay":    `${delay}s`,
            "--float-ms": `${FLOAT_MS}ms`,
          } as React.CSSProperties}
        />
      )}

      {/* Text card — always in DOM so grid holds its space */}
      <button
        type="button"
        className={[
          s.principle,
          open             ? s.principleOpen : "",
          phase === "landed" ? s.cardLanded  : s.cardHidden,
        ].join(" ")}
        tabIndex={phase === "landed" ? 0 : -1}
        aria-expanded={open}
        onClick={handleClick}
      >
        <h3 className={s.principleName}>{name}</h3>
        <p className={s.principleDesc}>{description}</p>
      </button>

    </div>
  );
}
