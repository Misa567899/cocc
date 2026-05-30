import gsap from "gsap";

/**
 * Character reveal animation - splits text into characters and animates them in
 */
export function animateCharacterReveal(
  element: HTMLElement,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  const { duration = 0.8, stagger = 0.02, delay = 0, ease = "power3.out" } = options;
  const text = element.textContent || "";
  element.textContent = "";
  element.style.overflow = "hidden";

  const chars = text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.style.transform = "translateY(100%)";
    element.appendChild(span);
    return span;
  });

  return gsap.to(chars, {
    y: 0,
    duration,
    stagger,
    delay,
    ease,
  });
}

/**
 * Word reveal animation - splits text into words and animates them
 */
export function animateWordReveal(
  element: HTMLElement,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  const { duration = 0.8, stagger = 0.05, delay = 0, ease = "power3.out" } = options;
  const text = element.textContent || "";
  element.textContent = "";
  element.style.overflow = "hidden";

  const words = text.split(" ").map((word, i, arr) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";

    const span = document.createElement("span");
    span.textContent = word + (i < arr.length - 1 ? "\u00A0" : "");
    span.style.display = "inline-block";
    span.style.transform = "translateY(100%)";
    wrapper.appendChild(span);
    element.appendChild(wrapper);
    return span;
  });

  return gsap.to(words, {
    y: 0,
    duration,
    stagger,
    delay,
    ease,
  });
}

/**
 * Fade up animation for elements
 */
export function animateFadeUp(
  elements: HTMLElement | HTMLElement[] | NodeListOf<Element>,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    distance?: number;
    ease?: string;
  } = {}
) {
  const {
    duration = 1,
    stagger = 0.1,
    delay = 0,
    distance = 60,
    ease = "power3.out",
  } = options;

  return gsap.from(elements, {
    y: distance,
    opacity: 0,
    duration,
    stagger,
    delay,
    ease,
  });
}

/**
 * Stagger animation for a group of elements
 */
export function animateStagger(
  elements: HTMLElement[] | NodeListOf<Element>,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    from?: gsap.TweenVars;
    ease?: string;
  } = {}
) {
  const {
    duration = 0.8,
    stagger = 0.08,
    delay = 0,
    from = { y: 40, opacity: 0 },
    ease = "power3.out",
  } = options;

  return gsap.from(elements, {
    ...from,
    duration,
    stagger,
    delay,
    ease,
  });
}

/**
 * Magnetic button effect - element follows cursor within bounds
 */
export function createMagneticEffect(
  element: HTMLElement,
  options: {
    strength?: number;
    ease?: number;
  } = {}
) {
  const { strength = 0.3, ease = 0.15 } = options;
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let animationId: number;

  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX = (e.clientX - centerX) * strength;
    mouseY = (e.clientY - centerY) * strength;
  };

  const onMouseLeave = () => {
    mouseX = 0;
    mouseY = 0;
  };

  const animate = () => {
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;
    gsap.set(element, { x: currentX, y: currentY });
    animationId = requestAnimationFrame(animate);
  };

  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);
  animationId = requestAnimationFrame(animate);

  return () => {
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("mouseleave", onMouseLeave);
    cancelAnimationFrame(animationId);
    gsap.set(element, { x: 0, y: 0 });
  };
}

/**
 * Parallax effect helper - moves element at different rate than scroll
 */
export function createParallaxEffect(
  element: HTMLElement,
  options: {
    speed?: number;
    direction?: "vertical" | "horizontal";
  } = {}
) {
  const { speed = 0.5, direction = "vertical" } = options;

  const prop = direction === "vertical" ? "y" : "x";
  const distance = 100 * speed;

  return gsap.fromTo(
    element,
    { [prop]: -distance },
    {
      [prop]: distance,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}
