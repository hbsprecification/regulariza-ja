import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import InitialAnalysis from "@/components/sections/InitialAnalysis";
import Calculator from "@/components/sections/Calculator";
import About from "@/components/sections/About";
import Differentials from "@/components/sections/Differentials";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";
import Structure from "@/components/sections/Structure";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";
import WhatsappFloat from "@/components/WhatsappFloat";
import PromoBanner from "@/components/PromoBanner";
import ConsultPopup from "@/components/ConsultPopup";

const Index = () => (
  <div className="min-h-screen bg-background">
    <PromoBanner />
    <Header />
    <main>
      <Hero />
      <Services />
      <InitialAnalysis />
      <Problem />
      <Calculator />
      <About />
      <Differentials />
      <Process />
      <CTA />
      <Structure />
      <ContactForm />
    </main>
    <Footer />
    <WhatsappFloat />
    <ConsultPopup />
  </div>
);

export default Index;
