"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DesignShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptorRef = useRef<HTMLParagraphElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const heroAreaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const floatingGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const descriptor = descriptorRef.current;
    const browser = browserRef.current;
    const navBar = navBarRef.current;
    const heroArea = heroAreaRef.current;
    const cards = cardsRef.current;
    const footer = footerRef.current;
    const floatingGrid = floatingGridRef.current;

    if (
      !section ||
      !heading ||
      !descriptor ||
      !browser ||
      !navBar ||
      !heroArea ||
      !cards ||
      !footer ||
      !floatingGrid
    )
      return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Show everything assembled immediately
        gsap.set([navBar, heroArea, cards, footer], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Heading word-reveal animation
      const headingText = heading.textContent || "";
      heading.textContent = "";
      heading.style.overflow = "hidden";

      const words = headingText.split(" ").map((word, i, arr) => {
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

      gsap.to(words, {
        y: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Descriptor fade up
      gsap.from(descriptor, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descriptor,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Browser window assembly - scroll-driven
      const assemblyTl = gsap.timeline({
        scrollTrigger: {
          trigger: browser,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      // Set initial states
      gsap.set(navBar, { opacity: 0, y: -40 });
      gsap.set(heroArea, { opacity: 0, scale: 0.95 });
      gsap.set(cards.children, { opacity: 0, y: 50 });
      gsap.set(footer, { opacity: 0, y: 30 });

      // Assembly sequence
      assemblyTl
        .to(navBar, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" })
        .to(
          heroArea,
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
          "+=0.05"
        )
        .to(
          cards.children,
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.08,
            ease: "power2.out",
          },
          "+=0.05"
        )
        .to(
          footer,
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          "+=0.05"
        );

      // Floating grid - parallax effect and subtle bob animation
      const floatingItems = floatingGrid.querySelectorAll(".floating-card");

      floatingItems.forEach((item, i) => {
        // Parallax: items move slower than scroll
        gsap.to(item, {
          y: -30 - i * 10,
          ease: "none",
          scrollTrigger: {
            trigger: floatingGrid,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Subtle float/bob animation with yoyo
        gsap.to(item, {
          y: "+=8",
          rotateX: 2,
          rotateY: i % 2 === 0 ? 2 : -2,
          duration: 2.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48 bg-white overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #000 0.8px, transparent 0.8px)",
          backgroundSize: "24px 24px",
          opacity: 0.025,
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section heading with word-reveal */}
        <h2
          ref={headingRef}
          className="text-editorial-md text-foreground mb-6"
        >
          From Concept to Reality
        </h2>

        {/* Descriptor text */}
        <p
          ref={descriptorRef}
          className="text-lg lg:text-xl text-muted max-w-2xl mb-20 lg:mb-28"
        >
          Watch as design elements come together to form cohesive digital
          experiences.
        </p>

        {/* Main Visual - Browser Window Assembly */}
        <div className="flex justify-center mb-20 lg:mb-28">
          <div
            ref={browserRef}
            className="w-full lg:w-[70%] rounded-2xl shadow-2xl overflow-hidden border border-border"
          >
            {/* Browser toolbar */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-md px-4 py-1.5 text-xs text-muted border border-border max-w-sm mx-auto flex items-center gap-2">
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>yourwebsite.com</span>
                </div>
              </div>
            </div>

            {/* Browser content area - elements assemble here */}
            <div className="bg-white p-4 lg:p-6 min-h-[360px] lg:min-h-[440px] flex flex-col gap-4">
              {/* Navigation bar */}
              <div
                ref={navBarRef}
                className="bg-foreground rounded-lg px-4 py-3 flex items-center justify-between"
              >
                <div className="w-16 lg:w-20 h-3 bg-white/80 rounded" />
                <div className="hidden sm:flex gap-3">
                  <div className="w-10 h-2 bg-white/40 rounded" />
                  <div className="w-10 h-2 bg-white/40 rounded" />
                  <div className="w-10 h-2 bg-white/40 rounded" />
                  <div className="w-10 h-2 bg-white/40 rounded" />
                </div>
                <div className="w-16 h-6 bg-accent rounded-sm" />
              </div>

              {/* Hero area */}
              <div
                ref={heroAreaRef}
                className="bg-gray-50 rounded-lg p-6 lg:p-10 flex flex-col items-center text-center gap-4 flex-1"
              >
                <div className="w-3/4 lg:w-1/2 h-5 lg:h-7 bg-foreground rounded" />
                <div className="w-2/3 lg:w-2/5 h-3 lg:h-4 bg-gray-300 rounded" />
                <div className="w-1/2 lg:w-1/4 h-3 bg-gray-200 rounded" />
                <div className="w-28 lg:w-32 h-9 lg:h-10 bg-accent rounded-md mt-2" />
              </div>

              {/* Feature cards */}
              <div
                ref={cardsRef}
                className="grid grid-cols-3 gap-3 lg:gap-4"
              >
                <div className="bg-white border border-border rounded-lg p-3 lg:p-4 shadow-sm">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-accent/10 rounded-lg mb-3 flex items-center justify-center">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 rounded bg-accent/60" />
                  </div>
                  <div className="w-3/4 h-2.5 bg-foreground rounded mb-2" />
                  <div className="w-full h-2 bg-gray-200 rounded mb-1" />
                  <div className="w-2/3 h-2 bg-gray-200 rounded" />
                </div>
                <div className="bg-white border border-border rounded-lg p-3 lg:p-4 shadow-sm">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-accent/10 rounded-lg mb-3 flex items-center justify-center">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 rounded bg-accent/60" />
                  </div>
                  <div className="w-3/4 h-2.5 bg-foreground rounded mb-2" />
                  <div className="w-full h-2 bg-gray-200 rounded mb-1" />
                  <div className="w-2/3 h-2 bg-gray-200 rounded" />
                </div>
                <div className="bg-white border border-border rounded-lg p-3 lg:p-4 shadow-sm">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-accent/10 rounded-lg mb-3 flex items-center justify-center">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 rounded bg-accent/60" />
                  </div>
                  <div className="w-3/4 h-2.5 bg-foreground rounded mb-2" />
                  <div className="w-full h-2 bg-gray-200 rounded mb-1" />
                  <div className="w-2/3 h-2 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Footer */}
              <div
                ref={footerRef}
                className="bg-foreground rounded-lg px-4 py-3 lg:py-4"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="w-12 h-2 bg-white/50 rounded" />
                    <div className="w-16 h-1.5 bg-white/20 rounded" />
                    <div className="w-14 h-1.5 bg-white/20 rounded" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="w-12 h-2 bg-white/50 rounded" />
                    <div className="w-16 h-1.5 bg-white/20 rounded" />
                    <div className="w-14 h-1.5 bg-white/20 rounded" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="w-12 h-2 bg-white/50 rounded" />
                    <div className="w-16 h-1.5 bg-white/20 rounded" />
                    <div className="w-14 h-1.5 bg-white/20 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating UI Component Grid */}
        <div
          ref={floatingGridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          style={{ perspective: "1000px" }}
        >
          {/* Button component */}
          <div className="floating-card bg-white border border-border rounded-xl p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-xs text-muted uppercase tracking-wider mb-3 font-medium">
              Button
            </p>
            <div className="flex flex-col gap-2">
              <div className="w-full h-9 bg-accent rounded-md flex items-center justify-center">
                <div className="w-16 h-2 bg-white/90 rounded" />
              </div>
              <div className="w-full h-9 border-2 border-accent rounded-md flex items-center justify-center">
                <div className="w-16 h-2 bg-accent/70 rounded" />
              </div>
            </div>
          </div>

          {/* Input field component */}
          <div className="floating-card bg-white border border-border rounded-xl p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-xs text-muted uppercase tracking-wider mb-3 font-medium">
              Input
            </p>
            <div className="flex flex-col gap-2">
              <div className="w-12 h-2 bg-foreground/70 rounded mb-1" />
              <div className="w-full h-9 border border-border rounded-md px-3 flex items-center">
                <div className="w-2/3 h-2 bg-gray-200 rounded" />
              </div>
              <div className="w-24 h-1.5 bg-muted/40 rounded" />
            </div>
          </div>

          {/* Card component */}
          <div className="floating-card bg-white border border-border rounded-xl p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-xs text-muted uppercase tracking-wider mb-3 font-medium">
              Card
            </p>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="w-full h-12 bg-gray-100" />
              <div className="p-2.5">
                <div className="w-3/4 h-2 bg-foreground rounded mb-1.5" />
                <div className="w-full h-1.5 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* Color swatch component */}
          <div className="floating-card bg-white border border-border rounded-xl p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-xs text-muted uppercase tracking-wider mb-3 font-medium">
              Colors
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-lg bg-foreground" />
              <div className="aspect-square rounded-lg bg-accent" />
              <div className="aspect-square rounded-lg bg-accent-light" />
              <div className="aspect-square rounded-lg bg-gray-200" />
              <div className="aspect-square rounded-lg bg-gray-400" />
              <div className="aspect-square rounded-lg bg-gray-100 border border-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
