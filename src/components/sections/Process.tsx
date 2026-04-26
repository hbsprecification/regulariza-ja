const steps = [
  { n: "01", title: "Análise inicial do imóvel", desc: "Levantamento das informações e diagnóstico técnico da situação." },
  { n: "02", title: "Identificação das irregularidades", desc: "Verificação das exigências necessárias para regularização." },
  { n: "03", title: "Planejamento do processo", desc: "Definição do caminho técnico e documental para regularização." },
  { n: "04", title: "Execução e acompanhamento", desc: "Elaboração dos documentos técnicos e condução do processo." },
];

const Process = () => (
  <section id="processo" className="bg-primary py-20 text-primary-foreground lg:py-28">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">Processo</span>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          Como funciona o processo
        </h2>
        <p className="mt-4 text-primary-foreground/75">
          Um caminho estruturado em quatro etapas para garantir clareza e segurança técnica em cada fase.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.n} className="relative rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-smooth hover:bg-white/10">
            <div className="font-display text-5xl font-extrabold text-accent">{s.n}</div>
            <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-primary-foreground/75">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="absolute right-3 top-10 hidden text-primary-foreground/30 lg:block">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;