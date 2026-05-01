## Diagnóstico

Sua landing já cobre 80% do que você pediu. As seções existentes mapeiam quase todos os 10 pontos do briefing:

| Seu pedido | Status atual | Ação |
|---|---|---|
| 1. Hero forte + CTA WhatsApp | ✅ Já existe (`Hero.tsx`) | Reforçar foco local Itabuna-BA |
| 2. Problemas | ✅ `Problem.tsx` | Adicionar 2 itens do briefing (divergência IPTU, financiamento) |
| 3. Serviços | ✅ `Services.tsx` (8 cards) | Sem mudança estrutural |
| 4. Como funciona (4 passos) | ✅ `Process.tsx` | Validar se são exatamente 4 |
| 5. Autoridade profissional | ✅ `About.tsx` (já premium) | Sem mudança |
| 6. **Depoimentos / prova social** | ❌ **Falta** (TrustSignals é "por que confiar", não testimonials reais) | **Criar `Testimonials.tsx`** |
| 7. **Benefícios** | ❌ **Falta** seção dedicada | **Criar `Benefits.tsx`** |
| 8. CTA final | ✅ `CTA.tsx` + `ContactForm.tsx` | Sem mudança |
| 9. SEO | ✅ Bom, mas genérico | Reforçar termos Itabuna-BA no `index.html` + Schema LocalBusiness |
| 10. UX/hierarquia | — | Reordenar Index.tsx para fluxo CRO ideal |

## O que vou implementar

### 1. Nova seção `Testimonials.tsx` (prova social)
- 3 depoimentos realistas de clientes de Itabuna-BA
- Cards com avatar (inicial), nome, cidade, estrelas, depoimento
- Animação stagger ao entrar em viewport
- Posição: logo após `About` (autoridade → prova social)

### 2. Nova seção `Benefits.tsx`
- 5 benefícios em ícones + texto curto: imóvel valorizado, financiamento liberado, segurança jurídica, documentação regular, tranquilidade para vender
- Layout horizontal com check-icons
- Posição: antes do CTA final

### 3. Refino do `Problem.tsx`
- Garantir os 5 problemas exatos do briefing (já temos 8, ajustar copy de 2 itens para incluir "divergência de área no IPTU" e "dificuldade para financiar")

### 4. Reforço SEO local Itabuna-BA (`index.html`)
- Title e description com "Itabuna-BA" no início
- Adicionar Schema `LocalBusiness` com endereço Itabuna
- Keywords priorizando: regularização de imóveis Itabuna, habite-se Itabuna, averbação Itabuna

### 5. Microajuste no Hero
- Adicionar menção sutil "Itabuna-BA e região" próxima ao CTA (sem perder alcance nacional já existente)

### 6. Reordenação do `Index.tsx`
Fluxo CRO otimizado:
```text
Hero → Stats → TrustSignals → Problem → InitialAnalysis →
Services → About → Testimonials (NOVO) → Differentials →
Process → Benefits (NOVO) → Calculator → CTA → FAQ → ContactForm
```

## Detalhes técnicos

- Reusar tokens do design system (sem cores hardcoded)
- Reusar `useInView` para animações de entrada
- Manter compatibilidade dark/light mode
- Sem novas dependências
- Build + tsc validados ao final

## Fora do escopo (não vou tocar)

- Não vou redesenhar Hero, About ou Services — já estão em padrão premium
- Não vou criar formulário novo — o `ContactForm` + WhatsApp float já cobrem
- Não vou mexer em business logic, só presentation/SEO
