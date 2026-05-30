"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.02,
      boxShadow: `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 0, 0, 0.12)`,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.06)",
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/services/${service.slug}`}
      className="service-card group block bg-white border border-border rounded-xl p-8 lg:p-10"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.06)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ transformStyle: "preserve-3d" }}>
        <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
          {service.name}
        </h3>
        <p className="text-muted text-sm lg:text-base leading-relaxed mb-8">
          {service.description}
        </p>
        <div className="flex items-center gap-2 text-accent text-sm font-medium">
          <span>Learn more</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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
        </div>
      </div>
    </Link>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Show elements in their final state immediately
        gsap.set(heading, { opacity: 1 });
        const cards = section.querySelectorAll(".service-card");
        gsap.set(cards, { opacity: 1, y: 0 });
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

      // Cards stagger animation
      const cards = section.querySelectorAll(".service-card");
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 lg:py-48">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h2
          ref={headingRef}
          className="text-editorial-lg text-foreground mb-16 lg:mb-24"
        >
          What We Do
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
