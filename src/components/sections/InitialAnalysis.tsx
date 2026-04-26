import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact";
import { ArrowRight, MessageCircle, FileSearch, CheckCircle2 } from "lucide-react";

const outcomes = [
  "se o imóvel pode ser regularizado",
  "quais etapas serão necessárias",
  "quais documentos podem ser exigidos",
  "quais caminhos técnicos são possíveis",
];

const InitialAnalysis = () => (
  <section id="analise" className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-28">
    <div className="absolute inset-0 opacity-[0.06]" aria-hidden style={{
      backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
      backgroundSize: "56px 56px",
    }} />
    <div className="container relative grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground ring-1 ring-accent/40">
          <FileSearch className="h-3.5 w-3.5" /> Etapa inicial
        </span>
        <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          Análise Técnica Inicial do Imóvel
        </h2>
        <div className="mt-6 space-y-4 text-primary-foreground/85">
          <p>Antes de iniciar qualquer processo de regularização, é fundamental compreender a situação real do imóvel.</p>
          <p>Nesta etapa é realizada uma análise inicial da situação do imóvel, identificando possíveis irregularidades e indicando os caminhos técnicos para regularização.</p>
          <p>Essa análise permite entender com clareza quais etapas serão necessárias para regularizar a construção ou documentação do imóvel.</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-accent font-semibold text-accent-foreground hover:bg-accent/90">
            <a href="#contato">Solicitar análise do imóvel <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent font-semibold text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1 h-4 w-4" /> Falar no WhatsApp
            </a>
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
        <p className="font-display text-lg font-bold">Ao final da análise você entenderá:</p>
        <ul className="mt-6 space-y-4">
          {outcomes.map((o) => (
            <li key={o} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
              <span className="text-primary-foreground/90">{o}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default InitialAnalysis;