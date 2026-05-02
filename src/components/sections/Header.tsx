import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";
import { socials } from "@/lib/social";
import logo from "@/assets/hbs-logo.png";
import { MessageCircle, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Serviços",    href: "#servicos" },
  { label: "Processo",   href: "#processo" },
  { label: "Calculadora",href: "#calculadora" },
  { label: "Sobre",      href: "#sobre" },
  { label: "Contato",    href: "#contato" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-[40px] z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[hsl(222_47%_6%/0.92)] backdrop-blur-xl shadow-[0_4px_32px_-8px_hsl(222_47%_4%/0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-3" aria-label="HBS Soluções em Engenharia — Início">
          <div className="relative flex h-10 w-auto shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-md transition-transform duration-300 group-hover:scale-105">
            <img src={logo} alt="HBS Soluções em Engenharia" className="relative z-10 h-full w-auto object-contain" />
          </div>
          <div className="hidden leading-tight sm:block">
            <p className={`font-display text-sm font-bold transition-colors ${scrolled ? "text-white" : "text-white"}`}>
              HBS Soluções em Engenharia
            </p>
            <p className="text-[11px] text-white/50">Regularização de Imóveis Urbanos</p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-[13px] font-medium lg:flex" aria-label="Navegação principal">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-white/65 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 md:flex">
            {socials.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-all hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <Button
            asChild
            size="sm"
            className="hidden bg-accent font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-accent/40 sm:inline-flex"
            id="header-cta"
          >
            <a href={consultLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
              Consultoria gratuita
            </a>
          </Button>

          {/* Mobile toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[hsl(222_47%_6%/0.97)] backdrop-blur-xl lg:hidden">
          <nav className="container flex flex-col gap-1 py-4" aria-label="Navegação mobile">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {label}
              </a>
            ))}
            <a
              href={consultLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white shadow-lg shadow-accent/20"
            >
              <MessageCircle className="h-4 w-4" />
              Consultoria gratuita
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;