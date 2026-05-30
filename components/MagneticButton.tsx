"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as = "button",
  onClick,
  href,
  type,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = elementRef.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const rect = el.getBoundingClientRect();
      // Extend detection area by 20px padding
      const padding = 20;
      const isNear =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (!isNear) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) * strength;
      const y = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x,
        y,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const handleMouseEnter = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.to(el, {
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    return () => {
      if (el) {
        gsap.set(el, { x: 0, y: 0, scale: 1 });
      }
    };
  }, []);

  const Component = as as React.ElementType;

  const props: Record<string, unknown> = {
    ref: elementRef,
    className,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: { display: "inline-block" },
  };

  if (onClick) props.onClick = onClick;
  if (href) props.href = href;
  if (type) props.type = type;
  if (ariaLabel) props["aria-label"] = ariaLabel;

  return <Component {...props}>{children}</Component>;
}
