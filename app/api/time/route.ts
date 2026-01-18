import { getNextUnlockAt } from "@/lib/letters";

export async function GET() {
  const now = new Date();
  const next = getNextUnlockAt(now);

  return Response.json({
    now: now.toISOString(),
    nextUnlockAt: next ? next.toISOString() : null
  });
}
