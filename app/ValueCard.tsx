"use client";

import { useCallback, useState } from "react";
import s from "./page.module.css";

export default function ValueCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(prev => !prev);
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
