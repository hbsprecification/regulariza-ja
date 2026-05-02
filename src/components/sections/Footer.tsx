import { MessageCircle, Mail, MapPin } from "lucide-react";
import { consultLink } from "@/lib/contact";
import { socials } from "@/lib/social";
import logo from "@/assets/hbs-logo.png";

const footerLinks = {
  solutions: [
    { label: "Análise de Viabilidade", href: "#servicos" },
    { label: "Aprovação de Projetos", href: "#servicos" },
    { label: "Averbação Cartorária", href: "#servicos" },
    { label: "Due Diligence Técnica", href: "#servicos" },
    { label: "Laudos Estruturais", href: "#servicos" },
  ],
  company: [
    { label: "Sobre o Engenheiro", href: "#sobre" },
    { label: "Metodologia", href: "#processo" },
    { label: "Diagnóstico", href: "#problemas" },
    { label: "Perguntas Frequentes", href: "#faq" },
  ]
};

const Footer = () => (
  <footer className="border-t border-white/10 bg-[hsl(222_47%_5%)] text-white" aria-labelledby="footer-heading">
    <h2 id="footer-heading" className="sr-only">Rodapé da Plataforma</h2>
    <div className="container py-16 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">

        {/* ── Corporate Column ── */}
        <div className="lg:col-span-4">
          <div className="inline-block rounded-xl bg-white p-3 shadow-md">
            <img src={logo} alt="HBS Soluções em Engenharia" className="h-9 w-auto" />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-white/50">
            HBS Soluções em Engenharia — especialistas em regularização de imóveis, averbação de construção e consultoria técnica. Atendimento em todo o Brasil.
          </p>
          <div className="mt-8 flex items-center gap-3">
            {socials.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-all hover:bg-accent hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Solutions Links ── */}
        <div className="lg:col-span-2 lg:col-start-6">
          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">Soluções</h3>
          <ul className="mt-6 space-y-3">
            {footerLinks.solutions.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-[13px] text-white/50 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Company Links ── */}
        <div className="lg:col-span-2">
          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">Plataforma</h3>
          <ul className="mt-6 space-y-3">
            {footerLinks.company.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-[13px] text-white/50 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact & Details ── */}
        <div className="lg:col-span-3">
          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">Responsabilidade Técnica</h3>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-[13px] font-semibold text-white/90">Jádson Castro Santana</p>
              <p className="text-[13px] text-white/40">Engenheiro Civil — CREA-BA 051598661-5</p>
            </div>
            
            <ul className="space-y-3 pt-2 border-t border-white/5">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/30" />
                <div>
                  <p className="text-[13px] font-medium text-white/70">Sede Operacional</p>
                  <p className="text-[12px] text-white/40">Itabuna &mdash; Bahia, Brasil</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-white/30" />
                <a href="#contato" className="text-[13px] text-white/60 hover:text-white transition-colors">
                  contato@jadsoncastro.com.br
                </a>
              </li>
            </ul>

            <a
              href={consultLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[hsl(142_70%_40%)]/20 px-4 py-2.5 text-[13px] font-semibold text-[hsl(142_70%_60%)] ring-1 ring-[hsl(142_70%_40%)]/30 transition-all hover:bg-[hsl(142_70%_40%)]/30"
            >
              <MessageCircle className="h-4 w-4" />
              Atendimento Técnico Remoto
            </a>
          </div>
        </div>

      </div>

      <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} HBS Soluções em Engenharia. Todos os direitos reservados.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-xs text-white/30 hover:text-white">Termos de Uso</a>
          <a href="#" className="text-xs text-white/30 hover:text-white">Política de Privacidade</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;