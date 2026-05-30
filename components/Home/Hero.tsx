"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    if (!section || !heading || !subtitle || !scrollIndicator) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Show content immediately without animations
        gsap.set(heading, { opacity: 1 });
        gsap.set(subtitle, { opacity: 1 });
        gsap.set(scrollIndicator, { opacity: 1 });
        return;
      }

      // Split heading into words and animate
      const text = heading.textContent || "";
      heading.textContent = "";
      heading.style.overflow = "hidden";

      const words = text.split(" ").map((word, i, arr) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";

        const span = document.createElement("span");
        span.textContent = word + (i < arr.length - 1 ? "\u00A0" : "");
        span.style.display = "inline-block";
        span.style.transform = "translateY(100%)";
        wrapper.appendChild(span);
        heading.appendChild(wrapper);
        return span;
      });

      // Word reveal timeline
      const tl = gsap.timeline({ delay: 0.5 });
      tl.to(words, {
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
      });

      // Subtitle fade up
      tl.from(
        subtitle,
        {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Scroll indicator fade in
      tl.from(
        scrollIndicator,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Scroll indicator bounce animation
      gsap.to(scrollIndicator, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Parallax effect on heading
      gsap.to(heading, {
        y: 100,
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          src="/videos/hero-reel.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="none"
          poster="/images/hero-poster.jpg"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <h1
          ref={headingRef}
          className="text-editorial-xl text-white leading-none"
        >
          We Design & Build Exceptional Digital Experiences
        </h1>
        <p
          ref={subtitleRef}
          className="mt-8 text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto font-light tracking-wide"
        >
          Premium web design studio crafting bespoke digital products
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/60 text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <svg
          className="w-5 h-5 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
