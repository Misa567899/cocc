import Hero from "@/components/Home/Hero";
import DesignShowcase from "@/components/Home/DesignShowcase";
import Services from "@/components/Home/Services";
import Process from "@/components/Home/Process";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <DesignShowcase />
      <Services />
      <Process />
      <Footer />
    </main>
  );
}
