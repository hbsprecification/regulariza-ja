import { Briefcase, Network, ShieldCheck, MessageCircle } from "lucide-react";
import { consultLink } from "@/lib/contact";

const Structure = () => (
  <section
    className="bg-secondary/50 py-16 lg:py-24"
    aria-labelledby="structure-heading"
  >
    <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          Estrutura técnica
        </span>
        <h2
          id="structure-heading"
          className="mt-3 font-display text-2xl font-bold text-primary sm:text-3xl"
        >
          Suporte técnico especializado em todas as etapas
        </h2>
        <p className="mt-4 leading-relaxed text-foreground/80">
          Os serviços são conduzidos com estrutura especializada em engenharia e regularização de imóveis, com
          suporte de parceiros em projetos, análise urbanística e documentação cartorial.
        </p>
        <p className="mt-3 leading-relaxed text-foreground/80">
          Isso garante que cada processo seja conduzido com segurança técnica e acompanhamento adequado — do
          diagnóstico inicial até a conclusão da regularização.
        </p>

        <div className="mt-7 rounded-2xl border border-accent/20 bg-accent/5 p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Responsável técnico
          </p>
          <p className="mt-2 font-display text-lg font-bold text-primary">
            Jádson Castro Santana
          </p>
          <p className="text-sm text-muted-foreground">Engenheiro Civil — CREA-BA 051598661-5</p>
          <a
            href={consultLink()}
            target="_blank"
            rel="noopener noreferrer"
            id="structure-cta"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition-all hover:bg-accent/90"
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
            className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:border-accent/30 hover:shadow-elegant"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl gradient-accent text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-primary">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Structure;