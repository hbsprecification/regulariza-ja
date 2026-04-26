import { useState } from "react";
import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";
import { AlertCircle, ArrowRight, MessageCircle } from "lucide-react";

const items = [
  { emoji: "🏗️", text: "Imóvel construído sem projeto aprovado" },
  { emoji: "📐", text: "Obra diferente da planta registrada" },
  { emoji: "📋", text: "Imóvel sem averbação no cartório" },
  { emoji: "🏚️", text: "Construção antiga sem regularização" },
  { emoji: "🚫", text: "Dificuldade para vender imóvel irregular" },
  { emoji: "🏛️", text: "Imóvel com pendência na prefeitura" },
  { emoji: "💳", text: "Necessidade de regularização para financiamento" },
  { emoji: "📄", text: "Falta de habite-se ou alvará de conclusão" },
];

const Problem = () => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setChecked((c) => ({ ...c, [i]: !c[i] }));
  const count = Object.values(checked).filter(Boolean).length;

  return (
    <section id="problemas" className="bg-secondary/60 py-20 lg:py-28" aria-labelledby="problems-heading">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <AlertCircle className="h-3.5 w-3.5" /> Você se identifica?
          </span>
          <h2 id="problems-heading" className="mt-4 font-display text-3xl font-bold text-primary sm:text-4xl">
            Seu imóvel pode estar irregular e você nem sabe
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Muitos proprietários só descobrem problemas na hora de <strong className="text-foreground">vender, financiar ou transferir</strong> o imóvel. Marque o que se aplica à sua situação:
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-8">
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item, i) => {
              const isOn = !!checked[i];
              return (
                <li key={item.text}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    id={`problem-item-${i}`}
                    className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
                      isOn
                        ? "border-accent bg-accent/5 shadow-sm"
                        : "border-border bg-background hover:border-accent/40 hover:bg-accent/[0.02]"
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{item.emoji}</span>
                    <span className="text-sm font-medium text-foreground leading-snug">{item.text}</span>
                    <span className={`ml-auto flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all ${
                      isOn ? "border-accent bg-accent text-accent-foreground" : "border-muted-foreground/30"
                    }`}>
                      {isOn && <span className="text-[10px] font-bold">✓</span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {count > 0 && (
            <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-5">
              <p className="text-sm font-semibold text-accent">
                ⚠️ Você marcou {count} {count === 1 ? "situação" : "situações"} de risco.
              </p>
              <p className="mt-1 text-sm text-foreground/80">
                Uma análise técnica gratuita pode indicar o caminho correto para regularizar seu imóvel antes que isso vire um problema maior.
              </p>
              <Button asChild size="lg" className="mt-4 w-full bg-accent font-bold text-accent-foreground hover:bg-accent/90 sm:w-auto" id="problem-cta">
                <a href={consultLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Quero minha consultoria gratuita
                </a>
              </Button>
            </div>
          )}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Não encontrou sua situação acima?{" "}
          <a href={consultLink()} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline-offset-2 hover:underline">
            Entre em contato para uma análise personalizada.
          </a>
        </p>
      </div>
    </section>
  );
};

export default Problem;