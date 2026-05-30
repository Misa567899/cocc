"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Map placeholder - can be replaced with Google Maps or Mapbox embed */}
        <div
          ref={mapRef}
          className="relative h-[400px] bg-[#1a1a1a] rounded-sm border border-border overflow-hidden flex flex-col items-center justify-center"
        >
          {/* Pin icon */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4 opacity-80"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>

          <p className="text-white/80 text-center text-sm lg:text-base max-w-md px-6 leading-relaxed">
            Unit 13 Freeland Park, Wareham Road, Lytchett Matravers, Poole, BH16 6FA
          </p>

          {/* Subtle dot grid overlay */}
          <div className="absolute inset-0 opacity-[0.05]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:24px_24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
