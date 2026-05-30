export interface Service {
  name: string;
  slug: string;
  description: string;
  previewImage: string;
}

export const services: Service[] = [
  {
    name: "Website Design",
    slug: "website-design",
    description:
      "Crafting visually stunning, user-centered website designs that elevate your brand and captivate your audience.",
    previewImage: "/images/services/website-design.jpg",
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Creating intuitive interfaces and seamless user experiences through research-driven design methodology.",
    previewImage: "/images/services/ui-ux-design.jpg",
  },
  {
    name: "Website Development",
    slug: "website-development",
    description:
      "Building fast, responsive, and accessible websites with modern technologies and best practices.",
    previewImage: "/images/services/website-development.jpg",
  },
  {
    name: "Frontend Development",
    slug: "frontend-development",
    description:
      "Implementing pixel-perfect, performant frontend solutions with cutting-edge frameworks and tooling.",
    previewImage: "/images/services/frontend-development.jpg",
  },
  {
    name: "E-Commerce Development",
    slug: "e-commerce-development",
    description:
      "Developing scalable e-commerce platforms that drive conversions and deliver exceptional shopping experiences.",
    previewImage: "/images/services/e-commerce-development.jpg",
  },
  {
    name: "Custom Web Applications",
    slug: "custom-web-applications",
    description:
      "Engineering bespoke web applications tailored to your unique business requirements and workflows.",
    previewImage: "/images/services/custom-web-applications.jpg",
  },
];

export const companyInfo = {
  name: "CACOYANNIS LIMITED",
  email: "ceo@cacoyannis.co.uk",
  phone: "+44 7491 319927",
  address:
    "Unit 13 Freeland Park, Wareham Road, Lytchett Matravers, Poole, England, BH16 6FA",
  website: "https://cacoyannis.co.uk",
};

export const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Contact", href: "/contact" },
];
