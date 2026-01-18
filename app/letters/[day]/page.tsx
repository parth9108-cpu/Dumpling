import Link from "next/link";
import Starfield from "@/components/Starfield";
import ServerSyncedCountdown from "@/components/ServerSyncedCountdown";
import LetterExperienceClient from "@/components/LetterExperienceClient";
import { getLetterByDay, getLettersForHub } from "@/lib/letters";

export const dynamic = "force-dynamic";

export default function LetterPage({ params }: { params: { day: string } }) {
  const day = Number(params.day);
  const letter = Number.isFinite(day) ? getLetterByDay(day) : null;

  if (!letter) {
    return (
      <main className="relative min-h-screen">
        <Starfield />
        <div className="relative mx-auto max-w-2xl px-6 py-16">
          <h1 className="font-[var(--font-playfair)] text-3xl">That letter doesn’t exist.</h1>
          <Link href="/letters" className="mt-6 inline-block text-white/70 hover:text-white">
            Back to envelopes
          </Link>
        </div>
      </main>
    );
  }

  const now = new Date();
  const letters = getLettersForHub(now);
  const unlockedCount = letters.filter((l) => l.unlocked).length;
  const unlocked = now.getTime() >= new Date(letter.unlockAt).getTime();

  if (!unlocked) {
    return (
      <main className="relative min-h-screen">
        <Starfield />
        <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
          <p className="font-[var(--font-inter)] text-xs tracking-[0.24em] text-white/60">SEALED</p>
          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl">Come back at midnight 🌙</h1>
          <p className="mt-4 font-[var(--font-inter)] text-sm text-white/70">
            This envelope opens when the server clock says it’s time.
          </p>
          <div className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <ServerSyncedCountdown />
          </div>
          <Link
            href="/letters"
            className="mt-8 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-[var(--font-inter)] text-sm text-white/80 hover:bg-white/10"
          >
            Back to envelopes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <LetterExperienceClient
      day={letter.day}
      title={letter.title}
      content={letter.content}
      unlockedCount={unlockedCount}
      total={letters.length}
    />
  );
}
