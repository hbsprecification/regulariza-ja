import { TrendingUp, Banknote, ScaleIcon, FileCheck2, HeartHandshake, ArrowRight, MessageCircle } from "lucide-react";
import { consultLink } from "@/lib/contact";
import { useInView } from "@/hooks/useInView";

const benefits = [
  {
    icon: TrendingUp,
    title: "Imóvel valorizado",
    desc: "Imóveis regularizados podem valer até 30% mais no mercado de revenda.",
  },
  {
    icon: Banknote,
    title: "Financiamento liberado",
    desc: "Bancos só financiam imóveis com averbação e habite-se em dia.",
  },
  {
    icon: ScaleIcon,
    title: "Segurança jurídica",
    desc: "Sem risco de notificação, multa ou embargo da prefeitura.",
  },
  {
    icon: FileCheck2,
    title: "Documentação em ordem",
    desc: "Matrícula, IPTU e construção em conformidade total.",
  },
  {
    icon: HeartHandshake,
    title: "Tranquilidade para vender",
    desc: "Venda, doação ou inventário sem travas no cartório.",
  },
];

const Benefits = () => {
  const headerRef = useInView<HTMLDivElement>(0.2);
  const gridRef = useInView<HTMLDivElement>(0.15);

  return (
    <section
      id="beneficios"
      className="relative overflow-hidden py-16 lg:py-20"
      aria-labelledby="benefits-heading"
    >
      <div className="absolute inset-0 gradient-surface" aria-hidden />
      <div className="container relative z-10">
        <div ref={headerRef} className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden />
            Resultado para o proprietário
            <span className="h-px w-6 bg-accent" aria-hidden />
          </span>
          <h2
            id="benefits-heading"
            className="mt-4 font-display text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] sm:text-4xl"
          >
            O que muda quando seu imóvel está regular
          </h2>
          <p className="mt-4 text-gray-300 leading-[1.7] drop-shadow-sm sm:text-lg">
            Regularizar não é apenas papelada — é transformar o seu imóvel em um ativo líquido, valorizado e protegido juridicamente.
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal-stagger mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {benefits.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="glass-card group flex flex-col items-start rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                <Icon className="h-6 w-6 stroke-[1.5]" />
              </div>
              <h3 className="font-display text-base font-bold text-white drop-shadow-sm">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-[1.7] text-gray-400">{desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={consultLink()}
            target="_blank"
            rel="noopener noreferrer"
            id="benefits-cta"
            className="btn-glow inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-orange-400 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-accent/25 transition-all hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            Quero esses benefícios para o meu imóvel
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Benefits;