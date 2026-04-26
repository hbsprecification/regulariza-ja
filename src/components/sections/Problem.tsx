import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Check } from "lucide-react";

const items = [
  "Construção não averbada no cartório",
  "Ampliação ou reforma não regularizada",
  "Diferença entre projeto e construção",
  "Falta de habite-se",
  "Pendências na prefeitura",
  "Não sabe a situação documental do imóvel",
];

const Problem = () => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setChecked((c) => ({ ...c, [i]: !c[i] }));
  const count = Object.values(checked).filter(Boolean).length;

  return (
    <section className="bg-secondary/60 py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <AlertCircle className="h-3.5 w-3.5" /> Atenção
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-primary sm:text-4xl">
            Seu imóvel pode estar irregular e você nem sabe.
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Muitos proprietários só descobrem problemas no imóvel quando tentam vender, financiar ou transferir a propriedade.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
          <p className="mb-5 text-sm font-semibold text-muted-foreground">Marque o que se aplica ao seu imóvel:</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((text, i) => {
              const isOn = !!checked[i];
              return (
                <li key={text}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-smooth ${
                      isOn
                        ? "border-accent bg-accent/5"
                        : "border-border bg-background hover:border-accent/40"
                    }`}
                  >
                    <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-smooth ${
                      isOn ? "border-accent bg-accent text-accent-foreground" : "border-muted-foreground/30"
                    }`}>
                      {isOn && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    </span>
                    <span className="text-sm font-medium text-foreground">{text}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {count > 0 && (
            <div className="mt-6 rounded-xl bg-accent/10 p-4 text-sm text-foreground">
              Você marcou <strong>{count}</strong> {count === 1 ? "item" : "itens"}. Uma análise técnica pode indicar o caminho correto para regularização.
            </div>
          )}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Se você se identificou com alguma dessas situações, uma análise técnica pode indicar o caminho correto para regularização.
        </p>

        <div className="mt-6 flex justify-center">
          <Button asChild size="lg" className="bg-accent font-semibold text-accent-foreground hover:bg-accent/90">
            <a href="#contato">Quero analisar meu imóvel <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Problem;