import { Button } from "@/components/ui/button";
import { consultLink, whatsappLink } from "@/lib/contact";
import { ArrowRight, MessageCircle, ShieldCheck, GraduationCap, Award, Star } from "lucide-react";
import heroImage from "@/assets/hero-engineer.jpg";

const Hero = () => (
  <section id="hero" className="relative overflow-hidden pt-24" aria-labelledby="hero-heading">
    {/* Background gradient */}
    <div className="absolute inset-0 gradient-hero" aria-hidden />
    {/* Grid texture */}
    <div className="absolute inset-0 opacity-[0.04]" aria-hidden style={{
      backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
      backgroundSize: "48px 48px",
    }} />
    {/* Accent glow */}
    <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/20 blur-3xl" aria-hidden />

    <div className="container relative grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:gap-8 lg:py-28">
      <div className="text-primary-foreground">

        {/* CREA badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5 text-accent" />
          Engenheiro Civil — CREA-BA 051598661-5
        </div>

        {/* Headline principal */}
        <h1 id="hero-heading" className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.5rem]">
          Regularize seu imóvel com{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10 text-accent">segurança técnica</span>
            <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-accent/40" aria-hidden />
          </span>{" "}
          e sem burocracia.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg font-medium text-primary-foreground/90 sm:text-xl leading-relaxed">
          Análise técnica e orientação profissional para resolver pendências de construção, documentação e registro de imóveis.
        </p>

        {/* Credenciais do profissional */}
        <div className="mt-7 rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
          <p className="font-display text-lg font-bold text-primary-foreground">Jádson Castro Santana</p>
          <p className="mt-0.5 text-sm font-medium text-primary-foreground/80">Engenheiro Civil — Especialista em Regularização de Imóveis</p>
          <div className="mt-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-primary-foreground/70">
              <GraduationCap className="h-3.5 w-3.5 text-accent flex-shrink-0" />
              Pós-graduado em Arquitetura e Engenharia Legal
            </div>
            <div className="flex items-center gap-2 text-xs text-primary-foreground/70">
              <GraduationCap className="h-3.5 w-3.5 text-accent flex-shrink-0" />
              Pós-graduando em Building Information Modeling (Master BIM)
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-accent font-bold text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 transition-all hover:scale-[1.02] hover:shadow-accent/50">
            <a href={consultLink()} target="_blank" rel="noopener noreferrer" id="hero-cta-primary">
              <MessageCircle className="mr-2 h-4 w-4" />
              Quero minha consultoria gratuita
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent font-semibold text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
            <a href="#calculadora" id="hero-cta-secondary">
              <ArrowRight className="mr-1 h-4 w-4" /> Verificar meu imóvel
            </a>
          </Button>
        </div>

        {/* Trust signals */}
        <div className="mt-10 flex flex-wrap gap-6 text-xs text-primary-foreground/70">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-accent" />
            <span><strong className="text-primary-foreground text-sm font-bold">CREA-BA</strong><br />Registro ativo</span>
          </div>
          <div className="border-l border-white/20 pl-6 flex items-center gap-2">
            <Star className="h-4 w-4 text-accent" />
            <span><strong className="text-primary-foreground text-sm font-bold">Gratuita</strong><br />Análise inicial</span>
          </div>
          <div className="border-l border-white/20 pl-6 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <span><strong className="text-primary-foreground text-sm font-bold">+10</strong><br />Tipos de regularização</span>
          </div>
        </div>
      </div>

      {/* Imagem hero */}
      <div className="relative">
        <div className="absolute -inset-4 rounded-3xl bg-accent/20 blur-3xl" aria-hidden />
        <div className="relative overflow-hidden rounded-2xl shadow-elegant ring-1 ring-white/20">
          <img
            src={heroImage}
            alt="Jádson Castro Santana, Engenheiro Civil, analisando projetos de regularização de imóvel"
            width={1536}
            height={1024}
            className="h-full w-full object-cover"
          />
          {/* Overlay gradient bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/60 to-transparent" aria-hidden />
        </div>

        {/* Badge flutuante — especialização */}
        <div className="absolute -bottom-4 -left-4 hidden rounded-xl bg-card p-4 shadow-elegant ring-1 ring-border sm:block">
          <p className="text-[11px] font-medium text-muted-foreground">Especialização</p>
          <p className="font-display text-sm font-bold text-primary">Arquitetura & Engenharia Legal</p>
        </div>

        {/* Badge flutuante — gratuita */}
        <div className="absolute -top-4 -right-4 hidden rounded-xl bg-accent px-4 py-3 shadow-elegant sm:block">
          <p className="text-center text-xs font-bold text-accent-foreground leading-tight">Consultoria<br />GRATUITA</p>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;