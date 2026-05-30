"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companyInfo } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function ContactCards() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll(".contact-card");
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Email Card */}
          <a
            href={`mailto:${companyInfo.email}`}
            className="contact-card group block p-8 lg:p-10 bg-white border border-border rounded-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-6 text-accent">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 6L2 7" />
              </svg>
            </div>
            <p className="text-sm text-muted uppercase tracking-[0.15em] mb-2">
              Email Us
            </p>
            <p className="text-base lg:text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">
              {companyInfo.email}
            </p>
          </a>

          {/* Phone Card */}
          <a
            href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
            className="contact-card group block p-8 lg:p-10 bg-white border border-border rounded-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-6 text-accent">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <p className="text-sm text-muted uppercase tracking-[0.15em] mb-2">
              Call Us
            </p>
            <p className="text-base lg:text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">
              {companyInfo.phone}
            </p>
          </a>

          {/* Address Card */}
          <div className="contact-card group p-8 lg:p-10 bg-white border border-border rounded-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center mb-6 text-accent">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="text-sm text-muted uppercase tracking-[0.15em] mb-2">
              Visit Us
            </p>
            <p className="text-base lg:text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300 leading-relaxed">
              {companyInfo.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
