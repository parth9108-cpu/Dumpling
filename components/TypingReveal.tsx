"use client";

import { useEffect, useMemo, useState } from "react";

export default function TypingReveal({
  text,
  speedMs = 22,
  onDone
}: {
  text: string;
  speedMs?: number;
  onDone?: () => void;
}) {
  const normalized = useMemo(() => text.replace(/\r\n/g, "\n"), [text]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [normalized]);

  useEffect(() => {
    if (count >= normalized.length) return;

    const id = window.setTimeout(() => {
      setCount((c: number) => c + 1);
    }, speedMs);

    return () => window.clearTimeout(id);
  }, [count, normalized, speedMs]);

  useEffect(() => {
    if (count === normalized.length) onDone?.();
  }, [count, normalized.length, onDone]);

  const visible = normalized.slice(0, count);
  const paragraphs = visible.split("\n\n");

  return (
    <div className="space-y-5 font-[var(--font-inter)] text-base leading-relaxed text-white/85">
      {paragraphs.map((p: string, idx: number) => (
        <p key={idx} className="whitespace-pre-wrap">
          {p}
          {idx === paragraphs.length - 1 && count < normalized.length ? (
            <span className="ml-0.5 inline-block h-4 w-2 animate-pulse align-baseline bg-white/70" />
          ) : null}
        </p>
      ))}
    </div>
  );
}
