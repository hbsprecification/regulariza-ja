import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/StatsBar";
import TrustSignals from "@/components/sections/TrustSignals";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import InitialAnalysis from "@/components/sections/InitialAnalysis";
import Calculator from "@/components/sections/Calculator";
import About from "@/components/sections/About";
import Differentials from "@/components/sections/Differentials";
import Process from "@/components/sections/Process";
import ScrollCinematicBackground from "@/components/ScrollCinematicBackground";
import Testimonials from "@/components/sections/Testimonials";
import Benefits from "@/components/sections/Benefits";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Structure from "@/components/sections/Structure";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";
import WhatsappFloat from "@/components/WhatsappFloat";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import PromoBanner from "@/components/PromoBanner";
import ConsultPopup from "@/components/ConsultPopup";
import BlueprintBackground from "@/components/BlueprintBackground";

/**
 * CRO-optimized section order:
 * 1. PromoBanner  — urgência / benefício imediato
 * 2. Header       — navegação + CTA
 * 3. Hero         — headline + animação scroll + CTA primário
 * 4. StatsBar     — contadores de credibilidade (GSAP)
 * 5. TrustSignals — prova social
 * 6. Problem      — identificação com a dor
 * 7. InitialAnalysis — como funciona (3 passos)
 * 8. Calculator   — engajamento + qualificação do lead
 * 9. Services     — serviços disponíveis
 * 10. About       — autoridade profissional
 * 11. Differentials — diferenciais
 * 12. Process     — processo completo (4 etapas)
 * 13. CTA         — chamada de ação intermediária
 * 14. FAQ         — redução de objeções + SEO
 * 15. ContactForm — formulário
 * 16. Footer
 */
const Index = () => (
  <div className="min-h-screen bg-background">
    <PromoBanner />
    <Header />
    <main>
      <Hero />
      <StatsBar />
      <TrustSignals />
      <Problem />
      <InitialAnalysis />
      <Services />
      <About />
      <Testimonials />
      <Differentials />
      <ScrollCinematicBackground>
        <Process />
        <Benefits />
        <Calculator />
      </ScrollCinematicBackground>
      <CTA />
      <FAQ />
      <Structure />
      <ContactForm />
    </main>
    <Footer />
    <WhatsappFloat />
    <MobileStickyCTA />
    <ConsultPopup />
  </div>
);

export default Index;
