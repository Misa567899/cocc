"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companyInfo, services } from "@/lib/constants";
import { MagneticButton } from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cta = ctaRef.current;
    const columns = columnsRef.current;
    if (!section || !cta || !columns) return;

    const ctx = gsap.context(() => {
      // CTA word reveal
      const ctaText = cta.textContent || "";
      cta.textContent = "";
      cta.style.overflow = "hidden";

      const words = ctaText.split(" ").map((word, i, arr) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        const span = document.createElement("span");
        span.textContent = word + (i < arr.length - 1 ? "\u00A0" : "");
        span.style.display = "inline-block";
        span.style.transform = "translateY(100%)";
        wrapper.appendChild(span);
        cta.appendChild(wrapper);
        return span;
      });

      gsap.to(words, {
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cta,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Column stagger
      const cols = columns.querySelectorAll(".footer-col");
      gsap.from(cols, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: columns,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={sectionRef}
      className="bg-foreground text-white pt-24 lg:pt-32 pb-8"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Large CTA Section */}
        <div className="mb-20 lg:mb-32">
          <h2
            ref={ctaRef}
            className="text-editorial-md text-white mb-10"
          >
            Let&apos;s Build Something Exceptional
          </h2>
          <MagneticButton as="div" strength={0.3}>
            <Link
              href="/contact"
              className="inline-block bg-accent text-white text-sm md:text-base font-medium px-8 py-4 rounded-sm hover:bg-accent-light transition-colors duration-300"
            >
              Start a Project
            </Link>
          </MagneticButton>
        </div>

        {/* Visual Separator */}
        <div className="mb-20 lg:mb-32">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Footer Columns */}
        <div
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-16 border-b border-white/10"
        >
          {/* Company Info */}
          <div className="footer-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-6">
              Company
            </h3>
            <p className="text-sm text-white/80 font-medium mb-3">
              {companyInfo.name}
            </p>
            <p className="text-sm text-white/60 leading-relaxed mb-2">
              {companyInfo.address}
            </p>
            <a
              href={`mailto:${companyInfo.email}`}
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 block mb-1"
            >
              {companyInfo.email}
            </a>
            <a
              href={`tel:${companyInfo.phone}`}
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 block"
            >
              {companyInfo.phone}
            </a>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/80 hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-white/80 hover:text-white transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/80 hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-6">
              Services
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/80 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-xs text-white/40">
            &copy; 2024 {companyInfo.name}. All rights reserved.
          </p>
          <MagneticButton
            onClick={scrollToTop}
            className="text-xs text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer"
            aria-label="Back to top"
            strength={0.3}
          >
            <span>Back to top</span>
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
                d="M5 15l7-7 7 7"
              />
            </svg>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
