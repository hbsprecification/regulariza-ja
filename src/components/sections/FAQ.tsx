import { useState } from "react";
import { consultLink } from "@/lib/contact";
import { ChevronDown, MessageCircle } from "lucide-react";
import BlueprintBackground from "@/components/BlueprintBackground";

const faqs = [
  {
    q: "Como regularizar um imóvel antigo sem documentação?",
    a: "Imóveis antigos sem documentação podem ser regularizados por meio de processos específicos como o levantamento do histórico de propriedade, elaboração de planta as built, aprovação retroativa ou uso de institutos como o usucapião. O primeiro passo é uma análise técnica da situação atual do imóvel.",
  },
  {
    q: "Quanto custa regularizar um imóvel irregular?",
    a: "O custo varia conforme a complexidade de cada caso: tipo de irregularidade, tamanho do imóvel, documentação disponível e exigências municipais. A consultoria inicial é gratuita — e só após entender sua situação podemos orientar com precisão sobre os custos envolvidos.",
  },
  {
    q: "É possível vender um imóvel irregular?",
    a: "Tecnicamente sim, mas há riscos significativos para comprador e vendedor. Na prática, imóveis irregulares têm valor de mercado reduzido, dificultam financiamento bancário e podem gerar problemas jurídicos futuros. Regularizar antes de vender protege todas as partes.",
  },
  {
    q: "O que é averbação de construção no cartório?",
    a: "Averbação é o registro da construção na matrícula do imóvel no Cartório de Registro de Imóveis. Sem ela, a construção existe fisicamente, mas não juridicamente — o que impede financiamento, venda formal e transferência de propriedade com segurança.",
  },
  {
    q: "Preciso do habite-se para regularizar meu imóvel?",
    a: "O habite-se é um dos documentos necessários para comprovar que a obra foi concluída conforme o projeto aprovado. Sem ele, o imóvel não pode ser averbado no cartório. Porém, há caminhos técnicos específicos para imóveis com construção concluída que nunca obtiveram o habite-se.",
  },
  {
    q: "O atendimento é somente presencial ou também pode ser remoto?",
    a: "O atendimento pode ser realizado remotamente, com envio de documentos e fotos pelo WhatsApp. Proprietários de qualquer estado do Brasil podem receber orientação técnica inicial sem precisar se deslocar.",
  },
  {
    q: "Meu imóvel foi construído sem projeto aprovado. Tem solução?",
    a: "Sim. Em muitos casos é possível elaborar um projeto as built (que documenta o que foi efetivamente construído) e solicitar aprovação retroativa na prefeitura. Cada município tem sua legislação, por isso é essencial uma análise técnica individualizada.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="faq" className="relative overflow-hidden py-20 lg:py-28" aria-labelledby="faq-heading">
      <BlueprintBackground />
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            Dúvidas frequentes
          </span>
          <h2
            id="faq-heading"
            className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl"
          >
            Perguntas sobre regularização de imóveis
          </h2>
          <p className="mt-4 text-muted-foreground">
            Respostas para as dúvidas mais comuns de proprietários que precisam regularizar imóveis no Brasil.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-elegant"
            >
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <span className="flex-1 font-display text-sm font-bold text-primary sm:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-accent transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div
                  id={`faq-answer-${i}`}
                  className="border-t border-border px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">
            Sua dúvida não está aqui? Fale diretamente com o engenheiro.
          </p>
          <a
            href={consultLink()}
            target="_blank"
            rel="noopener noreferrer"
            id="faq-cta"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition-all hover:scale-[1.02] hover:bg-accent/90"
          >
            <MessageCircle className="h-4 w-4" />
            Enviar minha dúvida no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
