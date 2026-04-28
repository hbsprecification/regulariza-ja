import { ClipboardCheck, FileSignature, LandPlot, Ruler, FileSearch, Users, FileText, Compass } from "lucide-react";

const services = [
  { icon: ClipboardCheck, title: "Regularização de obras e construções", desc: "Condução técnica completa para regularizar imóveis junto à prefeitura e órgãos competentes." },
  { icon: FileSignature, title: "Averbação de construção em cartório", desc: "Documentação para registrar corretamente a construção na matrícula do imóvel." },
  { icon: LandPlot, title: "Desmembramento de terrenos", desc: "Análise e regularização de divisão de áreas urbanas conforme legislação local." },
  { icon: Compass, title: "Análise técnica urbanística", desc: "Avaliação de zoneamento, uso e ocupação do solo aplicáveis ao imóvel." },
  { icon: FileSearch, title: "Laudos técnicos e vistorias", desc: "Laudos e vistorias com responsabilidade técnica registrada no CREA." },
  { icon: Users, title: "Consultoria para engenheiros e arquitetos", desc: "Suporte técnico para profissionais em processos de regularização urbanística." },
  { icon: FileText, title: "Diagnóstico documental do imóvel", desc: "Levantamento completo da situação documental e construtiva do imóvel." },
  { icon: Ruler, title: "Orientação para financiamento", desc: "Regularização para viabilizar financiamento imobiliário e transferência de propriedade." },
];

const Services = () => (
  <section id="servicos" className="blueprint-bg relative overflow-hidden py-20 lg:py-28" aria-labelledby="services-heading">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Serviços</span>
        <h2 id="services-heading" className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
          Regularização de imóveis em Itabuna, Ilhéus e região
        </h2>
        <p className="mt-4 text-muted-foreground">
          Cada imóvel tem uma situação única. O primeiro passo é uma análise técnica para identificar o caminho correto — e ela é <strong className="text-foreground">gratuita.</strong>
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, desc }) => (
          <article key={title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elegant hover:border-accent/30">
            <div className="absolute inset-x-0 top-0 h-0.5 gradient-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/15">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-base font-bold text-primary">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;