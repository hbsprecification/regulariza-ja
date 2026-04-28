import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";
import { ArrowRight, MessageCircle, FileCheck2 } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const CTA = () => {
  const containerRef = useInView<HTMLDivElement>(0.2);

  return (
    <section className="relative overflow-hidden py-16 lg:py-20" aria-labelledby="cta-heading">
      <div className="container relative z-10 px-4">
        <div
          ref={containerRef}
          className="reveal relative overflow-hidden rounded-[2.5rem] gradient-hero px-6 py-20 text-center text-white shadow-2xl sm:px-12 lg:py-24"
        >
          {/* ── Blueprint grid overlay ── */}
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(hsl(214 100% 80% / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(214 100% 80% / 0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* ── Technical SVG graphics ── */}
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.04]"
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10%" cy="100%" r="200" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="10%" cy="100%" r="300" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="6 12" />
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="0.5" />
            <circle cx="90%" cy="10%" r="2" fill="white" />
            <circle cx="85%" cy="15%" r="1" fill="white" />
          </svg>

          {/* ── Accent glow blobs ── */}
          <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" aria-hidden />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-md bg-accent/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-accent/40 backdrop-blur-sm">
              <FileCheck2 className="h-3 w-3" /> Análise Técnica Gratuita
            </span>
            
            <h2 id="cta-heading" className="mt-8 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Pronto para colocar seu ativo em{" "}
              <span className="text-accent-glow">conformidade?</span>
            </h2>
            
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              Inicie a adequação do seu imóvel e proteja o seu patrimônio com engenharia especializada.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="btn-glow bg-gradient-to-r from-accent to-orange-400 px-8 py-6 text-base font-bold text-white shadow-xl shadow-accent/25 transition-all hover:opacity-90"
                id="cta-primary"
              >
                <a href={consultLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Quero minha auditoria gratuita
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 py-6 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
                id="cta-secondary"
              >
                <a href="#contato">
                  Preencher dados online <ArrowRight className="ml-2 h-4 w-4 text-white/50" />
                </a>
              </Button>
            </div>

            <p className="mt-6 text-xs font-medium uppercase tracking-widest text-white/30">
              Operação Técnica Central: Itabuna, Ilhéus • Atendimento: Nacional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;