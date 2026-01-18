export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total <= 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between font-[var(--font-inter)] text-xs text-white/70">
        <span>Progress</span>
        <span>
          {current} / {total} memories unlocked
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-white/30" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
