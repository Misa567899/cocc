"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useConsultation } from "@/components/ConsultationModal/ConsultationContext";

gsap.registerPlugin(ScrollTrigger);

export function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { openModal } = useConsultation();

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const button = buttonRef.current;
    if (!section || !heading || !button) return;

    const ctx = gsap.context(() => {
      // Word reveal for heading
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(words, {
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
      });

      tl.from(
        button,
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <h2
          ref={headingRef}
          className="text-editorial-md text-foreground mb-12"
        >
          Let&apos;s Create Something Remarkable
        </h2>
        <button
          ref={buttonRef}
          onClick={openModal}
          className="inline-block bg-accent text-white text-base font-medium px-10 py-4 rounded-sm hover:bg-accent-light transition-colors duration-300 cursor-pointer"
        >
          Request Consultation
        </button>
      </div>
    </section>
  );
}
