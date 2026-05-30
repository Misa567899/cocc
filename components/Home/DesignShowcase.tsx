"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const codeLines = [
  '<span class="text-purple-400">&lt;section</span> <span class="text-green-400">class</span>=<span class="text-amber-300">"hero"</span><span class="text-purple-400">&gt;</span>',
  '  <span class="text-purple-400">&lt;h1</span> <span class="text-green-400">class</span>=<span class="text-amber-300">"title"</span><span class="text-purple-400">&gt;</span>',
  '    Design that inspires',
  '  <span class="text-purple-400">&lt;/h1&gt;</span>',
  '  <span class="text-purple-400">&lt;p</span> <span class="text-green-400">class</span>=<span class="text-amber-300">"subtitle"</span><span class="text-purple-400">&gt;</span>',
  '    Crafted with precision',
  '  <span class="text-purple-400">&lt;/p&gt;</span>',
  '  <span class="text-purple-400">&lt;button</span> <span class="text-green-400">class</span>=<span class="text-amber-300">"cta"</span><span class="text-purple-400">&gt;</span>',
  '    Get Started',
  '  <span class="text-purple-400">&lt;/button&gt;</span>',
  '<span class="text-purple-400">&lt;/section&gt;</span>',
];

export default function DesignShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const codeLinesRef = useRef<HTMLDivElement>(null);
  const uiAssemblyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const codeEditor = codeEditorRef.current;
    const codeContainer = codeLinesRef.current;
    const uiAssembly = uiAssemblyRef.current;
    if (!section || !heading || !codeEditor || !codeContainer || !uiAssembly)
      return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      // Heading reveal on scroll
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

      // Code editor fade in
      gsap.from(codeEditor, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: codeEditor,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Code typing animation
      const lineElements = codeContainer.querySelectorAll(".code-line");
      gsap.from(lineElements, {
        opacity: 0,
        x: -10,
        duration: 0.3,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: codeEditor,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // UI Assembly animation
      const uiElements = uiAssembly.querySelectorAll(".ui-piece");
      gsap.from(uiElements, {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: uiAssembly,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 lg:py-48 bg-white border-t border-border"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section heading */}
        <h2
          ref={headingRef}
          className="text-editorial-md text-foreground mb-20 lg:mb-32"
        >
          What We Create
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Code Editor Visual */}
          <div ref={codeEditorRef}>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              {/* macOS window controls */}
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-gray-400 text-xs font-mono">
                  index.html
                </span>
              </div>
              {/* Code content */}
              <div
                ref={codeLinesRef}
                className="bg-gray-900 p-6 font-mono text-sm leading-relaxed min-h-[300px]"
              >
                {codeLines.map((line, i) => (
                  <div
                    key={i}
                    className="code-line text-gray-300"
                    dangerouslySetInnerHTML={{ __html: line }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* UI Assembly Visual */}
          <div ref={uiAssemblyRef} className="flex flex-col gap-4">
            <p className="text-muted text-sm uppercase tracking-widest mb-4">
              UI Assembly
            </p>
            {/* Navigation bar */}
            <div className="ui-piece bg-white border border-border rounded-lg p-4 shadow-md flex items-center justify-between">
              <div className="w-24 h-3 bg-foreground rounded" />
              <div className="flex gap-3">
                <div className="w-12 h-3 bg-gray-300 rounded" />
                <div className="w-12 h-3 bg-gray-300 rounded" />
                <div className="w-12 h-3 bg-gray-300 rounded" />
              </div>
              <div className="w-20 h-8 bg-accent rounded-sm" />
            </div>
            {/* Hero block */}
            <div className="ui-piece bg-gray-50 border border-border rounded-lg p-8 shadow-md flex flex-col items-center gap-4">
              <div className="w-3/4 h-6 bg-foreground rounded" />
              <div className="w-1/2 h-4 bg-gray-300 rounded" />
              <div className="w-32 h-10 bg-accent rounded-sm mt-2" />
            </div>
            {/* Cards row */}
            <div className="ui-piece grid grid-cols-3 gap-3">
              <div className="bg-white border border-border rounded-lg p-4 shadow-md">
                <div className="w-full h-16 bg-gray-100 rounded mb-3" />
                <div className="w-3/4 h-3 bg-foreground rounded mb-2" />
                <div className="w-full h-2 bg-gray-200 rounded" />
              </div>
              <div className="bg-white border border-border rounded-lg p-4 shadow-md">
                <div className="w-full h-16 bg-gray-100 rounded mb-3" />
                <div className="w-3/4 h-3 bg-foreground rounded mb-2" />
                <div className="w-full h-2 bg-gray-200 rounded" />
              </div>
              <div className="bg-white border border-border rounded-lg p-4 shadow-md">
                <div className="w-full h-16 bg-gray-100 rounded mb-3" />
                <div className="w-3/4 h-3 bg-foreground rounded mb-2" />
                <div className="w-full h-2 bg-gray-200 rounded" />
              </div>
            </div>
            {/* Footer block */}
            <div className="ui-piece bg-foreground rounded-lg p-6 shadow-md">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="w-16 h-2 bg-white/40 rounded" />
                  <div className="w-20 h-2 bg-white/20 rounded" />
                  <div className="w-14 h-2 bg-white/20 rounded" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-16 h-2 bg-white/40 rounded" />
                  <div className="w-20 h-2 bg-white/20 rounded" />
                  <div className="w-14 h-2 bg-white/20 rounded" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-16 h-2 bg-white/40 rounded" />
                  <div className="w-20 h-2 bg-white/20 rounded" />
                  <div className="w-14 h-2 bg-white/20 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
