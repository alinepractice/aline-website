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
  const gridRef  = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Stable random offsets per card — each flies in from a unique direction
  const offsets = useRef(
    VALUES.map(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist  = 130 + Math.random() * 150;      // 130–280 px away
      return {
        x:      Math.cos(angle) * dist,
        y:      Math.sin(angle) * dist,
        rotate: (Math.random() - 0.5) * 32,          // –16 to +16 deg
        delay:  Math.random() * 0.28,                 // staggered arrival
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

    // No disconnect → re-fires every time the section enters or exits view
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={s.principlesGrid}>
      {VALUES.map(({ name, description }, i) => {
        const { x, y, rotate, delay } = offsets.current[i];

        // Entry: spring bounce with individual delays (bee landing)
        // Exit:  quick scatter, no delay
        const transition = visible
          ? `transform 0.9s cubic-bezier(0.34, 1.18, 0.64, 1) ${delay}s,
             opacity   0.6s ease                              ${delay}s`
          : `transform 0.45s ease-in,
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
