export interface ServiceDetail {
  slug: string;
  title: string;
  headline: string;
  description: string[];
  capabilities: string[];
  processSteps: { title: string; description: string }[];
  relatedServices: string[];
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "website-design",
    title: "Website Design",
    headline: "Websites That Command Attention",
    description: [
      "Every great digital presence begins with intentional design. We craft websites that are not just visually striking but strategically built to communicate your brand story, engage visitors, and drive meaningful action.",
      "Our design process blends deep brand understanding with modern aesthetics, creating compositions that feel both timeless and forward-thinking. From typography hierarchies to colour systems, every detail is considered.",
      "The result is a website that feels unmistakably yours while delivering an experience that keeps visitors engaged and converts them into loyal customers.",
    ],
    capabilities: [
      "Brand-Driven Design",
      "Responsive Layouts",
      "Visual Storytelling",
      "Typography Systems",
      "Colour Strategy",
      "Layout Composition",
      "Interaction Design",
      "Design Systems",
    ],
    processSteps: [
      {
        title: "Discovery & Research",
        description:
          "We immerse ourselves in your brand, audience, and competitive landscape to establish a strong design foundation.",
      },
      {
        title: "Concept Development",
        description:
          "Mood boards, style explorations, and initial concepts that define the visual direction for your website.",
      },
      {
        title: "Design Execution",
        description:
          "Full-fidelity page designs with responsive considerations, interaction states, and detailed specifications.",
      },
      {
        title: "Refinement & Handoff",
        description:
          "Iterative refinement based on feedback, followed by developer-ready assets and documentation.",
      },
    ],
    relatedServices: ["ui-ux-design", "website-development", "frontend-development"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    headline: "Interfaces That Feel Intuitive",
    description: [
      "Great interfaces do not make users think. They guide, inform, and delight through careful attention to user needs, behaviours, and expectations. Our UI/UX design process puts people at the centre of every decision.",
      "We combine rigorous user research with creative interface design to build digital products that feel effortless to use. Every interaction is mapped, tested, and refined until it feels natural.",
      "From complex web applications to focused landing pages, we design experiences that reduce friction, increase satisfaction, and achieve your business objectives.",
    ],
    capabilities: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Usability Testing",
      "Information Architecture",
      "Interaction Patterns",
      "Accessibility Design",
    ],
    processSteps: [
      {
        title: "Research & Analysis",
        description:
          "User interviews, competitive analysis, and data review to understand the problem space deeply.",
      },
      {
        title: "Architecture & Wireframes",
        description:
          "Information architecture, user flows, and low-fidelity wireframes that define structure and navigation.",
      },
      {
        title: "UI Design & Prototyping",
        description:
          "High-fidelity interface design with interactive prototypes for testing and validation.",
      },
      {
        title: "Testing & Iteration",
        description:
          "Usability testing with real users, followed by data-driven refinements to optimise the experience.",
      },
      {
        title: "Design System Documentation",
        description:
          "Comprehensive component libraries and guidelines ensuring consistency across the product.",
      },
    ],
    relatedServices: ["website-design", "frontend-development", "custom-web-applications"],
  },
  {
    slug: "website-development",
    title: "Website Development",
    headline: "Code That Performs",
    description: [
      "A beautiful design deserves code that matches its ambition. We build websites with modern architectures, clean codebases, and performance-first thinking that ensures your site loads fast and ranks high.",
      "Our development approach prioritises semantic HTML, accessible markup, and SEO best practices from the ground up. Combined with modern tooling and deployment strategies, the result is a website that performs brilliantly.",
      "Whether you need a marketing site, a content-rich platform, or a multi-page corporate presence, we deliver code that is maintainable, scalable, and built to last.",
    ],
    capabilities: [
      "Performance Optimisation",
      "SEO Architecture",
      "CMS Integration",
      "Responsive Implementation",
      "Accessibility Compliance",
      "Server-Side Rendering",
      "Analytics Integration",
    ],
    processSteps: [
      {
        title: "Technical Planning",
        description:
          "Architecture decisions, technology selection, and development roadmap aligned with project requirements.",
      },
      {
        title: "Core Development",
        description:
          "Building the foundation with clean, semantic code, responsive layouts, and CMS configuration.",
      },
      {
        title: "Performance & SEO",
        description:
          "Optimisation pass for speed, Core Web Vitals, meta data, structured data, and search visibility.",
      },
      {
        title: "Testing & Launch",
        description:
          "Cross-browser testing, accessibility audits, performance benchmarking, and deployment to production.",
      },
    ],
    relatedServices: ["website-design", "frontend-development", "e-commerce-development"],
  },
  {
    slug: "frontend-development",
    title: "Frontend Development",
    headline: "Pixels to Production",
    description: [
      "Translating design into reality requires precision, creativity, and deep technical expertise. Our frontend development turns static designs into dynamic, interactive experiences that feel alive and responsive.",
      "We specialise in modern frameworks and animation engineering, building interfaces that are not just functional but memorable. Every hover state, transition, and scroll interaction is crafted with intention.",
      "From component architecture to build optimisation, our frontend code is structured for scalability, performance, and long-term maintainability.",
    ],
    capabilities: [
      "React / Next.js",
      "Animation Engineering",
      "Component Libraries",
      "TypeScript Development",
      "State Management",
      "Build Optimisation",
      "Progressive Enhancement",
    ],
    processSteps: [
      {
        title: "Design Analysis",
        description:
          "Breaking down designs into components, identifying interaction patterns, and planning the architecture.",
      },
      {
        title: "Component Development",
        description:
          "Building reusable, well-documented components with proper TypeScript typing and test coverage.",
      },
      {
        title: "Animation & Interaction",
        description:
          "Implementing smooth animations, scroll effects, and micro-interactions that bring the design to life.",
      },
      {
        title: "Integration & Optimisation",
        description:
          "API integration, performance tuning, bundle optimisation, and cross-device testing.",
      },
    ],
    relatedServices: ["ui-ux-design", "website-development", "custom-web-applications"],
  },
  {
    slug: "e-commerce-development",
    title: "E-Commerce Development",
    headline: "Stores That Convert",
    description: [
      "A successful online store is more than a product catalogue. It is a conversion engine that guides shoppers from discovery to purchase with minimal friction and maximum confidence.",
      "We build e-commerce experiences that balance beautiful design with commercial effectiveness. From product pages to checkout flows, every element is optimised for conversion while maintaining your brand standards.",
      "Our solutions scale with your business, handling growing product lines, traffic spikes, and evolving payment requirements with robust, tested architecture.",
    ],
    capabilities: [
      "Custom Storefronts",
      "Payment Integration",
      "Inventory Systems",
      "Checkout Optimisation",
      "Product Filtering",
      "Order Management",
      "Analytics & Tracking",
      "Multi-Currency Support",
    ],
    processSteps: [
      {
        title: "Commerce Strategy",
        description:
          "Understanding your products, customers, and sales process to design the optimal e-commerce architecture.",
      },
      {
        title: "Platform Development",
        description:
          "Building the storefront, product management, cart system, and checkout flow with your chosen platform.",
      },
      {
        title: "Payment & Fulfilment",
        description:
          "Integrating payment gateways, shipping calculators, tax automation, and order management systems.",
      },
      {
        title: "Testing & Optimisation",
        description:
          "Load testing, conversion rate optimisation, A/B testing setup, and performance benchmarking.",
      },
      {
        title: "Launch & Growth",
        description:
          "Go-live support, analytics configuration, and ongoing optimisation recommendations for growth.",
      },
    ],
    relatedServices: ["website-design", "website-development", "custom-web-applications"],
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    headline: "Solutions Built for You",
    description: [
      "When off-the-shelf tools fall short, custom web applications provide the exact solution your business needs. We engineer bespoke platforms that streamline operations, automate workflows, and unlock new capabilities.",
      "Our application development combines modern architecture with pragmatic engineering. We build systems that are reliable, secure, and designed to evolve alongside your business requirements.",
      "From internal tools to customer-facing platforms, we deliver applications that solve real problems with elegant, maintainable code.",
    ],
    capabilities: [
      "API Development",
      "Real-time Features",
      "Database Architecture",
      "Authentication Systems",
      "Cloud Infrastructure",
      "Third-Party Integrations",
      "Automated Testing",
    ],
    processSteps: [
      {
        title: "Requirements & Scoping",
        description:
          "Deep-dive into your business needs, workflows, and technical requirements to define the application scope.",
      },
      {
        title: "Architecture & Design",
        description:
          "System architecture, database design, API specifications, and interface design for the application.",
      },
      {
        title: "Iterative Development",
        description:
          "Agile development in sprints with regular demos, feedback cycles, and continuous deployment.",
      },
      {
        title: "Testing & Security",
        description:
          "Comprehensive testing, security audits, performance optimisation, and documentation.",
      },
      {
        title: "Deployment & Support",
        description:
          "Production deployment, monitoring setup, team training, and ongoing maintenance planning.",
      },
    ],
    relatedServices: ["frontend-development", "e-commerce-development", "ui-ux-design"],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return serviceDetails.map((s) => s.slug);
}
