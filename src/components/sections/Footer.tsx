import { MessageCircle } from "lucide-react";
import { whatsappLink, consultLink } from "@/lib/contact";
import { socials } from "@/lib/social";
import logo from "@/assets/hbs-logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-primary text-primary-foreground" aria-labelledby="footer-heading">
    <h2 id="footer-heading" className="sr-only">Rodapé</h2>
    <div className="container py-14">
      <div className="grid gap-10 md:grid-cols-3">

        {/* Coluna 1 — Logo */}
        <div>
          <div className="inline-block rounded-lg bg-white/95 p-3 shadow-sm">
            <img src={logo} alt="HBS Engenharia" className="h-10 w-auto" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            Consultoria técnica especializada em regularização de obras e imóveis urbanos.{" "}
            <strong className="text-primary-foreground/90">Atendimento remoto em todo o Brasil.</strong>
          </p>
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/50">Redes sociais</p>
            <div className="mt-3 flex items-center gap-3">
              {socials.map(({ name, url, icon: Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-primary-foreground transition-all hover:bg-accent hover:text-accent-foreground hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna 2 — Responsável */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-primary-foreground/80">Responsável técnico</h3>
          <p className="mt-4 font-display text-base font-bold">Jádson Castro Santana</p>
          <p className="text-sm text-primary-foreground/70">Engenheiro Civil</p>
          <p className="text-sm text-primary-foreground/70">CREA-BA 051598661-5</p>
          <div className="mt-3 space-y-1 text-xs text-primary-foreground/55">
            <p>Pós-graduado em Arquitetura e Engenharia Legal</p>
            <p>Pós-graduando em Master BIM</p>
          </div>

          {/* Áreas de atuação — nacional + regional */}
          <div className="mt-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/50 mb-3">
              Áreas de atuação
            </p>

            {/* Nacional — destaque */}
            <div className="mb-3 flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5">
              <span className="text-base leading-none">🇧🇷</span>
              <div>
                <p className="text-xs font-bold text-accent">Todo o Brasil</p>
                <p className="text-[10px] text-primary-foreground/55 leading-tight">
                  Consultoria técnica remota via WhatsApp
                </p>
              </div>
            </div>

            {/* Regional — pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { flag: "📍", city: "Itabuna" },
                { flag: "📍", city: "Ilhéus" },
                { flag: "📍", city: "Sul da Bahia" },
              ].map(({ flag, city }) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-primary-foreground/70"
                >
                  <span className="text-sm leading-none">{flag}</span>
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna 3 — Contato */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-primary-foreground/80">Contato</h3>
          <a
            href={consultLink()}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-whatsapp-cta"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[hsl(142_70%_45%)] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:scale-105 hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            Consultoria gratuita
          </a>
          <a href="#contato" className="mt-3 block text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">
            Formulário de contato →
          </a>
          <div className="mt-5 space-y-1.5">
            {socials.map(({ name, url, handle, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" /> {handle}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-primary-foreground/50 sm:flex-row">
        <p>© {new Date().getFullYear()} Jádson Castro Santana — Regularização de Imóveis. Todos os direitos reservados.</p>
        <p>Engenharia Civil &amp; Arquitetura Legal | CREA-BA 051598661-5</p>
      </div>
    </div>
  </footer>
);

export default Footer;