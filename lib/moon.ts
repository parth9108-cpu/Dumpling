export type MoonPhase = {
  index: number;
  name: string;
  illumination: number;
};

const phaseNames = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent"
];

export function getMoonPhase(date: Date): MoonPhase {
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14, 0);
  const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000;

  const daysSince = date.getTime() - knownNewMoon;
  const phase = ((daysSince % synodicMonth) + synodicMonth) % synodicMonth;
  const phaseFraction = phase / synodicMonth;

  const index = Math.floor(phaseFraction * 8) % 8;

  const illumination = 0.5 * (1 - Math.cos(2 * Math.PI * phaseFraction));

  return {
    index,
    name: phaseNames[index] ?? "Moon",
    illumination
  };
}
