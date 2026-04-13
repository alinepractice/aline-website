"use client";

import { useState, useEffect, useCallback } from "react";
import s from "./page.module.css";

export default function ValueCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  // On mobile, auto-hide after showing
  useEffect(() => {
    if (!open) return;
    // Only auto-dismiss on touch devices (no hover capability)
    const mq = window.matchMedia("(hover: none)");
    if (!mq.matches) return;

    const timer = setTimeout(() => setOpen(false), 2000);
    return () => clearTimeout(timer);
  }, [open]);

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <button
      type="button"
      className={`${s.principle} ${open ? s.principleOpen : ""}`}
      aria-expanded={open}
      onClick={handleClick}
    >
      <h3 className={s.principleName}>{name}</h3>
      <p className={s.principleDesc}>{description}</p>
    </button>
  );
}
