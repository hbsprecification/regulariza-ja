import { consultLink } from "@/lib/contact";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

const PromoBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="fixed top-0 z-50 w-full bg-accent text-accent-foreground shadow-sm">
      <div className="container flex items-center justify-between gap-2 py-2">
        <div className="flex flex-1 items-center justify-center gap-3 text-center sm:text-left">
          <span className="hidden text-base sm:block" aria-hidden>🏠</span>
          <p className="text-xs font-medium sm:text-sm">
            Consultoria <strong>gratuita</strong> sobre regularização de imóveis em Itabuna e Ilhéus
          </p>
          <a
            href={consultLink()}
            target="_blank"
            rel="noopener noreferrer"
            id="promo-banner-cta"
            className="hidden shrink-0 items-center gap-1 rounded-full bg-background/20 px-4 py-1 text-xs font-bold backdrop-blur transition-all hover:bg-background/30 sm:inline-flex"
          >
            Agendar consultoria <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fechar banner"
          className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/20 transition-all hover:bg-black/30"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;