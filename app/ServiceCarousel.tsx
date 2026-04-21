"use client";

import { useRef, useState } from "react";
import s from "./page.module.css";

const SERVICES = [
  {
    title: "Project ImPACT",
    description:
      "Parent coaching grounded in connection, communication, and everyday routines.",
  },
  {
    title: "Speech Therapy",
    description:
      "Supporting communication, language, and connection across everyday contexts.",
  },
  {
    title: "ABA Therapy",
    description:
      "Developmentally informed, relationship-centered support focused on learning, flexibility, and meaningful growth.",
  },
  {
    title: "Parent Support",
    description:
      "Guidance and support for everyday moments, building connection and shared understanding.",
  },
  {
    title: "Friendship & Connection",
    description:
      "Supporting social engagement, peer interaction, and meaningful relationships.",
  },
  {
    title: "School & Program Development",
    description:
      "Collaborating with schools and teams to design supportive, connection-based environments.",
  },
  {
    title: "Design & Product Collaboration",
    description:
      "Supporting the development of thoughtful tools, resources, and learning experiences.",
  },
];

function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={s.serviceCard}
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
    >
      <h3 className={s.serviceTitle}>{title}</h3>

      <div className={s.serviceDescWrap} aria-hidden={!open}>
        <div className={s.serviceDescInner}>
          <p className={s.serviceDesc}>{description}</p>
        </div>
      </div>
    </article>
  );
}

export default function ServiceCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragMoved = useRef(false);

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.dataset.dragging = "true";
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 4) dragMoved.current = true;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }

  function onMouseUp() {
    isDragging.current = false;
    if (trackRef.current) delete trackRef.current.dataset.dragging;
  }

  return (
    <div
      ref={trackRef}
      className={s.carouselTrack}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {SERVICES.map(({ title, description }) => (
        <ServiceCard key={title} title={title} description={description} />
      ))}
    </div>
  );
}
