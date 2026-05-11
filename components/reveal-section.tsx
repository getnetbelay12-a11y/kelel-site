"use client";

import { ElementType, ReactNode, useEffect, useRef, useState } from "react";

type RevealSectionProps<T extends ElementType> = {
  as?: T;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  children: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function RevealSection<T extends ElementType = "section">({
  as,
  className = "",
  delay = 0,
  children,
  ...props
}: RevealSectionProps<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (as || "section") as any;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const reveal = () => setIsVisible(true);
    const isElementInViewport = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < viewportHeight * 0.92 && rect.bottom > viewportHeight * 0.08;
    };

    if (isElementInViewport()) {
      reveal();
      return;
    }

    const fallback = window.setTimeout(reveal, 1200);

    if (!("IntersectionObserver" in window)) {
      return () => window.clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          reveal();
          observer.disconnect();
          window.clearTimeout(fallback);
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.01,
      },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <Component
      ref={ref}
      className={`reveal-section reveal-delay-${delay}${isVisible ? " visible" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </Component>
  );
}
