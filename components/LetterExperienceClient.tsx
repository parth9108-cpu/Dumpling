"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MoonPhaseBadge from "@/components/MoonPhaseBadge";
import ProgressBar from "@/components/ProgressBar";
import TypingReveal from "@/components/TypingReveal";

export default function LetterExperienceClient({
  day,
  title,
  content,
  unlockedCount,
  total
}: {
  day: number;
  title: string;
  content: string;
  unlockedCount: number;
  total: number;
}) {
  const [opened, setOpened] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOpened(false);
    setDone(false);
  }, [day]);

  useEffect(() => {
    try {
      localStorage.setItem(`opened_day_${day}`, "1");
    } catch {
    }
  }, [day]);

  const hearts = useMemo<Array<{ i: number; left: number; delay: number; duration: number }> | null>(() => {
    if (day !== 2) return null;
    return Array.from({ length: 12 }).map((_, i) => {
      const left = 10 + Math.random() * 80;
      const delay = Math.random() * 4;
      const duration = 4 + Math.random() * 4;
      return { i, left, delay, duration };
    });
  }, [day]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="starfield" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_600px_at_20%_10%,rgba(255,200,240,0.18),transparent_60%),radial-gradient(900px_600px_at_80%_10%,rgba(160,120,255,0.18),transparent_60%)]" />

      {hearts ? (
        <div className="pointer-events-none absolute inset-0 opacity-70">
          {hearts.map((h: { i: number; left: number; delay: number; duration: number }) => (
            <div
              key={h.i}
              className="heart"
              style={{ left: `${h.left}%`, animationDelay: `${h.delay}s`, animationDuration: `${h.duration}s` }}
            />
          ))}
        </div>
      ) : null}

      <div className="relative mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-[var(--font-inter)] text-xs tracking-[0.24em] text-white/60">DAY {day}</p>
            <h1 className="mt-2 font-[var(--font-playfair)] text-4xl leading-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <MoonPhaseBadge />
            <Link
              href="/letters"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-[var(--font-inter)] text-xs text-white/80 hover:bg-white/10"
            >
              Close
            </Link>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
            >
              <div className="mx-auto mb-6 h-24 w-24 rounded-2xl border border-violet-200/25 bg-violet-200/10 shadow-[0_0_40px_rgba(180,120,255,0.22)]" />
              <div className="font-[var(--font-inter)] text-xs tracking-[0.24em] text-white/60">AN ENVELOPE IS WAITING</div>
              <div className="mt-3 font-[var(--font-playfair)] text-2xl">Tap to open</div>
              <button
                type="button"
                onClick={() => {
                  setDone(false);
                  setOpened(true);
                }}
                className="mt-6 rounded-full bg-white/10 px-6 py-3 font-[var(--font-inter)] text-sm text-white hover:bg-white/15"
              >
                Open
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="candle">
                  <div className="candle-flame" />
                  <div className="candle-body" />
                </div>
                <div className="w-full pl-6">
                  <ProgressBar current={unlockedCount} total={total} />
                </div>
              </div>

              <TypingReveal
                text={content}
                onDone={() => {
                  setDone(true);
                }}
              />

              {done ? (
                <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="font-[var(--font-playfair)] text-2xl">Good night ❤️</div>
                  <Link
                    href="/letters"
                    className="inline-flex w-full max-w-md items-center justify-center rounded-full bg-white/10 px-5 py-3 font-[var(--font-inter)] text-sm text-white hover:bg-white/15"
                  >
                    Close & Sleep
                  </Link>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
