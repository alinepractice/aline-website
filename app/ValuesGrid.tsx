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

  // Each card gets a stable random starting position and a deliberate stagger delay.
  // Base delay grows with index so landings feel sequential, jitter keeps it organic.
  const offsets = useRef(
    VALUES.map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist  = 140 + Math.random() * 140;
      return {
        x:      Math.cos(angle) * dist,
        y:      Math.sin(angle) * dist,
        rotate: (Math.random() - 0.5) * 30,
        delay:  0.1 * i + Math.random() * 0.15,   // 0 → ~0.95s across 8 cards
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

    // Fire when the grid is well into the viewport (roughly centred),
    // and re-fire each time it enters or exits so scrolling replays it.
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        threshold:  0.5,                // 50 % visible = roughly centred
        rootMargin: "-8% 0px",          // nudge trigger zone inward
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={s.principlesGrid}>
      {VALUES.map(({ name, description }, i) => {
        const { x, y, rotate, delay } = offsets.current[i];

        const transition = visible
          // Entry: slow spring with per-card delay — each one lands distinctly
          ? `transform 1.2s cubic-bezier(0.34, 1.15, 0.64, 1) ${delay}s,
             opacity   1.0s ease                              ${delay}s`
          // Exit: quick scatter, all at once
          : `transform 0.4s ease-in,
             opacity   0.3s ease`;

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
