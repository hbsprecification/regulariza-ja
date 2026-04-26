import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact";
import { ArrowRight, MessageCircle } from "lucide-react";

const CTA = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="relative overflow-hidden rounded-3xl gradient-hero px-6 py-16 text-center text-primary-foreground shadow-elegant sm:px-12 lg:py-20">
        <div className="absolute inset-0 opacity-10" aria-hidden style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Descubra se seu imóvel pode ser regularizado.
          </h2>
          <p className="mt-5 text-lg text-primary-foreground/85">
            Uma análise técnica pode identificar a situação do imóvel e indicar os caminhos possíveis para regularização.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <a href="#contato">Solicitar análise do imóvel <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent font-semibold text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1 h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;