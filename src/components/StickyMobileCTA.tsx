import { STICKY_CTA_THRESHOLD, useScrolledPast } from "@/hooks/useScrolledPast";
import { EVENTS, track } from "@/lib/analytics";
import { PRIMARY_HREF, PRIMARY_LABEL } from "./CTA";

export function StickyMobileCTA() {
  const visible = useScrolledPast(STICKY_CTA_THRESHOLD);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] bg-background/95 backdrop-blur-md border-t border-view-line">
      <a
        href={PRIMARY_HREF}
        onClick={() => track(EVENTS.ctaClick, { cta: "primary", location: "sticky_mobile" })}
        className="flex items-center justify-center gap-2 w-full bg-foreground text-background py-3.5 rounded-md font-display font-extrabold text-[.84rem] tracking-[.06em] no-underline"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        {PRIMARY_LABEL} →
      </a>
    </div>
  );
}
