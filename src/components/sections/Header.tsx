import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact";
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
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Fale conosco</a>
        </Button>
      </div>
    </header>
  );
};

export default Header;