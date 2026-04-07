"use client";

import { useEffect, useState } from "react";

type PortraitItem = {
  title: string;
  image: string;
};

const slotClasses = [
  "hero-portrait-card hero-portrait-a",
  "hero-portrait-card hero-portrait-b",
  "hero-portrait-card hero-portrait-c",
  "hero-portrait-card hero-portrait-d",
];

type HeroPortraitRotationProps = {
  items: PortraitItem[];
};

export function HeroPortraitRotation({ items }: HeroPortraitRotationProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setOffset((current) => (current + 1) % items.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <div className="hero-portrait-layer" aria-hidden="true">
      {slotClasses.map((slotClassName, slotIndex) => {
        const portrait = items[(offset + slotIndex) % items.length];

        return (
          <article key={`${slotIndex}-${portrait.image}`} className={slotClassName}>
            <div
              className="hero-portrait-surface"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(7, 18, 31, 0.12), rgba(7, 18, 31, 0.72)), url(${portrait.image})`,
              }}
            />
            <span>{portrait.title}</span>
          </article>
        );
      })}
    </div>
  );
}
