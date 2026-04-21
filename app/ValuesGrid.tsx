"use client";

import { useEffect, useRef, useState } from "react";
import s from "./page.module.css";
import ValueCard from "./ValueCard";

const VALUES = [
  { name: "Flexibility",   description: "Staying connected through change." },
  { name: "Independence",  description: "Noticing yourself and your needs." },
  { name: "Bravery",       description: "Engagement with uncertainty." },
  { name: "Safe Choices",  description: "Recognizing limits and responding with clarity." },
  { name: "ESDM",          description: "A developmental, play-based model that integrates learning into everyday interactions." },
  { name: "DIR/Floortime", description: "A developmental, relationship-based model focused on connection, interaction, and following the child's lead." },
  { name: "JASPER",        description: "A developmental approach that supports joint attention, play, and communication." },
  { name: "PRT",           description: "A naturalistic, motivation-based approach that supports learning within everyday interactions." },
];

export default function ValuesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Cards drift in from off the sides — large horizontal offset, gentle vertical float
  const offsets = useRef(
    VALUES.map((_, i) => {
      const fromLeft = Math.random() < 0.5;
      const xDist    = 280 + Math.random() * 160;   // 280–440px off screen
      const yDrift   = (Math.random() - 0.5) * 48;  // ±24px gentle vertical drift
      return {
        x:      fromLeft ? -xDist : xDist,
        y:      yDrift,
        rotate: (Math.random() - 0.5) * 18,          // subtle tilt
        delay:  0.14 * i + Math.random() * 0.18,     // 0 → ~1.26s, each clearly distinct
      };
    })
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5, rootMargin: "-8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={s.principlesGrid}>
      {VALUES.map(({ name, description }, i) => {
        const { x, y, rotate, delay } = offsets.current[i];

        const transition = visible
          // Slow, smooth ease-out — floats in like a bubble settling
          ? `transform 1.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
             opacity   1.6s ease                          ${delay}s`
          // Exit: gentle scatter
          : `transform 0.5s ease-in,
             opacity   0.35s ease`;

        return (
          <ValueCard
            key={name}
            name={name}
            description={description}
            style={{
              opacity:   visible ? 1 : 0,
              transform: visible
                ? "translateX(0) translateY(0) rotate(0deg)"
                : `translateX(${x}px) translateY(${y}px) rotate(${rotate}deg)`,
              transition,
            }}
          />
        );
      })}
    </div>
  );
}
