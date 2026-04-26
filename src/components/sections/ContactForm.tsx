import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { whatsappLink, WHATSAPP_NUMBER } from "@/lib/contact";
import { MessageCircle, Send, Phone, Mail, MapPin } from "lucide-react";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
  cidade: z.string().trim().min(2, "Informe a cidade").max(80),
  descricao: z.string().trim().min(10, "Descreva brevemente a situação").max(1000),
});

const ContactForm = () => {
  const [form, setForm] = useState({ nome: "", telefone: "", cidade: "", descricao: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    const msg =
      `Olá Jádson, gostaria de uma análise técnica.\n\n` +
      `*Nome:* ${result.data.nome}\n` +
      `*Telefone:* ${result.data.telefone}\n` +
      `*Cidade:* ${result.data.cidade}\n` +
      `*Situação do imóvel:* ${result.data.descricao}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    toast({ title: "Solicitação enviada!", description: "Você será redirecionado para o WhatsApp." });
    setForm({ nome: "", telefone: "", cidade: "", descricao: "" });
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <section id="contato" className="py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">Contato</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
            Solicite uma análise técnica do seu imóvel
          </h2>
          <p className="mt-4 text-muted-foreground">
            Preencha o formulário e descreva brevemente a situação do imóvel. Retornaremos com orientações técnicas iniciais.
          </p>

          <div className="mt-8 space-y-4">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-smooth hover:border-whatsapp/40 hover:shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-whatsapp/10 text-whatsapp">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">WhatsApp</p>
                <p className="font-display font-bold text-primary">Atendimento direto</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Atuação</p>
                <p className="font-display font-bold text-primary">Bahia e região</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-8">
          <div className="space-y-5">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" value={form.nome} onChange={update("nome")} placeholder="Seu nome completo" maxLength={100} />
              {errors.nome && <p className="mt-1 text-xs text-destructive">{errors.nome}</p>}
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" value={form.telefone} onChange={update("telefone")} placeholder="(00) 00000-0000" maxLength={20} />
              {errors.telefone && <p className="mt-1 text-xs text-destructive">{errors.telefone}</p>}
            </div>
            <div>
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" value={form.cidade} onChange={update("cidade")} placeholder="Cidade / Estado" maxLength={80} />
              {errors.cidade && <p className="mt-1 text-xs text-destructive">{errors.cidade}</p>}
            </div>
            <div>
              <Label htmlFor="descricao">Descrição da situação do imóvel</Label>
              <Textarea id="descricao" value={form.descricao} onChange={update("descricao")} placeholder="Conte brevemente sobre o imóvel e a situação atual..." rows={5} maxLength={1000} />
              {errors.descricao && <p className="mt-1 text-xs text-destructive">{errors.descricao}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full font-semibold">
              Enviar solicitação <Send className="ml-1 h-4 w-4" />
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Ao enviar, você será direcionado ao WhatsApp para concluir o contato.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;