"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const magnetics = document.querySelectorAll<HTMLElement>(".btn-magnetic");

    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    magnetics.forEach((b) => {
      const move = (e: MouseEvent) => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        b.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
      };
      const leave = () => { b.style.transform = ""; };
      b.addEventListener("mousemove", move);
      b.addEventListener("mouseleave", leave);
      handlers.push({ el: b, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return null;
}
