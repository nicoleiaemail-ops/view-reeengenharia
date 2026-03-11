import { useEffect, useRef, useCallback } from "react";

const V_LID_CLOSED_T = "M8,120 C100,18 420,18 512,120 L512,120 C420,120 100,120 8,120 Z";
const V_LID_CLOSED_B = "M8,120 C100,222 420,222 512,120 L512,120 C420,120 100,120 8,120 Z";
const V_LID_OPEN_T = "M8,120 C100,18 420,18 512,120 L512,6 C420,-40 100,-40 8,6 Z";
const V_LID_OPEN_B = "M8,120 C100,222 420,222 512,120 L512,234 C420,280 100,280 8,234 Z";

export function HeroEye() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<ReturnType<typeof setTimeout>>();

  const getEl = useCallback((id: string) => stageRef.current?.querySelector(`#${id}`) as SVGElement | null, []);

  const setIris = useCallback((r: number) => {
    getEl("viris")?.setAttribute("r", String(r));
    getEl("vhexpat")?.setAttribute("r", String(r));
    getEl("vring1")?.setAttribute("r", String(Math.round(r * 0.85)));
    getEl("vring2")?.setAttribute("r", String(Math.round(r * 0.7)));
    getEl("vring3")?.setAttribute("r", String(Math.round(r * 0.55)));
  }, [getEl]);

  const popNodes = useCallback((show: boolean) => {
    for (let i = 0; i < 6; i++) {
      const nd = stageRef.current?.querySelector(`#vn${i}`);
      if (!nd) continue;
      if (show) {
        setTimeout(() => nd.classList.add("show"), i * 150);
      } else {
        nd.classList.remove("show");
      }
    }
  }, []);

  const openEye = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    stage.querySelector(".vlid-light")?.classList.add("lit");
    setTimeout(() => stage.querySelector(".vchaos-inner")?.classList.add("hidden"), 200);

    setTimeout(() => {
      getEl("vlidT")?.setAttribute("d", V_LID_OPEN_T);
      getEl("vlidB")?.setAttribute("d", V_LID_OPEN_B);
    }, 400);

    setTimeout(() => {
      const iris = getEl("viris");
      if (iris) iris.style.fill = "url(#vIrisOpen)";
      setIris(88);
      ["vring1", "vring2", "vring3"].forEach(id => {
        const el = getEl(id);
        if (el) el.style.opacity = "1";
      });
      const hp = getEl("vhexpat");
      if (hp) hp.style.opacity = ".7";
      const glow = getEl("virisGlowCirc");
      if (glow) { glow.setAttribute("r", "95"); glow.style.opacity = "1"; }
      getEl("vpupil")?.setAttribute("r", "28");
      getEl("vshine")?.setAttribute("r", "9");
      getEl("vshine2")?.setAttribute("r", "6");
    }, 800);

    setTimeout(() => stage.querySelector(".veye-svg")?.classList.add("powered"), 900);
    setTimeout(() => {
      stage.querySelectorAll(".vpulse-el").forEach(p => p.classList.add("show"));
    }, 1200);
    setTimeout(() => stage.querySelector(".vlines-svg")?.classList.add("show"), 1500);
    setTimeout(() => popNodes(true), 1800);

    const label = stage.querySelector(".vstate-label");
    label?.classList.add("open");
    const txt = stage.querySelector("#vstateTxt");
    if (txt) txt.textContent = "Enxergando tudo";
  }, [getEl, setIris, popNodes]);

  const closeEye = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    popNodes(false);
    stage.querySelector(".vlines-svg")?.classList.remove("show");

    setTimeout(() => {
      stage.querySelectorAll(".vpulse-el").forEach(p => p.classList.remove("show"));
      stage.querySelector(".veye-svg")?.classList.remove("powered");
      stage.querySelector(".vlid-light")?.classList.remove("lit");

      getEl("vlidT")?.setAttribute("d", V_LID_CLOSED_T);
      getEl("vlidB")?.setAttribute("d", V_LID_CLOSED_B);

      const iris = getEl("viris");
      if (iris) iris.style.fill = "url(#vIrisClosed)";
      setIris(5);
      ["vring1", "vring2", "vring3"].forEach(id => {
        const el = getEl(id);
        if (el) el.style.opacity = "0";
      });
      const hp = getEl("vhexpat");
      if (hp) hp.style.opacity = "0";
      const glow = getEl("virisGlowCirc");
      if (glow) { glow.style.opacity = "0"; glow.setAttribute("r", "70"); }
      getEl("vpupil")?.setAttribute("r", "2");
      getEl("vshine")?.setAttribute("r", "0");
      getEl("vshine2")?.setAttribute("r", "0");
    }, 300);

    setTimeout(() => stage.querySelector(".vchaos-inner")?.classList.remove("hidden"), 1200);

    const label = stage.querySelector(".vstate-label");
    label?.classList.remove("open");
    const txt = stage.querySelector("#vstateTxt");
    if (txt) txt.textContent = "Operando no escuro";
  }, [getEl, setIris, popNodes]);

  useEffect(() => {
    function cycle() {
      openEye();
      cycleRef.current = setTimeout(() => {
        closeEye();
        cycleRef.current = setTimeout(cycle, 5500);
      }, 9500);
    }
    cycleRef.current = setTimeout(cycle, 1800);
    return () => { if (cycleRef.current) clearTimeout(cycleRef.current); };
  }, [openEye, closeEye]);

  const nodeData = [
    { emoji: "📊", label: "Dados", val: "tempo real", cls: "n0" },
    { emoji: "🤖", label: "IA", val: "aplicada", cls: "n1" },
    { emoji: "📱", label: "Aplicativos", val: "iOS & Android", cls: "n2" },
    { emoji: "💰", label: "Lucro", val: "+32% margem", cls: "n3" },
    { emoji: "⚡", label: "Automação", val: "87% menos erro", cls: "n4" },
    { emoji: "🖥️", label: "Sistema", val: "sob medida", cls: "n5" },
  ];

  const nodePositions: Record<string, string> = {
    n0: "top-0 left-1/2 -ml-7",
    n1: "top-[15%] right-0",
    n2: "bottom-[15%] right-0",
    n3: "bottom-0 left-1/2 -ml-7",
    n4: "bottom-[15%] left-0",
    n5: "top-[15%] left-0",
  };

  return (
    <div ref={stageRef} className="relative w-[min(680px,90vw)] h-[min(360px,48vw)] mb-8 md:mb-[52px] flex items-center justify-center z-[2]">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsla(225,33%,95%,.018) 1px, transparent 1px), linear-gradient(90deg, hsla(225,33%,95%,.018) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 10%, transparent 100%)"
        }}
      />

      {/* Lid light */}
      <div className="vlid-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[2px] z-[3] pointer-events-none" style={{ filter: "blur(6px)" }} />

      {/* Chaos fragments */}
      <div className="vchaos-inner absolute w-[58%] h-[55%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[4] overflow-hidden">
        {["S/ prazo", "Planilha v3", "pedido #??", "cadê o dado?", "email 14:02"].map((t, i) => (
          <span key={i} className="absolute font-display text-[.52rem] tracking-[.04em] text-foreground/25 whitespace-nowrap"
            style={{
              top: `${15 + i * 15}%`,
              left: `${5 + i * 14}%`,
              animation: `vfragDrift ${4 + i * 0.5}s linear infinite`,
              animationDelay: `${-i}s`,
              ["--r" as string]: `${-3 + i * 2}deg`,
              ["--r2" as string]: `${1 + i}deg`,
              ["--dx" as string]: `${8 - i * 4}px`,
              ["--dy" as string]: `${-6 + i * 3}px`,
            }}
          >{t}</span>
        ))}
        <span className="absolute text-[.62rem] text-destructive/30"
          style={{ top: "40%", left: "60%", animation: "vfragDrift 3.5s linear infinite", animationDelay: "-2s", ["--r" as string]: "0deg", ["--dx" as string]: "-6px", ["--dy" as string]: "-8px" }}>✕</span>
        <span className="absolute text-[.62rem] text-destructive/30"
          style={{ top: "70%", left: "20%", animation: "vfragDrift 4s linear infinite", animationDelay: "-1s", ["--r" as string]: "-2deg", ["--dx" as string]: "10px", ["--dy" as string]: "4px" }}>✕</span>
      </div>

      {/* Connecting lines SVG */}
      <svg className="vlines-svg absolute inset-0 w-full h-full pointer-events-none z-[6] hidden md:block" viewBox="0 0 680 360">
        {[
          { x1: 340, y1: 180, x2: 340, y2: 0 },
          { x1: 340, y1: 180, x2: 660, y2: 54 },
          { x1: 340, y1: 180, x2: 660, y2: 306 },
          { x1: 340, y1: 180, x2: 340, y2: 360 },
          { x1: 340, y1: 180, x2: 20, y2: 306 },
          { x1: 340, y1: 180, x2: 20, y2: 54 },
        ].map((l, i) => (
          <line key={i} className="vline" x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="hsla(222,100%,65%,.18)" strokeWidth="1"
            strokeDasharray="5 7"
            style={{ animation: "vdash 3.5s linear infinite" }} />
        ))}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0 pointer-events-none z-[10] hidden md:block">
        {nodeData.map((n, i) => (
          <div key={i} id={`vn${i}`} className={`vnode absolute flex flex-col items-center gap-[5px] ${nodePositions[n.cls]}`}>
            <div className="w-14 h-14 rounded-full bg-background/95 border border-primary/50 flex items-center justify-center text-[1.3rem] transition-shadow duration-600">
              {n.emoji}
            </div>
            <div className="font-display font-bold text-[.6rem] tracking-[.1em] uppercase text-foreground/80 whitespace-nowrap">{n.label}</div>
            <div className="text-[.54rem] text-primary/85 whitespace-nowrap">{n.val}</div>
          </div>
        ))}
      </div>

      {/* Pulses */}
      <div className="vpulse-el absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full border border-primary/35 pointer-events-none z-[9]"
        style={{ animation: "vpulseAnim 2.8s ease-out infinite" }} />
      <div className="vpulse-el absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full border border-primary/35 pointer-events-none z-[9]"
        style={{ animation: "vpulseAnim 2.8s ease-out infinite", animationDelay: "1.4s" }} />

      {/* Eye SVG */}
      <svg className="veye-svg relative z-[5] w-[min(520px,85vw)] overflow-visible" viewBox="0 0 520 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Símbolo VIEW — visibilidade operacional">
        <defs>
          <radialGradient id="vIrisOpen" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8f4ff" stopOpacity=".95" />
            <stop offset="20%" stopColor="#4a7cff" stopOpacity=".9" />
            <stop offset="55%" stopColor="#1a3070" />
            <stop offset="100%" stopColor="#07102a" />
          </radialGradient>
          <radialGradient id="vIrisClosed" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f1e3a" />
            <stop offset="100%" stopColor="#07102a" />
          </radialGradient>
          <radialGradient id="vIrisGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4a7cff" stopOpacity=".5" />
            <stop offset="60%" stopColor="#4a7cff" stopOpacity=".1" />
            <stop offset="100%" stopColor="#4a7cff" stopOpacity="0" />
          </radialGradient>
          <filter id="vEdgeGlow" x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="vEyeClip">
            <path d="M8,120 C100,18 420,18 512,120 C420,222 100,222 8,120 Z" />
          </clipPath>
          <pattern id="vHexPat" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <polygon points="10,2 17,6 17,14 10,18 3,14 3,6" fill="none" stroke="rgba(74,124,255,.12)" strokeWidth=".5" />
          </pattern>
        </defs>

        <path d="M8,120 C100,18 420,18 512,120 C420,222 100,222 8,120 Z" fill="#060e24" />
        <circle id="virisGlowCirc" cx="260" cy="120" r="70" fill="url(#vIrisGlow)" opacity="0" style={{ transition: "opacity 1.5s ease, r 1.2s ease" }} />

        <g clipPath="url(#vEyeClip)">
          <circle id="viris" cx="260" cy="120" r="5" fill="url(#vIrisClosed)" style={{ transition: "r 1.4s cubic-bezier(.34,1.1,.64,1)" }} />
          <circle cx="260" cy="120" r="5" id="vhexpat" fill="url(#vHexPat)" opacity="0" style={{ transition: "r 1.4s cubic-bezier(.34,1.1,.64,1), opacity .8s ease .6s" }} />
          <circle id="vring1" cx="260" cy="120" r="4" fill="none" stroke="rgba(237,240,248,.06)" strokeWidth="1" opacity="0" style={{ transition: "r 1.3s ease .2s, opacity .6s ease .8s" }} />
          <circle id="vring2" cx="260" cy="120" r="3" fill="none" stroke="rgba(74,124,255,.1)" strokeWidth=".8" opacity="0" style={{ transition: "r 1.3s ease .4s, opacity .6s ease 1s" }} />
          <circle id="vring3" cx="260" cy="120" r="2" fill="none" stroke="rgba(74,124,255,.07)" strokeWidth=".5" opacity="0" style={{ transition: "r 1.3s ease .5s, opacity .6s ease 1.1s" }} />
        </g>

        <g clipPath="url(#vEyeClip)">
          <circle id="vpupil" cx="260" cy="120" r="2" fill="#020811" style={{ transition: "r 1s cubic-bezier(.34,1.1,.64,1) .3s" }} />
          <circle id="vshine" cx="272" cy="108" r="0" fill="rgba(255,255,255,.18)" style={{ transition: "r .8s ease .8s" }} />
          <circle id="vshine2" cx="250" cy="130" r="0" fill="rgba(74,124,255,.15)" style={{ transition: "r .6s ease 1s" }} />
        </g>

        <path id="vlidT" d={V_LID_CLOSED_T} fill="#07102a" style={{ transition: "d 1.4s cubic-bezier(.4,0,.15,1)" }} />
        <path id="vlidB" d={V_LID_CLOSED_B} fill="#07102a" style={{ transition: "d 1.4s cubic-bezier(.4,0,.15,1)" }} />

        <path d="M8,120 C100,18 420,18 512,120" fill="none" stroke="rgba(237,240,248,.55)" strokeWidth="1.5" filter="url(#vEdgeGlow)" />
        <path d="M8,120 C100,222 420,222 512,120" fill="none" stroke="rgba(237,240,248,.22)" strokeWidth="1" />

        <circle cx="9" cy="120" r="4" fill="#edf0f8" opacity=".6" />
        <circle cx="511" cy="120" r="4" fill="#edf0f8" opacity=".6" />
        <circle cx="9" cy="120" r="8" fill="none" stroke="rgba(237,240,248,.12)" strokeWidth="1" />
        <circle cx="511" cy="120" r="8" fill="none" stroke="rgba(237,240,248,.12)" strokeWidth="1" />
      </svg>

      {/* State label */}
      <div className="vstate-label absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 text-[.6rem] tracking-[.15em] uppercase whitespace-nowrap z-20 text-muted-foreground">
        <div className="vstate-dot w-1.5 h-1.5 rounded-full bg-destructive/60" />
        <span id="vstateTxt">Operando no escuro</span>
      </div>
    </div>
  );
}
