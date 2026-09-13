import { useState } from "react";
import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";
import { Calculator as CalcIcon, ArrowRight, RotateCcw, AlertTriangle, CheckCircle2, FileSearch, MessageCircle } from "lucide-react";

type Answer = "sim" | "nao" | "nao-sei";

type Question = {
  id: string;
  text: string;
  subtitle?: string;
  options: { label: string; value: Answer; emoji: string }[];
  riskAnswers: Answer[];
  uncertainAnswers?: Answer[];
};

const questions: Question[] = [
  {
    id: "q1",
    text: "O imóvel possui planta aprovada na prefeitura?",
    subtitle: "Projeto arquitetônico ou planta que foi aprovado pelo município",
    options: [
      { label: "Sim, tem planta aprovada", value: "sim", emoji: "✅" },
      { label: "Não tem planta aprovada", value: "nao", emoji: "❌" },
      { label: "Não sei", value: "nao-sei", emoji: "🤷" },
    ],
    riskAnswers: ["nao"],
    uncertainAnswers: ["nao-sei"],
  },
  {
    id: "q2",
    text: "A construção está igual ao projeto?",
    subtitle: "O imóvel foi construído exatamente conforme a planta aprovada",
    options: [
      { label: "Sim, está igual", value: "sim", emoji: "✅" },
      { label: "Não, há diferenças", value: "nao", emoji: "❌" },
      { label: "Não sei", value: "nao-sei", emoji: "🤷" },
    ],
    riskAnswers: ["nao"],
    uncertainAnswers: ["nao-sei"],
  },
  {
    id: "q3",
    text: "O imóvel está averbado no cartório?",
    subtitle: "A construção aparece registrada na matrícula do imóvel",
    options: [
      { label: "Sim, está averbado", value: "sim", emoji: "✅" },
      { label: "Não está averbado", value: "nao", emoji: "❌" },
      { label: "Não sei", value: "nao-sei", emoji: "🤷" },
    ],
    riskAnswers: ["nao"],
    uncertainAnswers: ["nao-sei"],
  },
  {
    id: "q4",
    text: "O imóvel possui habite-se?",
    subtitle: "Documento emitido pela prefeitura que certifica que a obra foi concluída",
    options: [
      { label: "Sim, possui habite-se", value: "sim", emoji: "✅" },
      { label: "Não possui", value: "nao", emoji: "❌" },
      { label: "Não sei", value: "nao-sei", emoji: "🤷" },
    ],
    riskAnswers: ["nao"],
    uncertainAnswers: ["nao-sei"],
  },
  {
    id: "q5",
    text: "O imóvel passou por reformas ou ampliações?",
    subtitle: "Qualquer mudança feita após a construção original",
    options: [
      { label: "Sim, foi reformado/ampliado", value: "sim", emoji: "🔨" },
      { label: "Não, nunca foi alterado", value: "nao", emoji: "✅" },
    ],
    riskAnswers: ["sim"],
  },
];

type ResultLevel = "regular" | "atencao" | "critico";

const computeResult = (answers: Record<string, Answer>): { level: ResultLevel; risk: number; uncertain: number } => {
  let risk = 0;
  let uncertain = 0;
  questions.forEach((q) => {
    const a = answers[q.id];
    if (!a) return;
    if (q.riskAnswers.includes(a)) risk++;
    if (q.uncertainAnswers?.includes(a)) uncertain++;
  });
  const level: ResultLevel = risk >= 2 ? "critico" : risk >= 1 || uncertain >= 2 ? "atencao" : "regular";
  return { level, risk, uncertain };
};

const Calculator = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showResult, setShowResult] = useState(false);

  const current = questions[step];
  const total = questions.length;
  const progress = Math.round((step / total) * 100);

  const select = (value: Answer) => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (step < total - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      setTimeout(() => setShowResult(true), 200);
    }
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setShowResult(false);
  };

  const result = showResult ? computeResult(answers) : null;

  const resultConfig = {
    regular: {
      icon: CheckCircle2,
      title: "Situação aparentemente regular",
      message: "As respostas não indicaram irregularidades evidentes. Ainda assim, uma análise técnica pode confirmar a situação e prevenir problemas futuros.",
      color: "border-green-200 bg-green-50 text-green-800",
      iconColor: "text-green-600",
      cta: "Confirmar situação do imóvel",
    },
    atencao: {
      icon: FileSearch,
      title: "⚠️ Possível necessidade de regularização",
      message: "Existem indícios de pendências no seu imóvel. Uma análise técnica gratuita pode confirmar a situação e indicar os próximos passos.",
      color: "border-accent/30 bg-accent/5 text-accent",
      iconColor: "text-accent",
      cta: "Solicitar análise técnica gratuita",
    },
    critico: {
      icon: AlertTriangle,
      title: "⛔ Situação que pode exigir regularização urgente",
      message: "Foram identificados múltiplos indícios de irregularidade. Isso pode impedir venda, financiamento ou transferência do imóvel. Uma análise técnica é recomendada o quanto antes.",
      color: "border-red-200 bg-red-50 text-red-800",
      iconColor: "text-red-600",
      cta: "Quero minha consultoria gratuita",
    },
  };

  return (
    <section id="calculadora" className="blueprint-bg relative overflow-hidden py-16 lg:py-20" aria-labelledby="calc-heading">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
           <span className="inline-flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent ring-1 ring-accent/20">
            <CalcIcon className="h-3.5 w-3.5" /> Ferramenta gratuita
          </span>
          <h2 id="calc-heading" className="mt-5 font-display text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] sm:text-4xl">
            Calculadora de Irregularidade do Imóvel
          </h2>
          <p className="mt-4 text-gray-300 leading-[1.7] drop-shadow-sm sm:text-lg">
            Responda 5 perguntas rápidas e descubra se seu imóvel pode precisar de regularização.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-white glass-card">
          {!showResult && current && (
            <div className="p-7 sm:p-10">
              {/* Progress */}
              <div className="mb-7">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  <span>Pergunta {step + 1} de {total}</span>
                  <span>{progress}% concluído</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full gradient-accent transition-all duration-500"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>

              <h3 className="font-display text-xl font-bold text-white drop-shadow-sm sm:text-2xl">{current.text}</h3>
              {current.subtitle && (
                <p className="mt-2 text-sm text-gray-400 leading-[1.7]">{current.subtitle}</p>
              )}

              <div className="mt-6 grid gap-3">
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    id={`calc-opt-${current.id}-${opt.value}`}
                    onClick={() => select(opt.value)}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-left font-bold transition-all hover:border-accent/40 hover:bg-accent/10 hover:shadow-sm active:scale-[0.99]"
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span className="text-[13px] font-bold text-white drop-shadow-sm">{opt.label}</span>
                    <ArrowRight className="ml-auto h-4 w-4 text-accent opacity-50" />
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="mt-5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  ← Voltar
                </button>
              )}
            </div>
          )}

          {showResult && result && (() => {
            const cfg = resultConfig[result.level];
            const ResultIcon = cfg.icon;
            return (
              <div className="p-7 sm:p-10">
                <div className={`flex items-start gap-4 rounded-xl border p-5 ${cfg.color}`}>
                  <ResultIcon className={`h-8 w-8 flex-shrink-0 ${cfg.iconColor}`} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-70">Resultado da análise</p>
                    <p className="mt-1 font-display text-lg font-bold">{cfg.title}</p>
                  </div>
                </div>

                <p className="mt-5 text-foreground/80 leading-relaxed">{cfg.message}</p>

                <div className="mt-5 rounded-xl bg-secondary/70 p-4 text-sm text-muted-foreground">
                  💡 <strong className="text-foreground">Lembre-se:</strong> cada imóvel é único. Apenas uma análise técnica personalizada pode confirmar a situação com precisão.
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="btn-glow bg-gradient-to-r from-accent to-orange-400 font-bold text-white shadow-lg shadow-accent/20 transition-all hover:opacity-90 flex-1" id="calc-result-cta">
                    <a href={consultLink()} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {cfg.cta}
                    </a>
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={reset} className="btn-glow border-white/10 bg-white/5 font-semibold text-gray-200 transition-all hover:bg-white/10 hover:border-white/20 hover:text-white">
                    <RotateCcw className="mr-1 h-4 w-4" /> Refazer
                  </Button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export default Calculator;