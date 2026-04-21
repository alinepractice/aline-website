"use client";

import { useRef } from "react";
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

export default function ServiceCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.dataset.dragging = "true";
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
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
        <article key={title} className={s.serviceCard}>
          <h3 className={s.serviceTitle}>{title}</h3>
          <p className={s.serviceDesc}>{description}</p>
        </article>
      ))}
    </div>
  );
}
