import portrait from "@/assets/jadson-portrait.jpg";
import { Award, MessageSquare, Sparkles } from "lucide-react";

const pillars = [
  { icon: Award, title: "Engenharia aplicada", desc: "Conhecimento técnico voltado à regularização urbana." },
  { icon: MessageSquare, title: "Clareza na comunicação", desc: "Linguagem direta, sem juridiquês, acessível a todos." },
  { icon: Sparkles, title: "Desburocratização", desc: "Tradução de normas em orientações práticas e aplicáveis." },
];

const About = () => (
  <section id="sobre" className="bg-secondary/50 py-20 lg:py-28">
    <div className="container grid gap-12 lg:grid-cols-5 lg:items-center">
      <div className="relative lg:col-span-2">
        <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" aria-hidden />
        <img
          src={portrait}
          alt="Jádson Castro Santana, Engenheiro Civil"
          width={1024}
          height={1280}
          loading="lazy"
          className="relative mx-auto aspect-[4/5] w-full max-w-sm rounded-2xl object-cover shadow-elegant"
        />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-card px-5 py-3 text-center shadow-elegant ring-1 ring-border">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">CREA-BA</p>
          <p className="font-display text-sm font-bold text-primary">051598661-5</p>
        </div>
      </div>

      <div className="lg:col-span-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Sobre o engenheiro</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
          Jádson Castro Santana
        </h2>
        <p className="mt-2 font-medium text-muted-foreground">
          Engenheiro Civil | Especialista em Regularização de Imóveis
        </p>

        <div className="mt-6 space-y-4 text-foreground/80">
          <p>
            Engenheiro civil, pós-graduado em Arquitetura e Engenharia Legal e pós-graduando em Building Information Modeling (Master BIM).
          </p>
          <p>
            Atua na orientação e condução de processos de regularização de imóveis urbanos, simplificando um tema técnico que muitas vezes é tratado com excesso de burocracia.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-4">
              <Icon className="h-5 w-5 text-accent" />
              <p className="mt-2 font-display text-sm font-bold text-primary">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;