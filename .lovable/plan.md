

## Restaurar Hero original + Results logo após

### Mudanças:

1. **`src/components/Hero.tsx`** — Restaurar a Hero original com:
   - Typewriter hook (`useTypewriter`) para headline dinâmica "Sua empresa operando com **dados.**"
   - Badge "Dados · Automação · Sistemas · IA"
   - Subheadline institucional original
   - Dois CTAs: "Quero enxergar minha operação" + "Conheça a metodologia DISTIPP"
   - Manter o HeroEye e os ajustes compactos de padding/tamanho

2. **`src/pages/Landing.tsx`** — Reordenar para colocar `<Results />` logo após `<Hero />`:
   ```
   Hero → Results → Pains → CostOfNotSeeing → Solution → DISTIPP → Testimonials → FAQ → ContactForm
   ```

