"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceContentProps {
  description: string[];
  capabilities: string[];
  processSteps: { title: string; description: string }[];
}

export function ServiceContent({
  description,
  capabilities,
  processSteps,
}: ServiceContentProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const descEl = descriptionRef.current;
    const capEl = capabilitiesRef.current;
    const procEl = processRef.current;
    if (!descEl || !capEl || !procEl) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Description paragraphs fade up
      const paragraphs = descEl.querySelectorAll("p");
      paragraphs.forEach((p) => {
        gsap.from(p, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Capabilities grid stagger
      const items = capEl.querySelectorAll(".capability-item");
      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: capEl,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Process steps stagger
      const steps = procEl.querySelectorAll(".process-step");
      gsap.from(steps, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: procEl,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Description */}
        <div ref={descriptionRef} className="max-w-3xl mb-24 lg:mb-32">
          {description.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg lg:text-xl text-muted leading-relaxed mb-6 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Capabilities */}
        <div ref={capabilitiesRef} className="mb-24 lg:mb-32">
          <h2 className="text-editorial-md text-foreground mb-12">
            Capabilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {capabilities.map((capability, i) => (
              <div
                key={i}
                className="capability-item group p-6 border border-border rounded-sm hover:border-accent hover:bg-accent/[0.02] transition-all duration-300"
              >
                <span className="block text-xs text-accent font-medium mb-2 tracking-wider">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block text-sm lg:text-base font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                  {capability}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div ref={processRef}>
          <h2 className="text-editorial-md text-foreground mb-12">
            Our Process
          </h2>
          <div className="space-y-8 lg:space-y-12">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="process-step flex gap-6 lg:gap-12 items-start border-t border-border pt-8"
              >
                <span className="text-4xl lg:text-5xl font-bold text-accent/20 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted text-base lg:text-lg leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
