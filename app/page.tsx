import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import FounderStory from "@/components/FounderStory";
import Stories from "@/components/Stories";
import Pricing from "@/components/Pricing";
import Trust from "@/components/Trust";
import InterestStrip from "@/components/InterestStrip";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/components/BookingContext";

/* One job per section: hook → breadth → process → cost → emotion → proof →
   safety → reach → objections → action. */

export default function Home() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Pricing />
        <FounderStory />
        <Stories />
        <Trust />
        <InterestStrip />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </BookingProvider>
  );
}
