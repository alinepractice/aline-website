"use client";

import { useState } from "react";
import s from "./page.module.css";

export default function ValueCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      className={`${s.principle} ${open ? s.principleOpen : ""}`}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
    >
      <h3 className={s.principleName}>{name}</h3>
      <p className={`${s.valuesText} ${s.principleDesc}`}>{description}</p>
    </button>
  );
}
