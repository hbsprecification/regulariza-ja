import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact";
import { Building2 } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-accent">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-sm font-bold text-primary">Jádson Castro</p>
            <p className="text-[11px] text-muted-foreground">Engenharia & Regularização</p>
          </div>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#servicos" className="transition-smooth hover:text-primary">Serviços</a>
          <a href="#sobre" className="transition-smooth hover:text-primary">Sobre</a>
          <a href="#processo" className="transition-smooth hover:text-primary">Processo</a>
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