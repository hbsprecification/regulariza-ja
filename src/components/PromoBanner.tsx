import { consultLink } from "@/lib/contact";
import { ArrowRight } from "lucide-react";

const PromoBanner = () => (
  <div className="fixed top-0 z-50 w-full bg-accent text-accent-foreground">
    <div className="container flex flex-col items-center justify-between gap-2 py-2 text-center sm:flex-row sm:text-left">
      <p className="text-xs font-medium sm:text-sm">
        🎯 Consultoria gratuita sobre regularização de imóveis
      </p>
      <a
        href={consultLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold backdrop-blur transition-smooth hover:bg-background/25 sm:text-sm"
      >
        Agendar consultoria <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  </div>
);

export default PromoBanner;