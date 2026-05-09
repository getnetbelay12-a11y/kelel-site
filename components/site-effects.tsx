"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");

    if (!dot || !ring || !window.matchMedia("(hover: hover)").matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      animId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    animId = requestAnimationFrame(tick);

    const interactables = document.querySelectorAll<HTMLElement>("a, button, [data-cursor]");
    const enter = () => ring.classList.add("hover");
    const leave = () => ring.classList.remove("hover");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

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

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
    </>
  );
}
