import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-engineer.jpg";

const Hero = () => (
  <section id="hero" className="relative overflow-hidden pt-24">
    <div className="absolute inset-0 gradient-hero" aria-hidden />
    <div className="absolute inset-0 opacity-[0.05]" aria-hidden style={{
      backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
      backgroundSize: "48px 48px",
    }} />
    <div className="container relative grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:gap-8 lg:py-28">
      <div className="text-primary-foreground">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5" />
          Engenheiro Civil — CREA-BA 051598661-5
        </div>
        <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
          Regularize seu imóvel <span className="text-accent-foreground/90 underline decoration-accent decoration-4 underline-offset-4">sem burocracia</span>.
        </h1>
        <p className="mt-6 text-lg font-medium text-primary-foreground/90 sm:text-xl">
          Consultoria técnica especializada em regularização de obras e imóveis urbanos.
        </p>
        <p className="mt-4 max-w-xl text-base text-primary-foreground/75">
          Muitos imóveis apresentam irregularidades que impedem venda, financiamento ou registro adequado. Com análise técnica e orientação especializada, é possível identificar o problema e conduzir o processo com segurança.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="secondary" className="font-semibold">
            <a href="#contato">
              Solicitar análise do imóvel <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent font-semibold text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1 h-4 w-4" /> Falar no WhatsApp
            </a>
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap gap-6 text-xs text-primary-foreground/70">
          <div><span className="block text-2xl font-bold text-primary-foreground">CREA</span>Registro ativo</div>
          <div className="border-l border-white/20 pl-6"><span className="block text-2xl font-bold text-primary-foreground">100%</span>Análise técnica</div>
          <div className="border-l border-white/20 pl-6"><span className="block text-2xl font-bold text-primary-foreground">+10</span>Tipos de regularização</div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 rounded-3xl bg-accent/20 blur-2xl" aria-hidden />
        <div className="relative overflow-hidden rounded-2xl shadow-elegant ring-1 ring-white/20">
          <img
            src={heroImage}
            alt="Engenheiro civil em obra urbana analisando projetos"
            width={1536}
            height={1024}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-4 -left-4 hidden rounded-xl bg-card p-4 shadow-elegant sm:block">
          <p className="text-xs font-medium text-muted-foreground">Especialização</p>
          <p className="font-display text-sm font-bold text-primary">Engenharia & Arquitetura Legal</p>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;