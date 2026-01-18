"use client";

import { useEffect, useState } from "react";

type TimeResponse = {
  now: string;
  nextUnlockAt: string | null;
};

function formatTime(ms: number) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);

  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function ServerSyncedCountdown() {
  const [serverOffsetMs, setServerOffsetMs] = useState<number | null>(null);
  const [nextUnlockAt, setNextUnlockAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const t0 = Date.now();
        const res = await fetch("/api/time", { cache: "no-store" });
        const t1 = Date.now();
        if (!res.ok) throw new Error("Failed to fetch server time");
        const data = (await res.json()) as TimeResponse;

        const serverNow = new Date(data.now).getTime();
        const rtt = t1 - t0;
        const estimatedClientAtServerNow = t0 + rtt / 2;
        const offset = serverNow - estimatedClientAtServerNow;

        if (!cancelled) {
          setServerOffsetMs(offset);
          setNextUnlockAt(data.nextUnlockAt ? new Date(data.nextUnlockAt) : null);
        }
      } catch {
        if (!cancelled) setError("Could not sync with server time.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t: number) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remainingMs =
    serverOffsetMs === null || !nextUnlockAt
      ? null
      : nextUnlockAt.getTime() - (Date.now() + serverOffsetMs + tick * 0);

  if (error) {
    return <p className="font-[var(--font-inter)] text-sm text-white/70">{error}</p>;
  }

  if (serverOffsetMs === null) {
    return (
      <div className="space-y-2">
        <p className="font-[var(--font-inter)] text-sm text-white/70">Syncing with the night sky…</p>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-white/25" />
        </div>
      </div>
    );
  }

  if (!nextUnlockAt) {
    return (
      <div className="space-y-2">
        <p className="font-[var(--font-inter)] text-sm text-white/80">All letters are unlocked.</p>
      </div>
    );
  }

  const done = remainingMs !== null && remainingMs <= 0;

  return (
    <div className="space-y-2">
      <p className="font-[var(--font-inter)] text-xs tracking-[0.24em] text-white/60">NEXT ENVELOPE OPENS IN</p>
      <div className="font-[var(--font-inter)] text-3xl tracking-widest">
        {remainingMs === null ? "--:--:--" : formatTime(remainingMs)}
      </div>
      <p className="font-[var(--font-inter)] text-sm text-white/70">
        {done ? "It’s time. Go to the envelopes." : "Come back at midnight."}
      </p>
    </div>
  );
}
