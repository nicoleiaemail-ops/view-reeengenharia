

# Auditoria Completa da Landing Page VIEW

---

## 1. Clareza da Proposta de Valor — Nota: 6/10

**Problemas:**
- A headline "Sua empresa operando com [dados/IA/escala...]" é genérica. Não comunica **o que a VIEW faz** em 3 segundos. Um visitante novo não sabe se é software, consultoria, ou agência.
- O typewriter effect dilui a mensagem — o visitante pega a frase no meio ("com margem.") e não entende nada.
- A subheadline ("A VIEW nasceu com um propósito...") fala sobre a empresa, não sobre o cliente. É institucional, não persuasiva.
- Falta uma **declaração direta do serviço**: "Reengenharia de processos para empresas de médio porte".

**Melhorias concretas:**
- Headline fixa e direta: **"Pare de operar no escuro. Enxergue cada processo, custo e gargalo — em tempo real."**
- Subheadline orientada ao resultado: **"Redesenhamos sua operação com automação, dados e sistemas sob medida. Diagnóstico gratuito em 48h."**
- Mover o typewriter para um elemento secundário (badge ou detalhe visual), não como parte central da proposta.

---

## 2. Copywriting Persuasivo — Nota: 7/10

**Pontos fortes:**
- Copy da seção "Custo de Não Enxergar" é excelente — números concretos, urgência real, linguagem emocional.
- FAQ bem escrito, objetivo.
- Seção Solution com estrutura "Enxerga → Decide → Cresce" é clara.

**Problemas:**
- Hero prolixo — 3 linhas de texto antes do CTA é demais para above the fold.
- Seção Reengenharia repete o que já foi dito ("O que é reengenharia") — funciona mais como conteúdo educacional do que persuasivo. O visitante não veio aprender, veio resolver um problema.
- "Reconheceu sua empresa aqui?" (Pains) é um heading fraco — deveria ser mais provocativo.
- MidCTA ("Reconheceu sua empresa aqui?") repete linguagem genérica.

**Melhorias concretas:**
- Hero: Cortar para 1 linha de subheadline.
- Pains heading: **"Esses problemas custam R$ 55 mil/mês. Você tem todos eles."**
- MidCTA: Substituir por um gatilho mais urgente — **"A cada semana sem diagnóstico, R$ 13.750 saem do seu caixa."**

---

## 3. Estrutura de Conversão (CRO) — Nota: 5/10

**Problemas críticos:**
- **Página longa demais** — 13 seções antes do formulário. O visitante precisa scrollar ~8 telas para chegar ao form.
- **Redundância de seções**: Pillars (4 pilares da transformação) e DISTIPP (7 pilares) competem entre si. São duas seções de "pilares" na mesma página — confuso.
- **CTA principal escondido**: O formulário de diagnóstico está no final da página. Deveria ter um CTA intermediário mais forte ou o formulário mais cedo.
- **Dois frameworks competindo**: DISTIPP (7 dimensões de maturidade) vs "4 Pilares da Transformação" — qual é a metodologia real? O visitante fica perdido.
- **Falta sticky CTA** no mobile — o botão do nav some durante o scroll.
- **Formulário com 7 campos** — fricção alta para um diagnóstico "gratuito". Nome + email + WhatsApp bastam para o primeiro contato.

**Fluxo atual (problemático):**
```text
Hero → Results → Reengenharia → Pains → DISTIPP → CostOfNotSeeing → Solution → MidCTA → Pillars → Testimonials → FAQ → ContactForm → Footer
```

**Gargalos identificados:**
1. Results logo após Hero sem contexto — números sem significado para quem ainda não sabe o que é a VIEW.
2. Reengenharia + Pains + DISTIPP + CostOfNotSeeing = 4 seções de "problema" antes de chegar na solução.
3. MidCTA entre Solution e Pillars quebra o fluxo narrativo.
4. Pillars após MidCTA é anticlímax — o visitante já viu o CTA e agora recebe mais conteúdo.

---

## 4. UX — Nota: 6.5/10

**Pontos fortes:**
- Scroll reveal animations são suaves e não intrusivas.
- Formatação de telefone no form é boa UX.
- WhatsApp float é útil e bem posicionado.

**Problemas:**
- Carga cognitiva alta — muitas seções, muitos frameworks, muita informação.
- O visitante não tem um caminho linear claro: Problema → Solução → Prova → Ação.
- Navbar tem apenas 2 links ("Sobre nós" + "Diagnóstico Grátis") — poderia ter âncoras para seções-chave.
- Sem indicador de progresso ou navegação de seções.
- Eye animation no Hero consome ~2s antes de mostrar algo útil — em mobile, o visitante não vê os nodes.

---

## 5. UI — Nota: 7.5/10

**Pontos fortes:**
- Paleta escura consistente e profissional.
- Tipografia Space Grotesk + Inter é boa combinação.
- Sistema de cores (primary/accent/green/destructive) bem aplicado.
- Cards com hover states são polidos.

**Problemas:**
- CTAs primários e secundários têm contraste similar — difícil distinguir hierarquia. O botão "Quero enxergar" (bg-foreground = branco) e "Avaliação DISTIPP" (border outline) competem visualmente.
- Botões com `rounded-sm` (2px border-radius) parecem quase retangulares — inconsistente com cards que usam `rounded-xl` e `rounded-2xl`.
- Seção DISTIPP com 7 cards em 3 colunas = última linha com 1 card sozinho, criando assimetria visual.
- Font sizes muito pequenas em vários lugares (.6rem, .58rem, .52rem) — prejudica legibilidade.

---

## 6. SEO — Nota: 6/10

**Pontos fortes:**
- H1 existe e é único.
- Schema.org ProfessionalService implementado.
- Meta description e canonical configurados.
- Keywords relevantes no meta.

**Problemas:**
- H1 dinâmico (typewriter) — Google indexa "Sua empresa operando com" sem o complemento, perdendo keyword relevante.
- Falta H2 com keyword "reengenharia de processos" above the fold.
- Muitas seções sem headings semânticos — Results não tem H2.
- Falta `alt` text em imagens (o SVG do eye tem aria-label, mas não há outras imagens).
- Falta conteúdo textual denso — muita informação em cards visuais que bots podem não interpretar bem.
- URL `/avaliacao-maturidade` é boa, mas falta `/reengenharia-de-processos` como página dedicada para SEO.

---

## 7. Autoridade e Prova Social — Nota: 4/10

**Problema grave:**
- Apenas **2 depoimentos**, ambos do setor de construção civil.
- **Zero logos de clientes**.
- **Zero cases com dados reais** (antes/depois com números).
- **Zero certificações** ou parcerias mencionadas.
- Os números na seção Results (20+ processos, +50% produtividade, R$100k+) não têm fonte — parecem inventados.
- Falta: "Atendemos X empresas", "Y anos no mercado", fotos reais de projetos.

**O que incluir:**
1. Barra de logos de clientes (mesmo 4-5 logos).
2. Mini-cases: "Construtora X reduziu retrabalho em 40% em 3 meses" com foto/screenshot.
3. Mais depoimentos (mínimo 4, de setores variados).
4. Números com fonte: "Dados de 2024, base de X clientes atendidos".
5. Selo "Atendemos presencialmente em PB, PE e RN" com mapa visual.

---

## 8. Estratégia de Persuasão — Nota: 6.5/10

**Presente:**
- Urgência: "Apenas 3 vagas esta semana" (bom, mas parece artificial sem prova).
- Dor: Seção CostOfNotSeeing é forte.
- Reciprocidade: Diagnóstico gratuito.
- Redução de risco: "Sem compromisso", "Resultado em 48h".

**Ausente:**
- **Autoridade**: Sem credenciais, certificações, tempo de mercado.
- **Prova social forte**: 2 depoimentos não

<lov-plan>

# Auditoria Completa da Landing Page VIEW

---

## 1. Clareza da Proposta de Valor — Nota: 6/10

**Problemas:**
- A headline "Sua empresa operando com [dados/IA/escala...]" é genérica. Não comunica **o que a VIEW faz** em 3 segundos.
- O typewriter effect dilui a mensagem — o visitante pega a frase no meio ("com margem.") e não entende nada.
- A subheadline fala sobre a empresa ("A VIEW nasceu..."), não sobre o cliente. É institucional, não persuasiva.
- Falta declaração direta: "Reengenharia de processos para empresas de médio porte".

**Melhorias:**
- Headline fixa: **"Pare de operar no escuro. Enxergue cada processo, custo e gargalo — em tempo real."**
- Subheadline orientada ao resultado: **"Redesenhamos sua operação com automação, dados e sistemas sob medida. Diagnóstico gratuito em 48h."**
- Typewriter como elemento secundário (badge), não como parte central da proposta.

---

## 2. Copywriting Persuasivo — Nota: 7/10

**Fortes:** Copy de "Custo de Não Enxergar" é excelente. FAQ objetivo. Solution com "Enxerga → Decide → Cresce" é claro.

**Problemas:**
- Hero prolixo — 3 linhas antes do CTA é demais para above the fold.
- Reengenharia repete conteúdo educacional — visitante veio resolver problema, não aprender.
- "Reconheceu sua empresa aqui?" é heading fraco.
- MidCTA genérico e sem urgência real.

**Melhorias:**
- Hero: 1 linha de subheadline máximo.
- Pains heading: **"Esses problemas custam R$ 55 mil/mês. Você tem todos eles."**
- MidCTA: **"A cada semana sem diagnóstico, R$ 13.750 saem do seu caixa."**

---

## 3. Estrutura de Conversão (CRO) — Nota: 5/10

**Problemas críticos:**
- **Página longa demais** — 13 seções antes do formulário. ~8 telas de scroll.
- **Redundância**: Pillars (4 pilares) e DISTIPP (7 pilares) competem. Dois frameworks de "pilares" confundem.
- **Formulário escondido** no final da página.
- **Formulário com 7 campos** — fricção alta. Nome + Email + WhatsApp bastam para primeiro contato.
- **Falta sticky CTA** no mobile durante scroll.

**Fluxo atual (problemático):**
```text
Hero → Results → Reengenharia → Pains → DISTIPP → CostOfNotSeeing → Solution → MidCTA → Pillars → Testimonials → FAQ → Form → Footer
```

**Gargalos:**
1. Results sem contexto logo após Hero — números sem significado para quem não sabe o que é VIEW.
2. Quatro seções de "problema" (Reengenharia + Pains + DISTIPP + CostOfNotSeeing) antes da solução.
3. Pillars após MidCTA é anticlímax — visitante já viu CTA e recebe mais conteúdo.

---

## 4. UX — Nota: 6.5/10

**Fortes:** Scroll reveal suave. Formatação de telefone. WhatsApp float.

**Problemas:**
- Carga cognitiva alta — muitos frameworks, muita informação.
- Sem caminho linear claro: Problema → Solução → Prova → Ação.
- Navbar com apenas 2 links — poderia ter âncoras para seções-chave.
- Eye animation consome ~2s; em mobile os nodes não aparecem.

---

## 5. UI — Nota: 7.5/10

**Fortes:** Paleta escura consistente. Space Grotesk + Inter boa combinação. Cards polidos.

**Problemas:**
- CTAs primário e secundário com contraste similar — difícil distinguir hierarquia.
- Botões com `rounded-sm` (quase retangulares) inconsistente com cards `rounded-xl`.
- DISTIPP: 7 cards em 3 colunas = 1 card sozinho na última linha.
- Font sizes muito pequenas (.58rem, .52rem) prejudicam legibilidade.

---

## 6. SEO — Nota: 6/10

**Fortes:** H1 único. Schema.org implementado. Meta description e canonical configurados.

**Problemas:**
- H1 dinâmico (typewriter) — Google indexa "Sua empresa operando com" sem complemento.
- Results não tem H2.
- Falta conteúdo textual denso — muita info em cards visuais.
- Falta página dedicada `/reengenharia-de-processos` para keyword principal.

---

## 7. Autoridade e Prova Social — Nota: 4/10

**Problema grave:**
- Apenas 2 depoimentos, ambos de construção civil.
- Zero logos de clientes.
- Zero cases com dados reais (antes/depois com números).
- Números na seção Results sem fonte — parecem inventados.

**Incluir:** Barra de logos, mini-cases, mais depoimentos (mínimo 4 setores variados), números com fonte.

---

## 8. Estratégia de Persuasão — Nota: 6.5/10

**Presente:** Urgência ("3 vagas"), dor (CostOfNotSeeing), reciprocidade (diagnóstico grátis), redução de risco ("sem compromisso").

**Ausente:** Autoridade (sem credenciais), garantia formal, demonstração do produto (screenshots, vídeo), comparativo com alternativas.

---

## 9. Notas Gerais

| Pilar | Nota |
|---|---|
| Clareza da proposta | 6 |
| Copywriting | 7 |
| UX | 6.5 |
| UI | 7.5 |
| Estrutura de conversão | 5 |
| SEO | 6 |
| Persuasão | 6.5 |
| **Média** | **6.4** |

---

## 10. Top 5 Melhorias de Alto Impacto

1. **Reestruturar fluxo da página** — eliminar redundâncias (unificar Pillars + DISTIPP), mover formulário para mais cedo, reduzir de 13 para 8-9 seções.
2. **Reescrever Hero** — headline fixa orientada a resultado, subheadline de 1 linha, CTA único e claro.
3. **Reduzir formulário para 3 campos** — Nome, WhatsApp, Segmento. Resto coleta depois.
4. **Adicionar prova social real** — logos, mais depoimentos, cases com números.
5. **Adicionar sticky CTA mobile** — botão fixo no bottom do viewport em mobile.

**Remover:** Seção Pillars (redundante com DISTIPP). Seção Reengenharia (mover para página /sobre ou blog).

**Adicionar:** Barra de logos, vídeo/demo de 30s, garantia formal, sticky CTA mobile, seção "Como funciona" em 3 passos simples.

---

## 11. Reestruturação Recomendada

```text
1. Hero (headline fixa + 1 CTA forte)
2. Logos / Social Proof Bar (5-6 logos)
3. Pains (problemas do cliente — 4 cards)
4. CostOfNotSeeing (urgência com números)
5. Solution (Enxerga → Decide → Cresce + Before/After)
6. DISTIPP (metodologia — 7 pilares)
7. Results (números com contexto, após explicar o que fazem)
8. Testimonials (4+ depoimentos variados)
9. FAQ (5 perguntas)
10. ContactForm (formulário simplificado — 3 campos)
11. Footer
```

---

## Plano de Implementação

Aplicar as mudanças de maior impacto e menor risco:

### Mudanças propostas:

1. **Hero.tsx** — Reescrever headline para ser fixa e orientada a resultado. Subheadline de 1 linha. Unificar para 1 CTA principal + 1 secundário com hierarquia visual clara.

2. **Landing.tsx** — Reordenar seções para o fluxo otimizado: Hero → Pains → CostOfNotSeeing → Solution → DISTIPP → Results → Testimonials → FAQ → ContactForm. Remover Reengenharia (mover conteúdo para /sobre), remover Pillars (redundante), remover MidCTA (substituir por CTA inline na Solution).

3. **ContactForm.tsx** — Simplificar formulário: manter Nome, WhatsApp, Segmento e Empresa. Remover Email, Cidade e Num Funcionários do form principal (coletar depois).

4. **Navbar.tsx** — Adicionar âncoras para seções-chave no desktop: "Metodologia", "Resultados", "FAQ". Adicionar sticky CTA mobile (botão fixo no bottom).

5. **DISTIPP** — Ajustar grid para 4 colunas no desktop (4+3 distribuição) ou redesenhar como 2 rows de cards menores para evitar assimetria.

6. **Results.tsx** — Adicionar H2 semântico e mover a seção para depois de Solution (números fazem mais sentido após explicar o serviço).

7. **SEO** — Tornar H1 estático com keyword "reengenharia de processos" para indexação correta.

