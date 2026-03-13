import { useEffect, useState } from "react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden p-3 bg-background/95 backdrop-blur-md border-t border-view-line">
      <a
        href="#diagnostico"
        className="flex items-center justify-center gap-2 w-full bg-foreground text-background py-3.5 rounded-md font-display font-extrabold text-[.82rem] tracking-[.07em] no-underline"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
        </svg>
        Diagnóstico Gratuito →
      </a>
    </div>
  );
}
