"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { services, navigationLinks } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestConsultation: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  onRequestConsultation,
}: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement[]>([]);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Stagger links
      gsap.fromTo(
        linksRef.current.filter(Boolean),
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          document.body.style.overflow = "";
        },
      });
      setServicesExpanded(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const setLinkRef = useCallback((el: HTMLElement | null, index: number) => {
    if (el) linksRef.current[index] = el;
  }, []);

  let linkIndex = 0;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 bg-foreground/95 flex-col justify-between px-6 py-24 lg:hidden"
      style={{ display: "none" }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <nav className="flex flex-col gap-6">
        {navigationLinks.map((link) => {
          const currentIndex = linkIndex++;
          if (link.hasDropdown) {
            return (
              <div key={link.name}>
                <button
                  ref={(el) => setLinkRef(el, currentIndex)}
                  onClick={() => setServicesExpanded(!servicesExpanded)}
                  className="text-background text-3xl font-bold tracking-tight cursor-pointer flex items-center gap-2"
                  aria-expanded={servicesExpanded}
                >
                  {link.name}
                  <span
                    className={`text-lg transition-transform duration-300 ${
                      servicesExpanded ? "rotate-180" : ""
                    }`}
                  >
                    &#9662;
                  </span>
                </button>
                {servicesExpanded && (
                  <div className="mt-4 ml-4 flex flex-col gap-3">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="text-background/70 text-lg hover:text-background transition-colors duration-200"
                        onClick={onClose}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link
              key={link.name}
              href={link.href}
              ref={(el) => setLinkRef(el as HTMLElement, currentIndex)}
              className="text-background text-3xl font-bold tracking-tight hover:text-accent-light transition-colors duration-200"
              onClick={onClose}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8">
        <button
          ref={(el) => setLinkRef(el, linkIndex)}
          onClick={onRequestConsultation}
          className="w-full bg-accent text-white text-lg font-medium py-4 rounded-sm hover:bg-accent-light transition-colors duration-300 cursor-pointer"
        >
          Request Consultation
        </button>
      </div>
    </div>
  );
}
