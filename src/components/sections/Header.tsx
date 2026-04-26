import { Button } from "@/components/ui/button";
import { consultLink } from "@/lib/contact";
import { socials } from "@/lib/social";
import logo from "@/assets/hbs-logo.png";
import { MessageCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-[40px] z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur-md sm:top-[40px]">
      <div className="container flex h-16 items-center justify-between">
        <a href="#hero" className="flex items-center gap-3" aria-label="Regulariza Já — Início">
          <img src={logo} alt="Regulariza Já — HBS Engenharia" className="h-10 w-auto" />
          <div className="hidden leading-tight sm:block">
            <p className="font-display text-sm font-bold text-primary">HBS Engenharia</p>
            <p className="text-[11px] text-muted-foreground">Regularização de Imóveis Urbanos</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex" aria-label="Navegação principal">
          <a href="#servicos" className="transition-colors hover:text-primary">Serviços</a>
          <a href="#problemas" className="transition-colors hover:text-primary">Problemas</a>
          <a href="#calculadora" className="transition-colors hover:text-primary">Calculadora</a>
          <a href="#sobre" className="transition-colors hover:text-primary">Sobre</a>
          <a href="#contato" className="transition-colors hover:text-primary">Contato</a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 md:flex">
            {socials.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-accent/10 hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <Button asChild size="sm" className="hidden bg-accent text-accent-foreground hover:bg-accent/90 font-semibold sm:inline-flex" id="header-cta">
            <a href={consultLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
              Consultoria gratuita
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;