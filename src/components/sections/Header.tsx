import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact";
import { socials } from "@/lib/social";
import logo from "@/assets/hbs-logo.png";

const Header = () => {
  return (
    <header className="fixed top-[44px] z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md sm:top-[40px]">
      <div className="container flex h-16 items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <img src={logo} alt="HBS Engenharia" className="h-10 w-auto" />
          <div className="hidden leading-tight sm:block">
            <p className="font-display text-sm font-bold text-primary">HBS Engenharia</p>
            <p className="text-[11px] text-muted-foreground">Regularização de Imóveis</p>
          </div>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
          <a href="#servicos" className="transition-smooth hover:text-primary">Serviços</a>
          <a href="#analise" className="transition-smooth hover:text-primary">Análise</a>
          <a href="#calculadora" className="transition-smooth hover:text-primary">Calculadora</a>
          <a href="#sobre" className="transition-smooth hover:text-primary">Sobre</a>
          <a href="#contato" className="transition-smooth hover:text-primary">Contato</a>
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
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-accent/10 hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Fale conosco</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;