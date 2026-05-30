"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { companyInfo, navigationLinks } from "@/lib/constants";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { ConsultationModal } from "@/components/ConsultationModal/ConsultationModal";
import { MagneticButton } from "@/components/MagneticButton";
import { useConsultation } from "@/components/ConsultationModal/ConsultationContext";

export function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOpen: modalOpen, openModal, closeModal } = useConsultation();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Entrance animation
    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    // Scroll handler for background transition
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenModal = useCallback(() => {
    openModal();
    setMobileMenuOpen(false);
  }, [openModal]);

  const handleCloseModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleToggleMegaMenu = useCallback(() => {
    setMegaMenuOpen((prev) => !prev);
  }, []);

  const handleCloseMegaMenu = useCallback(() => {
    setMegaMenuOpen(false);
  }, []);

  const handleToggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
        style={{ opacity: 0 }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-foreground font-bold text-sm tracking-[0.15em] uppercase hover:text-accent transition-colors duration-300"
            >
              {companyInfo.name}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="Main navigation">
              {navigationLinks.map((link) =>
                link.hasDropdown ? (
                  <button
                    key={link.name}
                    onClick={handleToggleMegaMenu}
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    className="text-foreground text-sm tracking-wide hover:text-accent transition-colors duration-300 cursor-pointer"
                    aria-expanded={megaMenuOpen}
                    aria-haspopup="true"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-foreground text-sm tracking-wide hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <MagneticButton
                onClick={handleOpenModal}
                className="hidden lg:block bg-accent text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-accent-light transition-colors duration-300 cursor-pointer"
                strength={0.3}
              >
                Request Consultation
              </MagneticButton>

              {/* Hamburger */}
              <button
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
                onClick={handleToggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                <span
                  className={`block w-6 h-[2px] bg-foreground transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-[2px] bg-foreground transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <MegaMenu isOpen={megaMenuOpen} onClose={handleCloseMegaMenu} />
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={handleCloseMobileMenu}
        onRequestConsultation={handleOpenModal}
      />

      {/* Consultation Modal */}
      <ConsultationModal isOpen={modalOpen} onClose={handleCloseModal} />
    </>
  );
}
