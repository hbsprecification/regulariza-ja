import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { consultLink, whatsappLink, WHATSAPP_NUMBER } from "@/lib/contact";
import { MessageCircle, Send, MapPin, ShieldCheck, Clock } from "lucide-react";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
  cidade: z.string().trim().min(2, "Informe a cidade").max(80),
  descricao: z.string().trim().min(10, "Descreva brevemente a situação").max(1000),
});

const trustItems = [
  { icon: ShieldCheck, text: "Seus dados são sigilosos" },
  { icon: Clock, text: "Resposta em até 24h" },
  { icon: MessageCircle, text: "WhatsApp ou formulário" },
];

const ContactForm = () => {
  const [form, setForm] = useState({ nome: "", telefone: "", cidade: "", descricao: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message; });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    const msg =
      `Olá Jádson! Gostaria de uma análise técnica do meu imóvel.\n\n` +
      `*Nome:* ${result.data.nome}\n` +
      `*Telefone:* ${result.data.telefone}\n` +
      `*Cidade:* ${result.data.cidade}\n` +
      `*Situação do imóvel:* ${result.data.descricao}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    toast({ title: "Redirecionando para o WhatsApp!", description: "Seu dispositivo irá abrir o WhatsApp em instantes." });
    setForm({ nome: "", telefone: "", cidade: "", descricao: "" });
    setTimeout(() => setLoading(false), 1000);
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <section id="contato" className="blueprint-bg relative overflow-hidden py-20 lg:py-28" aria-labelledby="contact-heading">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">Contato</span>
          <h2 id="contact-heading" className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
            Solicite sua análise técnica gratuita
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Descreva a situação do seu imóvel e receba uma orientação técnica inicial. <strong className="text-foreground">Sem compromisso, sem custo.</strong>
          </p>

          {/* WhatsApp direto */}
          <a
            href={consultLink()}
            target="_blank"
            rel="noopener noreferrer"
            id="contact-whatsapp-direct"
            className="mt-8 flex items-center gap-4 rounded-xl border border-[hsl(142_70%_45%)/30] bg-[hsl(142_70%_45%)/5] p-4 transition-all hover:border-[hsl(142_70%_45%)/50] hover:shadow-card"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(142_70%_45%)] text-white">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prefere o WhatsApp?</p>
              <p className="font-display font-bold text-primary">Falar diretamente com Jádson</p>
              <p className="text-xs text-muted-foreground mt-0.5">Clique aqui para iniciar a conversa</p>
            </div>
          </a>

          {/* Localização */}
          <div className="mt-4 flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Atendimento</p>
                <p className="font-display text-lg font-bold text-accent">Todo o Brasil</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Consultoria técnica especializada em regularização de imóveis urbanos.
              </p>
              <div className="pt-2 border-t border-border/50">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Base operacional</p>
                <p className="text-sm font-semibold text-primary/80">Itabuna — BA</p>
              </div>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {trustItems.map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card p-3 text-center">
                <Icon className="h-4 w-4 text-accent" />
                <p className="text-[11px] font-medium text-muted-foreground leading-tight">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-8" noValidate>
          <p className="font-display text-lg font-bold text-primary mb-5">Preencha e envie pelo WhatsApp</p>
          <div className="space-y-5">
            <div>
              <Label htmlFor="contact-nome">Seu nome completo</Label>
              <Input id="contact-nome" value={form.nome} onChange={update("nome")} placeholder="Ex: Maria Silva" maxLength={100} className="mt-1" />
              {errors.nome && <p className="mt-1 text-xs text-destructive">{errors.nome}</p>}
            </div>
            <div>
              <Label htmlFor="contact-telefone">WhatsApp / Telefone</Label>
              <Input id="contact-telefone" value={form.telefone} onChange={update("telefone")} placeholder="(73) 99999-9999" maxLength={20} className="mt-1" />
              {errors.telefone && <p className="mt-1 text-xs text-destructive">{errors.telefone}</p>}
            </div>
            <div>
              <Label htmlFor="contact-cidade">Cidade do imóvel</Label>
              <Input id="contact-cidade" value={form.cidade} onChange={update("cidade")} placeholder="Ex: Itabuna — BA" maxLength={80} className="mt-1" />
              {errors.cidade && <p className="mt-1 text-xs text-destructive">{errors.cidade}</p>}
            </div>
            <div>
              <Label htmlFor="contact-descricao">Situação do imóvel</Label>
              <Textarea
                id="contact-descricao"
                value={form.descricao}
                onChange={update("descricao")}
                placeholder="Descreva brevemente: tem projeto aprovado? Está averbado? Passou por reformas? Qual é o problema principal?"
                rows={5}
                maxLength={1000}
                className="mt-1"
              />
              {errors.descricao && <p className="mt-1 text-xs text-destructive">{errors.descricao}</p>}
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-accent font-bold text-accent-foreground hover:bg-accent/90 transition-all hover:scale-[1.01]"
              disabled={loading}
              id="contact-submit"
            >
              {loading ? "Abrindo WhatsApp..." : (
                <>Enviar pelo WhatsApp <Send className="ml-2 h-4 w-4" /></>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Ao clicar, você será direcionado ao WhatsApp com as informações preenchidas.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;