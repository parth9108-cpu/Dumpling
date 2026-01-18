import Link from "next/link";
import Starfield from "@/components/Starfield";
import ServerSyncedCountdown from "@/components/ServerSyncedCountdown";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      <Starfield />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="font-[var(--font-inter)] text-sm tracking-[0.24em] text-white/70">
          EVERY NIGHT
        </p>
        <h1 className="mt-4 font-[var(--font-playfair)] text-4xl leading-tight sm:text-5xl">
          Every night at 12, a letter from my heart finds you.
        </h1>
        <p className="mt-6 font-[var(--font-inter)] text-base leading-relaxed text-white/80">
          Stay a little. Let the sky soften. When the countdown ends, an envelope will glow.
        </p>

        <div className="mt-10 w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <ServerSyncedCountdown />
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            href="/letters"
            className="rounded-full bg-white/10 px-6 py-3 font-[var(--font-inter)] text-sm tracking-wide text-white hover:bg-white/15"
          >
            Enter the letter room
          </Link>
          <p className="font-[var(--font-inter)] text-xs text-white/60">
            The lock uses server time. No shortcuts.
          </p>
        </div>
      </div>
    </main>
  );
}
