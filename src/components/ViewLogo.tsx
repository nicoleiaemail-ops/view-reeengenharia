export function ViewLogo({ size = 44 }: { size?: number }) {
  const h = Math.round(size * 38 / 44);
  return (
    <svg width={size} height={h} viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Logo VIEW">
      <line x1="2" y1="36" x2="42" y2="36" stroke="hsl(var(--view-white))" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="4" y1="34" x2="28" y2="4" stroke="hsl(var(--view-white))" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="30" cy="24" r="9" fill="hsl(var(--view-white))" />
      <polygon points="30,18 35,21 35,27 30,30 25,27 25,21" stroke="hsl(var(--view-dark))" strokeWidth="1.1" fill="none" strokeLinejoin="round" />
      <line x1="30" y1="18" x2="30" y2="24" stroke="hsl(var(--view-dark))" strokeWidth="1.1" />
      <line x1="25" y1="21" x2="30" y2="24" stroke="hsl(var(--view-dark))" strokeWidth="1.1" />
      <line x1="35" y1="21" x2="30" y2="24" stroke="hsl(var(--view-dark))" strokeWidth="1.1" />
    </svg>
  );
}
