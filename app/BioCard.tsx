"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "./page.module.css";

export default function BioCard({
  src,
  alt,
  name,
  tagline,
  paragraphs,
  direction = "left",
}: {
  src: string;
  alt: string;
  name: string;
  tagline: string;
  paragraphs: string[];
  direction?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
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
      className={`${s.bioCard} ${visible ? s.bioCardVisible : ""} ${
        direction === "right" ? s.bioCardRight : s.bioCardLeft
      }`}
    >
      <div className={s.bioPhotoWrap}>
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className={s.bioPhoto}
        />
      </div>
      <p className={s.bioName}>{name}</p>
      <div className={s.bioText}>
        <p className={s.bioTagline}>{tagline}</p>
        {paragraphs.map((p, i) => (
          <p key={i} className={s.bioParagraph} style={{ transitionDelay: `${0.3 + i * 0.15}s` }}>
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
