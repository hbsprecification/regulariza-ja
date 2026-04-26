import { useEffect, useState } from "react";
import { X, Home, MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";

const STORAGE_KEY = "regulariza_ja_popup_dismissed_at";
const TWENTY_FOUR_H = 24 * 60 * 60 * 1000;

const benefits = [
  "Se o imóvel precisa de regularização",
  "Quais etapas podem ser necessárias",
  "Os caminhos técnicos para resolver a situação",
];

const ConsultPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const last = localStorage.getItem(STORAGE_KEY);
      const should = !last || Date.now() - Number(last) > TWENTY_FOUR_H;
      if (should) {
        const t = setTimeout(() => setOpen(true), 1500);
        return () => clearTimeout(t);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => {
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consult-popup-title"
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center animate-in fade-in duration-300"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-elegant animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 sm:slide-in-from-bottom-0">
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Fechar"
          id="popup-close-btn"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-muted/80 hover:text-foreground hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header with accent */}
        <div className="relative overflow-hidden bg-primary px-6 pt-8 pb-5 text-center">
          <div className="absolute inset-0 opacity-10" aria-hidden style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }} />
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 ring-2 ring-accent/30">
            <Home className="h-8 w-8 text-accent" />
          </div>
          <h3 id="consult-popup-title" className="mt-4 font-display text-xl font-extrabold text-primary-foreground sm:text-2xl">
            🏠 Consultoria Gratuita
          </h3>
          <p className="mt-1 text-sm text-primary-foreground/70">sobre regularização de imóveis</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-base font-semibold text-foreground">
            Tem dúvidas sobre a situação do seu imóvel?
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Ofereço uma <strong className="text-foreground">análise inicial gratuita</strong> para orientar os caminhos possíveis de regularização — sem compromisso.
          </p>

          <p className="mt-4 text-sm font-semibold text-foreground">Nessa consultoria você vai entender:</p>
          <ul className="mt-3 space-y-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2">
            <Button asChild size="lg" className="w-full bg-accent font-bold text-accent-foreground hover:bg-accent/90 shadow-md transition-all hover:scale-[1.01]" id="popup-cta-primary">
              <a href={consultLink()} target="_blank" rel="noopener noreferrer" onClick={close}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Quero minha consultoria gratuita
              </a>
            </Button>
            <button
              onClick={close}
              className="w-full py-2 text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Agora não, obrigado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultPopup;