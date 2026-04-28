import { Button } from "@/components/ui/button";
import { consultLink, whatsappLink } from "@/lib/contact";
import { MessageCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    emoji: "💬",
    title: "Você explica sua situação",
    desc: "Me conta sobre o imóvel: se tem projeto aprovado, se foi reformado, se está averbado no cartório. Sem burocracia, sem jargões técnicos.",
    highlight: null,
  },
  {
    number: "2",
    emoji: "🔍",
    title: "Recebe uma análise técnica inicial",
    desc: "Faço uma análise técnica da situação e identifico as possíveis irregularidades do seu imóvel com clareza e objetividade.",
    highlight: "100% gratuita",
  },
  {
    number: "3",
    emoji: "🗺️",
    title: "Descobre os caminhos possíveis",
    desc: "Você entende exatamente o que precisa ser feito para regularizar seu imóvel: etapas, documentos e os melhores caminhos técnicos.",
    highlight: null,
  },
];

const InitialAnalysis = () => (
  <section id="analise" className="relative overflow-hidden py-16 text-white lg:py-20" aria-labelledby="analysis-heading">
    <div className="absolute inset-0 opacity-[0.05]" aria-hidden style={{
      backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
      backgroundSize: "56px 56px",
    }} />
    <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" aria-hidden />

    <div className="container relative">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent ring-1 ring-accent/40">
          Como funciona
        </span>
        <h2 id="analysis-heading" className="mt-4 font-display text-3xl font-black drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] sm:text-4xl lg:text-5xl">
          Como funciona a consultoria
        </h2>
        <p className="mt-4 text-lg text-gray-300 leading-[1.7] drop-shadow-sm">
          Três passos simples — e o primeiro é <strong className="text-accent drop-shadow-md">100% gratuito.</strong>
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.number} className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-full items-center justify-center text-accent/50 md:flex" aria-hidden>
                <ArrowRight className="h-6 w-6" />
              </div>
            )}
            <div className="text-4xl">{step.emoji}</div>
            <div className="mt-4 font-display text-4xl font-black text-accent/30 drop-shadow-sm">{step.number}</div>
            <h3 className="mt-2 font-display text-xl font-bold text-white drop-shadow-sm">{step.title}</h3>
            {step.highlight && (
              <span className="mt-2 inline-block rounded-full bg-accent/20 px-3 py-0.5 text-xs font-bold text-accent">
                {step.highlight}
              </span>
            )}
            <p className="mt-3 text-sm leading-[1.7] text-gray-400">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button asChild size="lg" className="btn-glow bg-gradient-to-r from-accent to-orange-400 font-bold text-white shadow-xl shadow-accent/25 transition-all hover:opacity-90" id="analysis-cta-primary">
          <a href={consultLink()} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Quero minha consultoria gratuita
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="btn-glow border-white/10 bg-white/5 font-semibold text-gray-200 hover:bg-white/10 hover:border-white/20 hover:text-white" id="analysis-cta-secondary">
          <a href="#contato">
            Preencher formulário <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  </section>
);

export default InitialAnalysis;