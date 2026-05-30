"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      setMousePos({ x, y });

      const rotateX = ((y - centerY) / centerY) * -11;
      const rotateY = ((x - centerX) / centerX) * 11;

      gsap.to(card, {
        rotateX,
        rotateY,
        scale: 1.03,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    setIsHovered(false);

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <Link
      ref={cardRef}
      href={`/services/${service.slug}`}
      className="service-card group relative block bg-white border border-border rounded-xl p-10 lg:p-12 overflow-hidden transition-shadow duration-300"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        boxShadow: isHovered
          ? "0 20px 60px rgba(5, 15, 163, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)"
          : "0px 4px 20px rgba(0, 0, 0, 0.04)",
        backgroundColor: isHovered ? "rgba(5, 15, 163, 0.01)" : "#ffffff",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mouse-tracking gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(5,15,163,0.06), transparent 60%)`
            : "none",
        }}
      />

      {/* Service index number */}
      <span className="absolute top-6 right-8 text-6xl lg:text-7xl font-bold text-foreground/[0.04] group-hover:text-accent/[0.1] transition-colors duration-500 select-none">
        {indexLabel}
      </span>

      <div style={{ transformStyle: "preserve-3d" }} className="relative z-10">
        <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
          {service.name}
        </h3>
        <p className="text-muted text-sm lg:text-base leading-relaxed mb-10">
          {service.description}
        </p>
        <div className="flex items-center gap-2 text-accent text-sm font-medium">
          <span>Learn more</span>
          <svg
            className="w-4 h-4 transform transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
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

      {/* Bottom border animation */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
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

      // Cards stagger animation from below
      const cards = section.querySelectorAll(".service-card");
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 88%",
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
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
