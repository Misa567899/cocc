"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const shape1 = shape1Ref.current;
    const shape2 = shape2Ref.current;
    const shape3 = shape3Ref.current;

    if (
      !section ||
      !heading ||
      !subtitle ||
      !cta ||
      !scrollIndicator ||
      !shape1 ||
      !shape2 ||
      !shape3
    )
      return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([heading, subtitle, cta, scrollIndicator, shape1, shape2, shape3], {
        opacity: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Split heading into words for staggered reveal
      const text = heading.textContent || "";
      heading.textContent = "";
      heading.style.opacity = "1";

      const words = text.split(" ").map((word, i, arr) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        wrapper.style.verticalAlign = "top";

        const span = document.createElement("span");
        span.textContent = word + (i < arr.length - 1 ? "\u00A0" : "");
        span.style.display = "inline-block";
        span.style.transform = "translateY(110%)";
        wrapper.appendChild(span);
        heading.appendChild(wrapper);
        return span;
      });

      // Main entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Staggered word reveal on headline
      tl.to(words, {
        y: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
      });

      // Subtitle fade up
      tl.from(
        subtitle,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // CTA slide in
      tl.from(
        cta,
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Decorative elements float in with delay
      tl.from(
        shape1,
        {
          scale: 0,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.6"
      );

      tl.from(
        shape2,
        {
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.9"
      );

      tl.from(
        shape3,
        {
          x: -40,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8"
      );

      // Scroll indicator fade in
      tl.from(
        scrollIndicator,
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Scroll indicator bounce animation
      gsap.to(scrollIndicator, {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2,
      });

      // Scroll parallax on decorative elements
      gsap.to(shape1, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(shape2, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(shape3, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    // Mouse-follow effect on decorative elements
    window.addEventListener("mousemove", handleMouseMove);

    const animateShapes = () => {
      const { x, y } = mousePos.current;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      gsap.to(shape1, {
        x: deltaX * 15,
        y: deltaY * 10,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(shape2, {
        x: deltaX * -20,
        y: deltaY * -12,
        duration: 1.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(shape3, {
        x: deltaX * 10,
        y: deltaY * 8,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
      });

      rafId.current = requestAnimationFrame(animateShapes);
    };

    rafId.current = requestAnimationFrame(animateShapes);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background pt-40 pb-20"
    >
      {/* Decorative floating shapes */}
      <div
        ref={shape1Ref}
        className="absolute top-[15%] right-[10%] w-[280px] h-[280px] rounded-full border border-accent/[0.07] opacity-60"
        aria-hidden="true"
      />
      <div
        ref={shape2Ref}
        className="absolute bottom-[20%] left-[5%] w-[180px] h-[180px] rounded-full bg-accent/[0.04]"
        aria-hidden="true"
      />
      <div
        ref={shape3Ref}
        className="absolute top-[40%] right-[35%] w-[1px] h-[120px] bg-accent/[0.12] rotate-[25deg]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Large editorial headline */}
          <div className="lg:col-span-7">
            <h1
              ref={headingRef}
              className="hero-headline text-foreground"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 7rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                fontWeight: 700,
                opacity: 0,
              }}
            >
              We Design & Build Exceptional Digital Experiences
            </h1>
          </div>

          {/* Right: Descriptor + CTA */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:pl-8">
            <p
              ref={subtitleRef}
              className="text-muted text-lg md:text-xl leading-relaxed font-light"
              style={{ opacity: 0 }}
            >
              Premium web design studio crafting bespoke digital products with
              meticulous attention to detail.
            </p>
            <div ref={ctaRef} style={{ opacity: 0 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-accent-light transition-colors duration-300"
              >
                Start a Project
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: 0 }}
      >
        <span className="text-muted text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <svg
          className="w-5 h-5 text-muted"
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
