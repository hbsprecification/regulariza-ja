import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

const WhatsappFloat = () => (
  <a
    href={whatsappLink()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-5 py-4 text-whatsapp-foreground shadow-elegant transition-smooth hover:scale-105 hover:shadow-2xl"
  >
    <MessageCircle className="h-6 w-6" />
    <span className="hidden font-semibold sm:inline">WhatsApp</span>
  </a>
);

export default WhatsappFloat;