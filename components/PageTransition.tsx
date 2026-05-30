"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!overlay || !content) return;

    const tl = gsap.timeline();

    tl.set(overlay, { scaleY: 1, transformOrigin: "top" });
    tl.to(overlay, {
      scaleY: 0,
      duration: 0.8,
      ease: "power3.inOut",
      transformOrigin: "top",
    });
    tl.from(
      content,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, []);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[10000] bg-foreground pointer-events-none"
        aria-hidden="true"
      />
      <div ref={contentRef}>{children}</div>
    </>
  );
}
