"use client";

import { ElementType, ReactNode, useEffect, useRef, useState } from "react";

type RevealSectionProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function RevealSection<T extends ElementType = "section">({
  as,
  className = "",
  children,
  ...props
}: RevealSectionProps<T>) {
  const Component = (as || "section") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={`reveal-section${isVisible ? " visible" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </Component>
  );
}
