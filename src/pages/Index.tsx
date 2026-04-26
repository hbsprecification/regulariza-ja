import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import TrustSignals from "@/components/sections/TrustSignals";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import InitialAnalysis from "@/components/sections/InitialAnalysis";
import Calculator from "@/components/sections/Calculator";
import About from "@/components/sections/About";
import Differentials from "@/components/sections/Differentials";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Structure from "@/components/sections/Structure";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";
import WhatsappFloat from "@/components/WhatsappFloat";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import PromoBanner from "@/components/PromoBanner";
import ConsultPopup from "@/components/ConsultPopup";

/**
 * Landing page order optimized for Conversion Rate Optimization (CRO):
 *
 * 1. PromoBanner  — Urgência / benefício imediato
 * 2. Header       — Navegação + CTA header
 * 3. Hero         — Headline + credenciais + CTA primário
 * 4. TrustSignals — Prova social / Por que confiar
 * 5. Problem      — Identificação com dor do visitante
 * 6. InitialAnalysis — Como funciona (3 passos)
 * 7. Calculator   — Engajamento interativo + qualificação de lead
 * 8. Services     — Serviços disponíveis
 * 9. About        — Autoridade profissional (Jádson)
 * 10. Differentials — Diferenciais
 * 11. Process     — Processo completo (4 etapas)
 * 12. CTA         — Chamada de ação intermediária
 * 13. FAQ         — Redução de objeções + SEO
 * 14. ContactForm — Formulário de contato
 * 15. Footer
 */
const Index = () => (
  <div className="min-h-screen bg-background">
    <PromoBanner />
    <Header />
    <main>
      <Hero />
      <TrustSignals />
      <Problem />
      <InitialAnalysis />
      <Calculator />
      <Services />
      <About />
      <Differentials />
      <Process />
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
