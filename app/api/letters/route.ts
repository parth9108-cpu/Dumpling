import { getLettersForHub } from "@/lib/letters";

export async function GET() {
  const now = new Date();
  const letters = getLettersForHub(now);
  return Response.json({ now: now.toISOString(), letters });
}
