"use client";

import { useEffect, useRef, useState } from "react";
import s from "./page.module.css";

export default function StaggerList({ items }: { items: string[] }) {
  const ref = useRef<HTMLUListElement>(null);
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
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ul
      ref={ref}
      className={`${s.practiceList} ${visible ? s.practiceListVisible : ""}`}
    >
      {items.map((item, i) => (
        <li key={item} style={{ transitionDelay: `${i * 0.12}s` }}>
          {item}
        </li>
      ))}
    </ul>
  );
}
