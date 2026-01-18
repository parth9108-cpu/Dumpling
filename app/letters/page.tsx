import Link from "next/link";
import Starfield from "@/components/Starfield";
import EnvelopeGridClient from "@/components/EnvelopeGridClient";
import { getLettersForHub } from "@/lib/letters";

export const dynamic = "force-dynamic";

export default function LettersHubPage() {
  const now = new Date();
  const letters = getLettersForHub(now);

  return (
    <main className="relative min-h-screen">
      <Starfield />
      <div className="relative mx-auto max-w-5xl px-6 py-14">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="font-[var(--font-inter)] text-xs tracking-[0.24em] text-white/60">LETTER HUB</p>
            <h1 className="mt-3 font-[var(--font-playfair)] text-4xl">The Envelopes</h1>
            <p className="mt-3 font-[var(--font-inter)] text-sm text-white/70">
              Some are sealed. Some are waiting for you.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-[var(--font-inter)] text-xs text-white/80 hover:bg-white/10"
          >
            Back
          </Link>
        </div>

        <EnvelopeGridClient letters={letters} />
      </div>
    </main>
  );
}
