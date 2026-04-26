import { Briefcase, Network, ShieldCheck } from "lucide-react";

const Structure = () => (
  <section className="bg-secondary/50 py-20 lg:py-28">
    <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Estrutura técnica</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
          Estrutura técnica especializada
        </h2>
        <p className="mt-5 text-foreground/80">
          Os serviços são prestados por meio de estrutura técnica especializada em engenharia e regularização de imóveis, com apoio de equipe e parceiros nas áreas de projetos, análise urbanística e documentação.
        </p>
        <p className="mt-4 text-foreground/80">
          Essa estrutura permite conduzir os processos com segurança técnica e acompanhamento adequado em todas as etapas da regularização.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Responsável técnico</p>
          <p className="mt-2 font-display text-xl font-bold text-primary">Jádson Castro Santana</p>
          <p className="text-sm text-muted-foreground">Engenheiro Civil — CREA-BA 051598661-5</p>
        </div>
      </div>

      <div className="grid gap-4">
        {[
          { icon: Briefcase, title: "Equipe técnica", desc: "Profissionais especializados em projetos e análise urbanística." },
          { icon: Network, title: "Rede de parceiros", desc: "Suporte multidisciplinar para todas as etapas do processo." },
          { icon: ShieldCheck, title: "Responsabilidade técnica", desc: "Atuação com registro profissional ativo no CREA-BA." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg gradient-accent text-primary-foreground">
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