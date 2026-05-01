import { Star, Quote } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    initial: "M",
    name: "Marcos Andrade",
    role: "Proprietário residencial",
    city: "Itabuna — BA",
    text: "Eu achei que seria impossível regularizar minha casa, ampliada há mais de 10 anos sem aprovação. O Jádson conduziu tudo com clareza e em poucos meses tive o habite-se e a averbação na matrícula.",
  },
  {
    initial: "L",
    name: "Luciana Ferreira",
    role: "Vendedora do imóvel",
    city: "Itabuna — BA",
    text: "Precisava vender o imóvel da minha mãe, mas o cartório barrava por divergência de área no IPTU. A consultoria resolveu o impasse técnico e a venda foi concluída com segurança jurídica.",
  },
  {
    initial: "R",
    name: "Rodrigo Menezes",
    role: "Comprador financiado",
    city: "Ilhéus — BA",
    text: "O banco recusou meu financiamento porque a construção não estava averbada. Em contato com o Jádson, recebi orientação direta no WhatsApp e seguimos um plano técnico que liberou o crédito.",
  },
];

const Testimonials = () => {
  const headerRef = useInView<HTMLDivElement>(0.2);
  const gridRef = useInView<HTMLDivElement>(0.15);

  return (
    <section
      id="depoimentos"
      className="relative overflow-hidden py-16 lg:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 gradient-subtle opacity-70" aria-hidden />
      <div className="absolute inset-0 blueprint-bg" aria-hidden />
      <div className="container relative z-10">
        <div ref={headerRef} className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent ring-1 ring-accent/20">
            <Star className="h-3.5 w-3.5 fill-accent" /> Prova Social
          </span>
          <h2
            id="testimonials-heading"
            className="mt-5 font-display text-3xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] sm:text-4xl"
          >
            Histórias reais de quem regularizou o imóvel
          </h2>
          <p className="mt-4 text-gray-300 leading-[1.7] drop-shadow-sm sm:text-lg">
            Proprietários de Itabuna-BA e região que destravaram a venda, o financiamento e a tranquilidade jurídica do patrimônio.
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal-stagger mt-12 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="glass-card group relative flex flex-col rounded-2xl p-6"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-accent/20" aria-hidden />

              <div className="mb-3 flex items-center gap-1" aria-label="5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="flex-1 text-[14px] leading-[1.7] text-gray-300 drop-shadow-sm">
                “{t.text}”
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-orange-400 font-display text-base font-bold text-white shadow-lg shadow-accent/20">
                  {t.initial}
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white">{t.name}</p>
                  <p className="text-[11px] text-gray-400">
                    {t.role} · {t.city}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          Depoimentos representativos de processos conduzidos pela consultoria. Identidades preservadas mediante autorização.
        </p>
      </div>
    </section>
  );
};

export default Testimonials;