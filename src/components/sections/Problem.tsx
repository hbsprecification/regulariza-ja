import { useState } from "react";
import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";
import { AlertCircle, ArrowRight, Activity, MessageCircle, FileWarning, SearchX, Ban, Building, Home, Map } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const items = [
  { icon: Building, text: "Construção de fato divergente do projeto aprovado." },
  { icon: Map, text: "Expansão de área não autorizada pelos órgãos licenciadores." },
  { icon: FileWarning, text: "Falta de averbação da edificação na matrícula de registro." },
  { icon: Home, text: "Imóvel erguido sem os devidos alvarás e licenças prévias." },
  { icon: Ban, text: "Bloqueios ou insegurança jurídica para venda do ativo." },
  { icon: SearchX, text: "Notificações de irregularidade emitidas pela prefeitura." },
  { icon: Activity, text: "Restrições de conformidade que impedem financiamentos." },
  { icon: FileWarning, text: "Ausência do Habite-se (Certificado de Conclusão de Obra)." },
];

const Problem = () => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setChecked((c) => ({ ...c, [i]: !c[i] }));
  const count = Object.values(checked).filter(Boolean).length;

  const headerRef = useInView<HTMLDivElement>(0.2);
  const contentRef = useInView<HTMLDivElement>(0.15);

  return (
    <section id="problemas" className="relative overflow-hidden bg-secondary/30 py-24 lg:py-32" aria-labelledby="problems-heading">
      <div className="absolute inset-0 gradient-subtle opacity-70" aria-hidden />
      <div className="container relative z-10">
        <div ref={headerRef} className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent ring-1 ring-accent/20">
            <AlertCircle className="h-3.5 w-3.5" /> Auditoria Preliminar
          </span>
          <h2 id="problems-heading" className="mt-5 font-display text-3xl font-bold text-primary sm:text-4xl">
            Sintomas de Irregularidade Imobiliária
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            A conformidade do seu patrimônio é essencial para sua valorização e segurança jurídica. 
            Selecione as ocorrências abaixo para uma pré-avaliação do seu caso.
          </p>
        </div>

        <div ref={contentRef} className="reveal-stagger mx-auto mt-12 max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="mb-6 border-b border-border pb-4">
            <h3 className="font-display text-sm font-semibold text-primary uppercase tracking-wider">Painel de Diagnóstico</h3>
            <p className="text-xs text-muted-foreground mt-1">Clique para sinalizar os problemas identificados no seu imóvel.</p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item, i) => {
              const isOn = !!checked[i];
              return (
                <li key={item.text}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    id={`problem-item-${i}`}
                    className={`group relative flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                      isOn
                        ? "border-accent bg-accent/[0.03] shadow-sm"
                        : "border-border bg-background hover:border-accent/40"
                    }`}
                  >
                    <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      isOn ? "border-accent/30 bg-accent/10 text-accent" : "border-border bg-secondary text-muted-foreground"
                    }`}>
                      <item.icon className="h-4 w-4 stroke-[1.5]" />
                    </div>
                    <span className="text-[13px] font-medium leading-relaxed text-foreground mt-1 pr-6">{item.text}</span>
                    
                    <div className={`absolute right-4 top-1/2 -translate-y-1/2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-all ${
                      isOn ? "border-accent bg-accent text-white" : "border-muted-foreground/30 bg-white"
                    }`}>
                      {isOn && <span className="text-[10px] font-bold">✓</span>}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {count > 0 && (
            <div className="mt-8 rounded-xl border border-accent/20 bg-accent/[0.04] p-6 shadow-inner ring-1 ring-accent/10">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <AlertCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">
                    Alerta Sistêmico: {count} {count === 1 ? "inconformidade detectada" : "inconformidades detectadas"}.
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    A presença destes fatores gera passivo documental e desvalorização estrutural do ativo. Recomendamos uma consulta técnica imediata para traçar um plano de mitigação.
                  </p>
                  <Button asChild size="sm" className="mt-5 bg-accent font-bold text-white transition-all hover:bg-accent/90" id="problem-cta">
                    <a href={consultLink()} target="_blank" rel="noopener noreferrer">
                      Protocolar Diagnóstico <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Problem;