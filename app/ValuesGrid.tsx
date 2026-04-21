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
  const [animate, setAnimate] = useState(false);

  // Stable random offsets, generated once per mount
  const offsets = useRef(
    VALUES.map((_, i) => ({
      fromLeft: Math.random() < 0.5,
      xDist:    340 + Math.random() * 200,     // 340–540 px — clearly off-screen
      yDrift:   (Math.random() - 0.5) * 52,    // ±26 px arc — more organic path
      delay:    0.16 * i + Math.random() * 0.2, // 0 → ~1.5 s stagger
      glare:    Math.random() < 0.55,           // ~half get a second line glare
    }))
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(true);
      return;
    }

    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAnimate(entry.isIntersecting),
      { threshold: 0.4, rootMargin: "-5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={s.principlesGrid}>
      {VALUES.map(({ name, description }, i) => {
        const { fromLeft, xDist, yDrift, delay, glare } = offsets.current[i];
        return (
          <ValueCard
            key={name}
            name={name}
            description={description}
            animate={animate}
            fromLeft={fromLeft}
            xDist={xDist}
            yDrift={yDrift}
            delay={delay}
            glare={glare}
          />
        );
      })}
    </div>
  );
}
