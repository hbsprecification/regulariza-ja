import { ClipboardCheck, FileSignature, LandPlot, Ruler, FileSearch, Users, FileText, Compass } from "lucide-react";

const services = [
  { icon: ClipboardCheck, title: "Regularização de obras e construções", desc: "Condução técnica completa para regularizar imóveis junto aos órgãos competentes." },
  { icon: FileSignature, title: "Averbação de construção em cartório", desc: "Documentação técnica para averbação correta da construção no registro de imóveis." },
  { icon: LandPlot, title: "Desmembramento de terrenos", desc: "Estudo e regularização de divisão de áreas urbanas conforme legislação local." },
  { icon: Compass, title: "Análise técnica urbanística", desc: "Avaliação de zoneamento, uso e ocupação do solo aplicáveis ao imóvel." },
  { icon: FileSearch, title: "Laudos técnicos e vistorias", desc: "Emissão de laudos e vistorias técnicas com responsabilidade profissional." },
  { icon: Users, title: "Consultoria para engenheiros e arquitetos", desc: "Suporte técnico para profissionais em processos de regularização." },
  { icon: FileText, title: "Diagnóstico documental do imóvel", desc: "Levantamento completo da situação documental e construtiva do bem." },
  { icon: Ruler, title: "Orientação para regularização", desc: "Direcionamento técnico claro para conduzir o processo do início ao fim." },
];

const Services = () => (
  <section id="servicos" className="py-20 lg:py-28">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Serviços</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
          Serviços de regularização de imóveis
        </h2>
        <p className="mt-4 text-muted-foreground">
          Cada imóvel possui uma situação específica. Por isso, o primeiro passo é realizar uma análise técnica para identificar o caminho correto da regularização.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, desc }) => (
          <article key={title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant">
            <div className="absolute inset-x-0 top-0 h-1 gradient-accent opacity-0 transition-smooth group-hover:opacity-100" />
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:scale-110">
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