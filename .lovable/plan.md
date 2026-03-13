

## Problema
A seção Hero atual tem `min-h-screen` mas o conteúdo (título, parágrafo, CTA) não cabe na mesma tela — requer scroll para ver os botões. Isso acontece porque:
- `HeroEye` ocupa espaço significativo (altura ~360px)
- Padding superior grande (`pt-24 md:pt-32` = 96-128px)
- Margens e espaçamentos internos somam mais do que a viewport comporta

## Solução
Compactar a Hero section para que tudo fique visível em uma tela:

### HeroEye.tsx
- Reduzir altura do container de `h-[min(360px,48vw)]` para `h-[min(280px,38vw)]`
- Reduzir margem inferior de `mb-8 md:mb-[52px]` para `mb-4 md:mb-6`
- Reduzir largura do SVG de `w-[min(520px,85vw)]` para `w-[min(420px,75vw)]`

### Hero.tsx
- Reduzir padding superior de `pt-24 md:pt-32` para `pt-16 md:pt-20`
- Reduzir padding inferior de `pb-12 md:pb-16` para `pb-6 md:pb-8`
- Reduzir margem do título de `mb-6` para `mb-4`
- Reduzir margem do parágrafo de `mb-10` para `mb-6`
- Reduzir gap dos botões de `gap-3` para `gap-2`
- Reduzir padding dos botões de `px-8 py-4` para `px-6 py-3`

