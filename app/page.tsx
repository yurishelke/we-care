import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BookEstimator from "@/components/BookEstimator";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Trust from "@/components/Trust";
import Stories from "@/components/Stories";
import InterestStrip from "@/components/InterestStrip";
import Faq from "@/components/Faq";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BookEstimator />
        <Services />
        <HowItWorks />
        <Pricing />
        <Trust />
        <Stories />
        <InterestStrip />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}