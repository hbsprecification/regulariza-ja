import { useState } from "react";
import { consultLink } from "@/lib/contact";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const faqs = [
  {
    q: "Como regularizar um imóvel antigo sem documentação?",
    a: "Imóveis sem histórico documental exigem um plano de ação específico, incluindo levantamento arquitetônico (as-built), laudos técnicos de estabilidade e processos de regularização fundiária ou aprovação retroativa. O primeiro passo é o diagnóstico da situação fática.",
  },
  {
    q: "A análise técnica inicial possui algum custo?",
    a: "Não. A auditoria preliminar é gratuita. Ela visa entender o grau de irregularidade e definir o roteiro técnico-legal necessário. Apenas após este diagnóstico apresentamos uma proposta comercial para a execução da engenharia legal.",
  },
  {
    q: "Quais os riscos de manter o imóvel irregular?",
    a: "As principais consequências incluem desvalorização imediata de até 30% do ativo, impossibilidade de venda via financiamento bancário, risco de multas e embargos por órgãos fiscalizadores municipais e bloqueios em processos de inventário.",
  },
  {
    q: "O que é averbação de construção e por que ela é exigida?",
    a: "É o ato jurídico de registrar as características físicas da edificação na matrícula do imóvel no Cartório de Registro. Sem a averbação, a construção é legalmente inexistente, o que impede operações financeiras estruturadas e transferência segura de propriedade.",
  },
  {
    q: "Meu imóvel não tem habite-se. Qual o procedimento?",
    a: "O Habite-se (ou Certificado de Conclusão) atesta que a obra seguiu as diretrizes municipais. Para obras já concluídas sem aprovação prévia, utilizamos processos de regularização edilícia e certificação de conformidade para obter o documento retroativamente.",
  },
  {
    q: "Como funciona a consultoria técnica para imóveis fora do meu estado?",
    a: "Nossa plataforma opera em todo o território nacional. Realizamos o diagnóstico remoto por meio de análise geoespacial, revisão de matrículas eletrônicas e documentação fotográfica enviada pelo cliente. Onde necessário, orientamos arquitetos parceiros locais.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(open === i ? null : i);

  const headerRef = useInView<HTMLDivElement>(0.2);
  const listRef = useInView<HTMLDivElement>(0.15);

  return (
    <section id="faq" className="blueprint-bg relative overflow-hidden py-24 lg:py-32" aria-labelledby="faq-heading">
      <div className="container px-4">
        <div ref={headerRef} className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent ring-1 ring-accent/20">
            <HelpCircle className="h-3.5 w-3.5" /> Base de Conhecimento
          </span>
          <h2 id="faq-heading" className="mt-5 font-display text-3xl font-bold text-primary sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Diretrizes técnicas e operacionais sobre os processos de regularização imobiliária.
          </p>
        </div>

        <div ref={listRef} className="reveal-stagger mx-auto mt-16 max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden rounded-xl bg-white"
            >
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-accent/[0.02]"
              >
                <span className="font-display text-sm font-semibold text-primary sm:text-base">
                  {faq.q}
                </span>
                <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${open === i ? "border-accent bg-accent text-white" : "border-border text-muted-foreground"}`}>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                </div>
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="border-t border-border px-5 pb-6 pt-4 text-[13px] leading-relaxed text-muted-foreground">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal reveal-delay-3 mx-auto mt-12 max-w-3xl rounded-xl border border-accent/20 bg-accent/[0.04] p-6 text-center ring-1 ring-accent/10">
          <p className="text-sm text-primary font-medium">
            Sua dúvida envolve um caso mais complexo?
          </p>
          <a
            href={consultLink()}
            target="_blank"
            rel="noopener noreferrer"
            id="faq-cta"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90"
          >
            <MessageCircle className="h-4 w-4" />
            Falar diretamente com engenheiro
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
