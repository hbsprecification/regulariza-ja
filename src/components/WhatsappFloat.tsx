import { MessageCircle } from "lucide-react";
import { consultLink } from "@/lib/contact";

/**
 * WhatsApp floating button — visible on desktop (sm+).
 * Hidden on mobile because MobileStickyCTA handles it.
 */
const WhatsappFloat = () => (
  <a
    href={consultLink()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp — Consultoria gratuita"
    id="whatsapp-float"
    className="fixed bottom-6 right-6 z-50 hidden items-center gap-2.5 rounded-full bg-[hsl(142_70%_45%)] pl-4 pr-5 py-3.5 text-sm font-bold text-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.35)] transition-all hover:scale-105 hover:shadow-2xl sm:flex"
  >
    <MessageCircle className="h-5 w-5 flex-shrink-0" />
    <span>Consultoria gratuita</span>
  </a>
);

export default WhatsappFloat;