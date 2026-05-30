"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { services } from "@/lib/constants";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isOpen) {
      gsap.set(menu, { display: "block" });
      gsap.fromTo(
        menu,
        { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );

      // Stagger links
      gsap.fromTo(
        linksRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(menu, {
        clipPath: "inset(0% 0% 100% 0%)",
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });
    }
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

  // Close on click outside
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const setLinkRef = useCallback((el: HTMLAnchorElement | null, index: number) => {
    if (el) linksRef.current[index] = el;
  }, []);

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg"
      style={{ display: "none" }}
      onMouseLeave={onClose}
      role="menu"
      aria-label="Services menu"
    >
      <div
        className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12"
        onClick={handleBackdropClick}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Service Links */}
          <div className="space-y-1">
            <p className="text-muted text-xs uppercase tracking-[0.2em] mb-6">
              Our Services
            </p>
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                ref={(el) => setLinkRef(el, index)}
                className={`block py-3 text-lg font-medium transition-colors duration-200 ${
                  hoveredIndex === index
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={onClose}
                role="menuitem"
              >
                {service.name}
              </Link>
            ))}
          </div>

          {/* Right: Preview */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="bg-border/30 rounded-sm aspect-video flex items-center justify-center mb-4">
              <span className="text-muted text-sm">
                {services[hoveredIndex]?.name} Preview
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              {services[hoveredIndex]?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
