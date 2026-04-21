"use client";

import { useEffect, useRef, useState } from "react";
import s from "./page.module.css";
import ValueCard from "./ValueCard";

const VALUES = [
  { name: "Flexibility",    description: "Staying connected through change." },
  { name: "Independence",   description: "Noticing yourself and your needs." },
  { name: "Bravery",        description: "Engagement with uncertainty." },
  { name: "Safe Choices",   description: "Recognizing limits and responding with clarity." },
  { name: "ESDM",           description: "A developmental, play-based model that integrates learning into everyday interactions." },
  { name: "DIR/Floortime",  description: "A developmental, relationship-based model focused on connection, interaction, and following the child's lead." },
  { name: "JASPER",         description: "A developmental approach that supports joint attention, play, and communication." },
  { name: "PRT",            description: "A naturalistic, motivation-based approach that supports learning within everyday interactions." },
];

export default function ValuesGrid() {
  const ref  = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${s.principlesGrid} ${visible ? s.principlesGridVisible : ""}`}
    >
      {VALUES.map(({ name, description }) => (
        <ValueCard key={name} name={name} description={description} />
      ))}
    </div>
  );
}
