import { getMoonPhase } from "@/lib/moon";

export async function GET() {
  const now = new Date();
  const phase = getMoonPhase(now);
  return Response.json({ now: now.toISOString(), phase });
}
