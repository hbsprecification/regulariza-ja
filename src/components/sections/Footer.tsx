import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";
import { socials } from "@/lib/social";
import logo from "@/assets/hbs-logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="container py-14">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <div className="inline-block rounded-lg bg-white/95 p-3">
            <img src={logo} alt="HBS Engenharia" className="h-10 w-auto" />
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70">
            HBS Engenharia — consultoria técnica em regularização de obras e imóveis urbanos.
          </p>
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/60">Redes sociais</p>
            <div className="mt-3 flex items-center gap-3">
              {socials.map(({ name, url, icon: Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-primary-foreground transition-smooth hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-primary-foreground/90">Responsável técnico</h3>
          <p className="mt-4 font-display text-base font-bold">Jádson Castro Santana</p>
          <p className="text-sm text-primary-foreground/70">Engenheiro Civil</p>
          <p className="text-sm text-primary-foreground/70">CREA-BA 051598661-5</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-primary-foreground/90">Contato</h3>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-2.5 text-sm font-semibold text-whatsapp-foreground transition-smooth hover:scale-105">
            <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
          </a>
          <a href="#contato" className="mt-3 block text-sm text-primary-foreground/70 transition-smooth hover:text-primary-foreground">Formulário de contato →</a>
          <div className="mt-4 space-y-1.5">
            {socials.map(({ name, url, handle, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 transition-smooth hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" /> {handle}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-primary-foreground/60 sm:flex-row">
        <p>© {new Date().getFullYear()} Jádson Castro Santana. Todos os direitos reservados.</p>
        <p>Engenharia & Arquitetura Legal</p>
      </div>
    </div>
  </footer>
);

export default Footer;