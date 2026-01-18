"use client";

import { useEffect, useState } from "react";

type MoonPhaseResponse = {
  now: string;
  phase: {
    index: number;
    name: string;
    illumination: number;
  };
};

function phaseSymbol(index: number) {
  const symbols = ["●", "◔", "◑", "◕", "○", "◕", "◑", "◔"];
  return symbols[index] ?? "●";
}

export default function MoonPhaseBadge() {
  const [data, setData] = useState<MoonPhaseResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/moonphase", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as MoonPhaseResponse;
        if (!cancelled) setData(json);
      } catch {
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) {
    return (
      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-[var(--font-inter)] text-xs text-white/70">
        Moon…
      </div>
    );
  }

  const pct = Math.round(data.phase.illumination * 100);

  return (
    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-[var(--font-inter)] text-xs text-white/80 backdrop-blur">
      <span className="mr-2 inline-block align-middle text-sm">{phaseSymbol(data.phase.index)}</span>
      <span className="align-middle">{data.phase.name}</span>
      <span className="ml-2 align-middle text-white/60">{pct}%</span>
    </div>
  );
}
