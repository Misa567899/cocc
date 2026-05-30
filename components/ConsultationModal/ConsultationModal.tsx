"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ConsultationForm } from "./ConsultationForm";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const content = contentRef.current;
    if (!backdrop || !content) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(backdrop, { display: "flex" });
      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        content,
        { scale: 0.9, y: 30, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );
    } else {
      gsap.to(content, {
        scale: 0.95,
        y: 20,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(backdrop, { display: "none" });
          document.body.style.overflow = "";
        },
      });
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

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[60] bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ display: "none" }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Request consultation"
    >
      <div
        ref={contentRef}
        className="bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border">
          <h2 className="text-xl font-bold tracking-tight">Request Consultation</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-foreground hover:text-accent transition-colors duration-200 cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="2" y1="2" x2="18" y2="18" />
              <line x1="18" y1="2" x2="2" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="px-8 py-8">
          <ConsultationForm />
        </div>
      </div>
    </div>
  );
}
