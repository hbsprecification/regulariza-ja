import { Briefcase, Network, ShieldCheck, MessageCircle } from "lucide-react";
import { consultLink } from "@/lib/contact";

const Structure = () => (
  <section
    className="gradient-dark-surface py-16 lg:py-20"
    aria-labelledby="structure-heading"
  >
    <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-accent drop-shadow-sm">
          Estrutura técnica
        </span>
        <h2
          id="structure-heading"
          className="mt-3 font-display text-2xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] sm:text-3xl"
        >
          Suporte técnico especializado em todas as etapas
        </h2>
        <p className="mt-4 leading-[1.7] text-gray-300 drop-shadow-sm">
          Os serviços são conduzidos com estrutura especializada em engenharia e regularização de imóveis, com
          suporte de parceiros em projetos, análise urbanística e documentação cartorial.
        </p>
        <p className="mt-3 leading-[1.7] text-gray-300 drop-shadow-sm">
          Isso garante que cada processo seja conduzido com segurança técnica e acompanhamento adequado — do
          diagnóstico inicial até a conclusão da regularização.
        </p>

        <div className="mt-7 rounded-2xl border border-accent/20 bg-accent/10 p-5 backdrop-blur-md">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            Responsável técnico
          </p>
          <p className="mt-2 font-display text-lg font-black text-white drop-shadow-sm">
            Jádson Castro Santana
          </p>
          <p className="text-sm font-bold text-accent/80">Engenheiro Civil — CREA-BA 051598661-5</p>
          <a
            href={consultLink()}
            target="_blank"
            rel="noopener noreferrer"
            id="structure-cta"
            className="btn-glow mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-orange-400 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            Falar com o engenheiro
          </a>
        </div>
      </div>

      <div className="grid gap-4">
        {[
          {
            icon: Briefcase,
            title: "Equipe técnica especializada",
            desc: "Profissionais com experiência em projetos arquitetônicos e análise urbanística.",
          },
          {
            icon: Network,
            title: "Rede de parceiros multidisciplinar",
            desc: "Suporte em todas as etapas: regularização fundiária, cartório, prefeitura e documentação.",
          },
          {
            icon: ShieldCheck,
            title: "Responsabilidade técnica registrada",
            desc: "Atuação com registro profissional ativo no CREA-BA — garantia de que você está amparado legalmente.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md shadow-lg transition-all hover:border-white/20 hover:bg-white/10"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-orange-400 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white drop-shadow-sm">{title}</h3>
              <p className="mt-1 text-sm leading-[1.7] text-gray-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Structure;