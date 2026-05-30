import { Metadata } from "next";
import { ContactHero } from "@/components/Contact/ContactHero";
import { ContactCards } from "@/components/Contact/ContactCards";
import { ContactMap } from "@/components/Contact/ContactMap";
import { ContactCTA } from "@/components/Contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact | CACOYANNIS LIMITED",
  description:
    "Get in touch with CACOYANNIS LIMITED. We would love to hear about your next project. Email, call, or visit our office in Poole, England.",
  openGraph: {
    title: "Contact | CACOYANNIS LIMITED",
    description:
      "Get in touch with CACOYANNIS LIMITED. We would love to hear about your next project.",
    type: "website",
    siteName: "CACOYANNIS LIMITED",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactCards />
      <ContactMap />
      <ContactCTA />
    </main>
  );
}
