"use client";

import { motion } from "framer-motion";
import { Lock, MailOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type LetterForHub = {
  day: number;
  title: string;
  unlockAt: string;
  media: { image: string | null; song: string | null; video: string | null };
  unlocked: boolean;
};

type Props = {
  letters: LetterForHub[];
};

function storageKey(day: number) {
  return `opened_day_${day}`;
}

export default function EnvelopeGridClient({ letters }: Props) {
  const router = useRouter();
  const [openedDays, setOpenedDays] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const opened = new Set<number>();
    for (const l of letters) {
      try {
        if (localStorage.getItem(storageKey(l.day)) === "1") opened.add(l.day);
      } catch {
      }
    }
    setOpenedDays(opened);
  }, [letters]);

  const unlockedCount = useMemo(() => letters.filter((l) => l.unlocked).length, [letters]);

  return (
    <div className="w-full">
      {message ? (
        <div className="mb-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-[var(--font-inter)] text-sm text-white/80 backdrop-blur">
          {message}
        </div>
      ) : null}

      <div className="mb-6 font-[var(--font-inter)] text-sm text-white/70">
        {unlockedCount} / {letters.length} memories unlocked
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {letters.map((l) => {
          const opened = openedDays.has(l.day);
          const locked = !l.unlocked;

          return (
            <motion.button
              key={l.day}
              whileHover={locked ? undefined : { scale: 1.02 }}
              whileTap={locked ? undefined : { scale: 0.99 }}
              onClick={() => {
                if (locked) {
                  setMessage("Come back at midnight 🌙");
                  return;
                }
                router.push(`/letters/${l.day}`);
              }}
              className={`group relative w-full overflow-hidden rounded-2xl border px-5 py-5 text-left backdrop-blur transition ${
                locked
                  ? "cursor-not-allowed border-white/10 bg-black/20 opacity-75"
                  : opened
                    ? "border-amber-200/30 bg-white/10"
                    : "border-violet-200/25 bg-white/10"
              }`}
            >
              {!locked ? (
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -inset-24 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl" />
                </div>
              ) : null}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-[var(--font-inter)] text-xs tracking-[0.22em] text-white/55">
                    DAY {l.day}
                  </div>
                  <div className="mt-2 font-[var(--font-playfair)] text-xl text-white/90">{l.title}</div>
                </div>

                <div
                  className={`mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border ${
                    locked
                      ? "border-white/10 bg-black/20"
                      : "border-violet-200/25 bg-violet-200/10"
                  }`}
                >
                  {locked ? <Lock className="h-5 w-5 text-white/70" /> : <MailOpen className="h-5 w-5 text-white/80" />}
                </div>
              </div>

              <div className="mt-4 font-[var(--font-inter)] text-xs text-white/60">
                {locked ? "Locked" : opened ? "Opened" : "Unlocked"}
              </div>

              {!locked ? (
                <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 rounded-full bg-white/25 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
              ) : null}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
