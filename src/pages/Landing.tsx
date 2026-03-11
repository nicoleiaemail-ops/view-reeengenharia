import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Results } from "@/components/Results";
import { Reengenharia } from "@/components/Reengenharia";
import { Pains } from "@/components/Pains";
import { CostOfNotSeeing } from "@/components/CostOfNotSeeing";
import { Solution } from "@/components/Solution";
import { MidCTA } from "@/components/MidCTA";
import { Pillars } from "@/components/Pillars";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const Landing = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Results />
      <Reengenharia />
      <Pains />
      <CostOfNotSeeing />
      <Solution />
      <MidCTA />
      <Pillars />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Landing;
