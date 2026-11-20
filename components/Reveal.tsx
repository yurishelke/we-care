"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

/* Scroll-reveal wrapper. `delay` staggers via the --d custom property. */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  id,
  style,
}: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      style={{ ...style, ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}