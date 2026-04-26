import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, ArrowRight, RotateCcw, AlertTriangle, CheckCircle2, FileSearch } from "lucide-react";

type Answer = "sim" | "nao" | "nao-sei";

type Question = {
  id: string;
  text: string;
  options: { label: string; value: Answer }[];
  /** Which answer indicates a potential irregularity */
  riskAnswers: Answer[];
  /** Answers that indicate uncertainty */
  uncertainAnswers?: Answer[];
};

const questions: Question[] = [
  {
    id: "q1",
    text: "O imóvel possui construção ou ampliação que não consta no registro do cartório?",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Não", value: "nao" },
      { label: "Não sei", value: "nao-sei" },
    ],
    riskAnswers: ["sim"],
    uncertainAnswers: ["nao-sei"],
  },
  {
    id: "q2",
    text: "O imóvel possui habite-se ou alvará de conclusão?",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Não", value: "nao" },
      { label: "Não sei", value: "nao-sei" },
    ],
    riskAnswers: ["nao"],
    uncertainAnswers: ["nao-sei"],
  },
  {
    id: "q3",
    text: "O projeto aprovado na prefeitura corresponde exatamente ao que foi construído?",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Não", value: "nao" },
      { label: "Não sei", value: "nao-sei" },
    ],
    riskAnswers: ["nao"],
    uncertainAnswers: ["nao-sei"],
  },
  {
    id: "q4",
    text: "O imóvel já passou por reformas ou ampliações ao longo do tempo?",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Não", value: "nao" },
    ],
    riskAnswers: ["sim"],
  },
  {
    id: "q5",
    text: "Você sabe se o imóvel possui pendências na prefeitura?",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Não", value: "nao" },
      { label: "Não sei", value: "nao-sei" },
    ],
    riskAnswers: ["sim"],
    uncertainAnswers: ["nao-sei"],
  },
];

type Result = {
  level: "regular" | "atencao" | "analise";
  title: string;
  description: string;
  icon: typeof CheckCircle2;
  toneClass: string;
};

const computeResult = (answers: Record<string, Answer>): Result => {
  let risk = 0;
  let uncertain = 0;
  questions.forEach((q) => {
    const a = answers[q.id];
    if (!a) return;
    if (q.riskAnswers.includes(a)) risk++;
    if (q.uncertainAnswers?.includes(a)) uncertain++;
  });

  if (risk >= 2) {
    return {
      level: "analise",
      title: "Situação que pode exigir análise técnica",
      description: "Foram identificados indícios significativos de irregularidades. Uma análise técnica é recomendada para identificar com precisão a situação e os caminhos para regularização.",
      icon: AlertTriangle,
      toneClass: "bg-accent/10 border-accent/40 text-accent",
    };
  }
  if (risk >= 1 || uncertain >= 2) {
    return {
      level: "atencao",
      title: "Possível necessidade de regularização",
      description: "Existem indícios que apontam possíveis pendências. Vale a pena realizar uma análise técnica para confirmar a situação do imóvel.",
      icon: FileSearch,
      toneClass: "bg-accent/10 border-accent/30 text-accent",
    };
  }
  return {
    level: "regular",
    title: "Situação aparentemente regular",
    description: "As respostas não indicaram irregularidades evidentes. Ainda assim, uma análise técnica pode confirmar a situação documental e construtiva do imóvel.",
    icon: CheckCircle2,
    toneClass: "bg-secondary border-border text-foreground",
  };
};

const Calculator = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showResult, setShowResult] = useState(false);

  const current = questions[step];
  const total = questions.length;

  const select = (value: Answer) => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setShowResult(false);
  };

  const result = showResult ? computeResult(answers) : null;
  const ResultIcon = result?.icon;

  return (
    <section id="calculadora" className="py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <CalcIcon className="h-3.5 w-3.5" /> Ferramenta interativa
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-primary sm:text-4xl">
            Calculadora de Irregularidade do Imóvel
          </h2>
          <p className="mt-4 text-muted-foreground">
            Responda algumas perguntas rápidas para identificar possíveis irregularidades no imóvel.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-10">
          {!showResult && current && (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span>Pergunta {step + 1} de {total}</span>
                  <span>{Math.round(((step) / total) * 100)}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full gradient-accent transition-smooth" style={{ width: `${(step / total) * 100}%` }} />
                </div>
              </div>

              <h3 className="font-display text-xl font-bold text-primary sm:text-2xl">{current.text}</h3>

              <div className="mt-6 grid gap-3">
                {current.options.map((opt) => {
                  const selected = answers[current.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => select(opt.value)}
                      className={`flex items-center justify-between rounded-xl border p-4 text-left font-medium transition-smooth ${
                        selected
                          ? "border-accent bg-accent/5 text-foreground"
                          : "border-border bg-background text-foreground hover:border-accent/50 hover:bg-accent/5"
                      }`}
                    >
                      {opt.label}
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </button>
                  );
                })}
              </div>

              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="mt-6 text-sm text-muted-foreground transition-smooth hover:text-primary"
                >
                  ← Voltar
                </button>
              )}
            </>
          )}

          {showResult && result && ResultIcon && (
            <div>
              <div className={`flex items-start gap-4 rounded-xl border p-5 ${result.toneClass}`}>
                <ResultIcon className="h-8 w-8 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Resultado</p>
                  <p className="mt-1 font-display text-lg font-bold">{result.title}</p>
                </div>
              </div>

              <p className="mt-6 text-foreground/80">{result.description}</p>

              <div className="mt-6 rounded-xl bg-secondary/70 p-5 text-sm text-muted-foreground">
                Cada imóvel possui características específicas. Uma análise técnica pode identificar com precisão a situação do imóvel e indicar o melhor caminho para regularização.
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent font-semibold text-accent-foreground hover:bg-accent/90">
                  <a href="#contato">Solicitar análise técnica do imóvel <ArrowRight className="ml-1 h-4 w-4" /></a>
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={reset} className="font-semibold">
                  <RotateCcw className="mr-1 h-4 w-4" /> Refazer
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calculator;