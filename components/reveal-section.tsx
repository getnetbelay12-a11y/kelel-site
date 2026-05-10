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
      className={`reveal-section reveal-delay-${delay}${isVisible ? " visible" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </Component>
  );
}
