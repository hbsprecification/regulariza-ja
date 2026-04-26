import { useEffect, useState } from "react";
import { X, Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";

const STORAGE_KEY = "hbs_consult_popup_dismissed_at";
const TWENTY_FOUR_H = 24 * 60 * 60 * 1000;

const ConsultPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const last = localStorage.getItem(STORAGE_KEY);
      const should = !last || Date.now() - Number(last) > TWENTY_FOUR_H;
      if (should) {
        const t = setTimeout(() => setOpen(true), 800);
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
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in"
    >
      <div
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        onClick={close}
      />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-elegant animate-in zoom-in-95">
        <button
          onClick={close}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-smooth hover:bg-muted/80 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-muted/40 px-6 pt-8 pb-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Home className="h-7 w-7" />
          </div>
          <h3 id="consult-popup-title" className="mt-4 font-display text-xl font-bold text-primary sm:text-2xl">
            🏠 Consultoria Gratuita sobre Regularização de Imóveis
          </h3>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-muted-foreground">
            Tem dúvidas sobre a situação do seu imóvel?
          </p>
          <p className="mt-3 text-sm text-foreground">
            Estou oferecendo uma <strong>consultoria inicial gratuita</strong> para analisar a situação do imóvel e orientar os caminhos possíveis para regularização.
          </p>
          <p className="mt-3 text-sm font-medium text-primary">Nessa consultoria você poderá entender:</p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-accent">•</span> se o imóvel precisa de regularização</li>
            <li className="flex gap-2"><span className="text-accent">•</span> quais etapas podem ser necessárias</li>
            <li className="flex gap-2"><span className="text-accent">•</span> quais caminhos técnicos podem resolver a situação</li>
          </ul>

          <div className="mt-6 space-y-2">
            <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={consultLink()} target="_blank" rel="noopener noreferrer" onClick={close}>
                Quero minha consultoria gratuita
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <a href={consultLink()} target="_blank" rel="noopener noreferrer" onClick={close}>
                <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultPopup;