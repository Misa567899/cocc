"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceHeroProps {
  title: string;
  headline: string;
}

export function ServiceHero({ title, headline }: ServiceHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const headlineEl = headlineRef.current;
    if (!section || !titleEl || !headlineEl) return;

    const ctx = gsap.context(() => {
      // Word reveal for title
      const text = titleEl.textContent || "";
      titleEl.textContent = "";
      titleEl.style.overflow = "hidden";

      const words = text.split(" ").map((word, i, arr) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";

        const span = document.createElement("span");
        span.textContent = word + (i < arr.length - 1 ? "\u00A0" : "");
        span.style.display = "inline-block";
        span.style.transform = "translateY(100%)";
        wrapper.appendChild(span);
        titleEl.appendChild(wrapper);
        return span;
      });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(words, {
        y: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
      });

      // Headline fade up
      tl.from(
        headlineEl,
        {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Parallax on title
      gsap.to(titleEl, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_var(--color-accent)_1px,_transparent_0)] bg-[length:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center pt-32 pb-20">
        <h1
          ref={titleRef}
          className="text-editorial-xl text-foreground leading-none"
        >
          {title}
        </h1>
        <p
          ref={headlineRef}
          className="mt-8 text-editorial-md text-accent max-w-4xl mx-auto"
        >
          {headline}
        </p>
      </div>
    </section>
  );
}
