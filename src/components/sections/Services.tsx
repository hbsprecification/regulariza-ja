import { ClipboardCheck, FileSignature, LandPlot, Ruler, FileSearch, Users, FileText, Compass } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const services = [
  { icon: ClipboardCheck, title: "Regularização Técnica e Legal", desc: "Condução e aprovação de projetos arquitetônicos e adequação técnica junto a prefeituras e órgãos licenciadores." },
  { icon: FileSignature, title: "Averbação e Matrícula", desc: "Produção de acervo técnico para o correto registro de construções diretamente na matrícula do Registro de Imóveis." },
  { icon: LandPlot, title: "Desmembramento e Loteamento", desc: "Estudos de viabilidade, projetos urbanísticos e regularização de fracionamento do solo urbano." },
  { icon: Compass, title: "Viabilidade Urbanística", desc: "Mapeamento das diretrizes de zoneamento municipal, índices construtivos e potencial de ocupação." },
  { icon: FileSearch, title: "Laudos e Perícias de Engenharia", desc: "Vistorias técnicas detalhadas, emissão de ART e laudos estruturais validados pelo conselho regional." },
  { icon: Users, title: "Consultoria B2B", desc: "Suporte especializado de engenharia legal para imobiliárias, construtoras, advogados e arquitetos parceiros." },
  { icon: FileText, title: "Diagnóstico de Due Diligence", desc: "Auditoria documental profunda e análise de risco para aquisições seguras de ativos imobiliários." },
  { icon: Ruler, title: "Conformidade para Crédito", desc: "Adequação técnica de garantias reais para viabilizar operações de financiamento imobiliário." },
];

const Services = () => {
  const headerRef = useInView<HTMLDivElement>(0.2);
  const gridRef = useInView<HTMLDivElement>(0.15);

  return (
    <section id="servicos" className="relative overflow-hidden py-16 lg:py-20" aria-labelledby="services-heading">
      <div className="absolute inset-0 gradient-surface" aria-hidden />
      <div className="absolute inset-0 blueprint-bg" aria-hidden />
      <div className="container relative z-10">
        <div ref={headerRef} className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden />
            Soluções de Engenharia
            <span className="h-px w-6 bg-accent" aria-hidden />
          </span>
          <h2 id="services-heading" className="mt-4 font-display text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] sm:text-4xl">
            Inteligência técnica para o seu patrimônio.
          </h2>
          <p className="mt-4 text-gray-300 leading-[1.7] drop-shadow-sm sm:text-lg">
            Atuamos em toda a esteira de legalização imobiliária. O primeiro passo da nossa plataforma é uma análise de viabilidade para determinar o roteiro exato de aprovação.
          </p>
        </div>

        <div ref={gridRef} className="reveal-stagger mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="glass-card group relative overflow-hidden rounded-2xl p-6">
              <div className="glass-icon mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                <Icon className="h-6 w-6 stroke-[1.5]" />
              </div>
              <h3 className="font-display text-base font-bold text-white drop-shadow-sm">{title}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-gray-400">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;