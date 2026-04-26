import { AlertCircle, FileX, Building, Map, Hammer, FileWarning, ScrollText } from "lucide-react";

const problems = [
  { icon: ScrollText, text: "Construção sem averbação em cartório" },
  { icon: Building, text: "Divergência entre projeto e construção" },
  { icon: FileX, text: "Falta de habite-se" },
  { icon: Map, text: "Terrenos que precisam de desmembramento" },
  { icon: Hammer, text: "Ampliações ou reformas não regularizadas" },
  { icon: FileWarning, text: "Notificações ou exigências da prefeitura" },
];

const Problem = () => (
  <section className="bg-secondary/50 py-20 lg:py-28">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          <AlertCircle className="h-3.5 w-3.5" /> Atenção
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold text-primary sm:text-4xl">
          Seu imóvel pode estar irregular e você nem sabe.
        </h2>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Grande parte dos imóveis urbanos apresenta algum tipo de irregularidade documental ou construtiva. Isso pode gerar dificuldades para vender, financiar ou até transmitir o imóvel.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map(({ icon: Icon, text }) => (
          <div key={text} className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <p className="pt-1.5 text-sm font-medium text-foreground">{text}</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted-foreground">
        Essas situações podem ser resolvidas com análise técnica e condução adequada do processo de regularização.
      </p>
    </div>
  </section>
);

export default Problem;