import { consultLink } from "@/lib/contact";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Sticky bottom CTA bar — visible on mobile only, appears after scrolling past the hero.
 * On desktop the WhatsApp float button handles this.
 */
const MobileStickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 sm:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Safe area for notched phones */}
      <div className="bg-primary/95 px-4 pb-[env(safe-area-inset-bottom,12px)] pt-3 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.3)] backdrop-blur-md">
        <a
          href={consultLink()}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-sticky-cta"
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent py-4 text-base font-bold text-accent-foreground shadow-lg transition-all active:scale-[0.98]"
        >
          <MessageCircle className="h-5 w-5 flex-shrink-0" />
          Quero minha consultoria gratuita
        </a>
        <p className="mt-1.5 text-center text-[11px] text-primary-foreground/50">
          Análise inicial gratuita · Sem compromisso
        </p>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
