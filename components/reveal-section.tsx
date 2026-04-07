"use client";

import type { ElementType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
};

export function RevealSection({
  children,
  className = "",
  id,
  as = "section",
}: RevealSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const Component = as;

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      id={id}
      ref={ref}
      className={`${className} reveal-section${isVisible ? " visible" : ""}`}
    >
      {children}
    </Component>
  );
}
