import { Button } from "@/components/ui/button";
import { consultLink, whatsappLink } from "@/lib/contact";
import { ArrowRight, MessageCircle } from "lucide-react";

const CTA = () => (
  <section className="blueprint-bg relative overflow-hidden py-20 lg:py-28" aria-labelledby="cta-heading">
    <div className="container">
      <div className="relative overflow-hidden rounded-3xl gradient-hero px-6 py-16 text-center text-primary-foreground shadow-elegant sm:px-12 lg:py-20">
        {/* Texture */}
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden style={{
          backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        {/* Accent glow */}
        <div className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 bg-accent/20 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-2xl">
          <span className="inline-block rounded-full bg-accent/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent ring-1 ring-accent/30">
            Consultoria gratuita
          </span>
          <h2 id="cta-heading" className="mt-5 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Descubra se seu imóvel<br className="hidden sm:block" /> pode ser regularizado.
          </h2>
          <p className="mt-5 text-lg text-primary-foreground/85 max-w-xl mx-auto">
            Uma análise técnica pode identificar a situação do imóvel e mostrar os caminhos possíveis — <strong className="text-white">sem custo inicial.</strong>
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-accent font-bold text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all hover:scale-[1.02]" id="cta-primary">
              <a href={consultLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Quero minha consultoria gratuita
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent font-semibold text-primary-foreground hover:bg-white/10 hover:text-primary-foreground" id="cta-secondary">
              <a href="#contato">
                Preencher formulário <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>

          <p className="mt-5 text-xs text-primary-foreground/60">
            Atendemos imóveis em Itabuna, Ilhéus e toda a região sul da Bahia.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;