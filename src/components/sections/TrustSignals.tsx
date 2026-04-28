import { consultLink } from "@/lib/contact";
import { ShieldCheck, GraduationCap, Handshake, MapPin, Star, UserCheck, MessageCircle } from "lucide-react";

const trustCards = [
  {
    icon: ShieldCheck,
    title: "Registro profissional ativo",
    desc: "CREA-BA 051598661-5. Você recebe orientação de um engenheiro civil legalmente habilitado e com responsabilidade técnica registrada.",
  },
  {
    icon: GraduationCap,
    title: "Especialização em Engenharia Legal",
    desc: "Pós-graduado em Arquitetura e Engenharia Legal — formação específica para conduzir processos de regularização de imóveis.",
  },
  {
    icon: UserCheck,
    title: "Atendimento direto com o engenheiro",
    desc: "Sem intermediários. Você fala diretamente com Jádson Castro Santana, o responsável técnico pelo seu processo.",
  },
  {
    icon: MapPin,
    title: "Atendimento em todo o Brasil",
    desc: "Proprietários de qualquer estado podem receber orientação técnica inicial de forma remota, rápida e sem deslocamento.",
  },
  {
    icon: MessageCircle,
    title: "Análise inicial totalmente gratuita",
    desc: "Sem custo para entender a situação do imóvel. Você recebe uma orientação técnica antes de qualquer compromisso financeiro.",
  },
  {
    icon: Handshake,
    title: "Clareza em todo o processo",
    desc: "Explicamos cada etapa em linguagem simples, sem jargões técnicos — para que você tome decisões seguras e informadas.",
  },
];

const TrustSignals = () => (
  <section
    id="confianca"
    className="py-16 lg:py-20"
    aria-labelledby="trust-heading"
  >
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          Prova social
        </span>
        <h2
          id="trust-heading"
          className="mt-3 font-display text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] sm:text-4xl"
        >
          Por que confiar na Regulariza Já?
        </h2>
        <p className="mt-4 text-gray-300 leading-[1.7] drop-shadow-sm">
          Regularizar um imóvel exige conhecimento técnico, responsabilidade profissional e clareza.
          Veja por que dezenas de proprietários escolhem orientação especializada.
        </p>
      </div>

      {/* Cards de confiança */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trustCards.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white drop-shadow-sm">{title}</h3>
              <p className="mt-1.5 text-sm leading-[1.7] text-gray-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Aviso de autoridade — destaque */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-accent/20 bg-accent/10 backdrop-blur-md">
        <div className="grid lg:grid-cols-5">
          <div className="flex items-center gap-4 border-b border-accent/10 p-6 lg:col-span-3 lg:border-b-0 lg:border-r">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-orange-400">
              <Star className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-white drop-shadow-sm">
                Análise inicial gratuita e sem compromisso
              </p>
              <p className="mt-1 text-sm text-gray-400">
                O maior risco é descobrir tarde demais que o imóvel está irregular. A análise inicial não custa nada — e pode evitar prejuízos maiores.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 p-6 text-center lg:col-span-2">
            <p className="text-sm font-bold text-white">
              Fale agora e descubra a situação do seu imóvel
            </p>
            <a
              href={consultLink()}
              target="_blank"
              rel="noopener noreferrer"
              id="trust-cta"
              className="btn-glow flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-orange-400 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              Quero minha consultoria gratuita
            </a>
            <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">
              Via WhatsApp · Resposta rápida
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TrustSignals;
