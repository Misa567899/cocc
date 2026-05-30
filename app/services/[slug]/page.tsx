import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services-data";
import { ServiceHero } from "@/components/Services/ServiceHero";
import { ServiceContent } from "@/components/Services/ServiceContent";
import { ServiceCTA } from "@/components/Services/ServiceCTA";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | CACOYANNIS LIMITED" };
  }

  return {
    title: `${service.title} | CACOYANNIS LIMITED`,
    description: service.description[0],
    openGraph: {
      title: `${service.title} | CACOYANNIS LIMITED`,
      description: service.description[0],
      type: "website",
      siteName: "CACOYANNIS LIMITED",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main id="main-content">
      <ServiceHero title={service.title} headline={service.headline} />
      <ServiceContent
        description={service.description}
        capabilities={service.capabilities}
        processSteps={service.processSteps}
      />
      <ServiceCTA
        serviceTitle={service.title}
        relatedServices={service.relatedServices}
      />
    </main>
  );
}
