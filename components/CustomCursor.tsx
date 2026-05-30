"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target?.closest) return;
      if (target.closest("a, button, [data-cursor-hover]")) {
        if (!isHoveringRef.current) {
          isHoveringRef.current = true;
          gsap.to(cursor, { scale: 0.5, duration: 0.3 });
          gsap.to(follower, { scale: 1.5, duration: 0.3 });
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target?.closest) return;
      if (target.closest("a, button, [data-cursor-hover]")) {
        const related = e.relatedTarget as Element | null;
        if (!related || !related.closest?.("a, button, [data-cursor-hover]")) {
          isHoveringRef.current = false;
          gsap.to(cursor, { scale: 1, duration: 0.3 });
          gsap.to(follower, { scale: 1, duration: 0.3 });
        }
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        aria-hidden="true"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-accent rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        aria-hidden="true"
      />
    </>
  );
}
