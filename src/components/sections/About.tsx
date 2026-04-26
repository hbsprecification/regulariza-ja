import portrait from "@/assets/jadson-portrait.jpg";
import { Award, GraduationCap, ShieldCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";

const credentials = [
  { icon: GraduationCap, text: "Engenharia Civil" },
  { icon: Award, text: "Pós-graduado em Arquitetura e Engenharia Legal" },
  { icon: GraduationCap, text: "Pós-graduando em Master BIM" },
  { icon: ShieldCheck, text: "CREA-BA 051598661-5" },
];

const pillars = [
  { emoji: "🏗️", title: "Técnica aplicada", desc: "Conhecimento de engenharia voltado 100% à regularização de imóveis urbanos." },
  { emoji: "💬", title: "Linguagem clara", desc: "Sem juridiquês ou termos técnicos desnecessários. Você vai entender cada etapa." },
  { emoji: "⚡", title: "Sem burocracia", desc: "Condução prática do processo, orientando cada passo de forma objetiva." },
];

const About = () => (
  <section id="sobre" className="bg-secondary/50 py-20 lg:py-28" aria-labelledby="about-heading">
    <div className="container grid gap-14 lg:grid-cols-5 lg:items-start">

      {/* Foto */}
      <div className="relative lg:col-span-2">
        <div className="absolute -inset-6 rounded-3xl bg-accent/10 blur-3xl" aria-hidden />
        <div className="relative">
          <img
            src={portrait}
            alt="Jádson Castro Santana, Engenheiro Civil especialista em regularização de imóveis em Itabuna e Ilhéus"
            width={1024}
            height={1280}
            loading="lazy"
            className="mx-auto aspect-[3/4] w-full max-w-xs rounded-2xl object-cover shadow-elegant"
          />
          {/* CREA badge */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-card px-5 py-2.5 text-center shadow-elegant ring-1 ring-border">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">CREA-BA</p>
            <p className="font-display text-sm font-extrabold text-primary">051598661-5</p>
          </div>
        </div>
      </div>

      {/* Texto */}
      <div className="pt-6 lg:col-span-3 lg:pt-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Sobre o responsável técnico</span>
        <h2 id="about-heading" className="mt-3 font-display text-3xl font-extrabold text-primary sm:text-4xl">
          Jádson Castro Santana
        </h2>
        <p className="mt-1 text-base font-semibold text-muted-foreground">
          Engenheiro Civil — Especialista em Regularização de Imóveis Urbanos
        </p>

        {/* Credenciais */}
        <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {credentials.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5">
              <Icon className="h-4 w-4 flex-shrink-0 text-accent" />
              <span className="text-sm font-medium text-foreground">{text}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 text-base text-foreground/80 leading-relaxed">
          <p>
            Engenheiro civil especializado em regularização de imóveis urbanos em Itabuna, Ilhéus e toda a região sul da Bahia.
          </p>
          <p>
            Com formação complementar em Arquitetura e Engenharia Legal, atua na análise técnica e condução de processos de regularização junto à prefeitura e cartórios, simplificando o que muitas pessoas acham impossível.
          </p>
          <p>
            Meu objetivo é que você entenda exatamente a situação do seu imóvel e saiba o que fazer — sem enrolação e sem burocracia desnecessária.
          </p>
        </div>

        {/* Pilares */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {pillars.map(({ emoji, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-4 transition-all hover:border-accent/40 hover:shadow-card">
              <div className="text-2xl">{emoji}</div>
              <p className="mt-2 font-display text-sm font-bold text-primary">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <Button asChild size="lg" className="mt-8 bg-accent font-bold text-accent-foreground hover:bg-accent/90 transition-all hover:scale-[1.02]" id="about-cta">
          <a href={consultLink()} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Falar com Jádson agora
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default About;