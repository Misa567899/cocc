"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Understanding your vision, goals, and target audience through in-depth research and workshops.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Defining the roadmap, information architecture, and technical approach for your project.",
  },
  {
    number: "03",
    title: "Wireframing",
    description:
      "Creating the structural blueprint of your digital experience with precise layouts.",
  },
  {
    number: "04",
    title: "UI Design",
    description:
      "Crafting pixel-perfect visual designs that bring your brand identity to life.",
  },
  {
    number: "05",
    title: "Development",
    description:
      "Building with modern technologies, ensuring performance and code quality at every step.",
  },
  {
    number: "06",
    title: "Testing",
    description:
      "Rigorous quality assurance across devices, browsers, and user scenarios.",
  },
  {
    number: "07",
    title: "Launch",
    description:
      "Deploying with confidence through optimized delivery and monitoring systems.",
  },
  {
    number: "08",
    title: "Growth",
    description:
      "Ongoing optimization, analytics-driven improvements, and strategic iterations.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const track = trackRef.current;
    const container = containerRef.current;
    const progress = progressRef.current;
    if (!section || !heading || !track || !container || !progress) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      // Heading word reveal
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
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Horizontal scroll pinned section
      const totalWidth = track.scrollWidth - container.offsetWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Progress bar
      gsap.to(progress, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
        },
      });

      // Step cards reveal
      const cards = track.querySelectorAll(".process-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0.3,
          scale: 0.95,
          duration: 0.5,
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${(totalWidth / cards.length) * i} top`,
            end: () => `top+=${(totalWidth / cards.length) * (i + 0.5)} top`,
            scrub: 1,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="process-section relative bg-gray-50 border-t border-border"
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none">
        <div
          ref={progressRef}
          className="h-[3px] bg-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div ref={containerRef} className="process-container h-screen flex flex-col justify-center overflow-hidden">
        {/* Heading */}
        <div className="px-6 lg:px-12 pt-12 pb-8 max-w-[1440px] mx-auto w-full">
          <h2 ref={headingRef} className="text-editorial-md text-foreground">
            Our Process
          </h2>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="process-track flex items-stretch gap-6 lg:gap-8 px-6 lg:px-12 pb-12"
          style={{ width: "fit-content" }}
        >
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="process-card flex-shrink-0 w-[300px] lg:w-[380px] bg-white border border-border rounded-xl p-8 lg:p-10 flex flex-col justify-between"
            >
              <div>
                <span className="text-5xl lg:text-6xl font-bold text-accent/20">
                  {step.number}
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mt-4 mb-3">
                  {step.title}
                </h3>
                <p className="text-muted text-sm lg:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="mt-8 h-[2px] bg-accent/10 rounded-full overflow-hidden">
                <div className="h-full w-full bg-accent scale-x-0 origin-left process-progress" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
