"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !heading || !subtitle) return;

    const ctx = gsap.context(() => {
      // Character reveal for heading
      const text = heading.textContent || "";
      heading.textContent = "";
      heading.style.overflow = "hidden";

      const chars = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.transform = "translateY(100%)";
        heading.appendChild(span);
        return span;
      });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(chars, {
        y: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: "power3.out",
      });

      tl.from(
        subtitle,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-16"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <h1
          ref={headingRef}
          className="text-editorial-xl text-foreground leading-none"
        >
          Get In Touch
        </h1>
        <p
          ref={subtitleRef}
          className="mt-8 text-lg md:text-xl lg:text-2xl text-muted max-w-2xl mx-auto font-light tracking-wide"
        >
          We&apos;d love to hear about your next project
        </p>
      </div>
    </section>
  );
}
