export type LetterMedia = {
  image: string | null;
  song: string | null;
  video: string | null;
};

export type Letter = {
  day: number;
  title: string;
  unlockAt: string;
  content: string;
  media: LetterMedia;
};

export const allLetters: Letter[] = [
  {
    day: 1,
    title: "First Time we Talked",
    unlockAt: "2026-01-18T18:30:00Z",
    content:
      "Tonight, I’m taking you back to the moment we became real.\n\nNot perfect. Not planned. Just… ours.\n\nIf you’re reading this at midnight, it means you kept your promise: you came back.\n\nGood night ❤️",
    media: { image: null, song: null, video: null }
  },
  {
    day: 2,
    title: "Things I Fell in Love With",
    unlockAt: "2026-01-19T18:30:00Z",
    content:
      "There are a thousand small reasons.\n\nSome are loud. Most are quiet.\n\nTonight I’ll tell you the quiet ones.\n\nGood night ❤️",
    media: { image: null, song: null, video: null }
  },
  {
    day: 3,
    title: "Us Through Struggles",
    unlockAt: "2026-01-20T18:30:00Z",
    content:
      "Not every day was soft.\n\nBut even when it rained, we kept choosing each other.\n\nIf you ever doubt us, remember: we survived the storm.\n\nGood night ❤️",
    media: { image: null, song: null, video: null }
  },
  {
    day: 4,
    title: "Promises I Never Said Out Loud",
    unlockAt: "2026-01-21T18:30:00Z",
    content:
      "I don’t say everything when I should.\n\nSo tonight I’ll say it slowly, one line at a time.\n\nI’m here. I’m staying. I’m choosing you.\n\nGood night ❤️",
    media: { image: null, song: null, video: null }
  },
  {
    day: 5,
    title: "What You Mean to Me Today",
    unlockAt: "2026-01-22T18:30:00Z",
    content:
      "Some love is a memory.\n\nBut ours is also a present tense.\n\nTonight I want you to feel how much you matter, right now.\n\nGood night ❤️",
    media: { image: null, song: null, video: null }
  },
  {
    day: 6,
    title: "Kaho Na Pyaar Hai",
    unlockAt: "2026-01-23T18:30:00Z",
    content:
      "Close your eyes for a second.\n\nPicture the version of us that made it.\n\nI want to build that world with you.\n\nGood night ❤️",
    media: { image: null, song: null, video: null }
  },
  {
    day: 7,
    title: "The Day We Became Us",
    unlockAt: "2026-01-24T18:30:00Z",
    content:
      "If you’ve reached the last night, it means you walked with me through every feeling.\n\nTonight, everything is gold.\n\nOne last thing is waiting for you.\n\nGood night ❤️",
    media: { image: null, song: null, video: null }
  }
];

export type LetterForHub = Pick<Letter, "day" | "title" | "unlockAt" | "media"> & {
  unlocked: boolean;
};

export function getLettersForHub(now: Date): LetterForHub[] {
  return allLetters.map((l) => ({
    day: l.day,
    title: l.title,
    unlockAt: l.unlockAt,
    media: l.media,
    unlocked: now.getTime() >= new Date(l.unlockAt).getTime()
  }));
}

export function getNextUnlockAt(now: Date): Date | null {
  const upcoming = allLetters
    .map((l) => new Date(l.unlockAt))
    .filter((d) => d.getTime() > now.getTime())
    .sort((a, b) => a.getTime() - b.getTime());

  return upcoming.length ? upcoming[0] : null;
}

export function getLetterByDay(day: number): Letter | null {
  const found = allLetters.find((l) => l.day === day);
  return found ?? null;
}
