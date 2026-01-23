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
      "Tonight, I’m taking you back to the moment we became real.\n\nNot perfect.\nNot planned.\nJust… ours.\n\nIf you’re reading this at midnight, it means you kept your promise — you came back.\n\nIt all started so simply.\nSliding into your DMs by sending a reel.\nThat was the first time I messaged you.\n\nI was nervous.\nSo nervous that I deleted it from my side.\nBut somehow, we still ended up talking.\nAnd talking.\nAnd then talking every day.\n\nNew Year’s Eve.\nMessages turning into moments.\nAnd then… meeting you for the first time.\n\nIt was a whole new experience.\nUnplanned.\nUnexpected.\nBut unforgettable.\n\nTalking to you feels different.\nThere’s a calm.\nA kind of peace.\nSomething that just feels right.\n\nWe talked about everything.\nFrom YOU and ME… to US.\nFrom Snehal… to bachaa.\nFrom small conversations to big feelings.\nSo many things.\n\nI know you’re waiting for the 25th.\nBut wait.\nIt’s going to be the sweetest day, love.\n\nGood night ❤️\n✨🎆",
    media: { image: "love1.jpeg, love2.jpeg", song: null, video: null }
  },
  {
    day: 2,
    title: "Things I Fell in Love With",
    unlockAt: "2026-01-19T18:30:00Z",
    content:
      "Tonight, I’m taking you back to the moment we became real.\n\nNot perfect.\nNot planned.\nJust… ours.\n\nIf you’re reading this at midnight, it means you kept your promise.\nYou came back.\n\nI fell for you — for your English,\nthe way you carry yourself,\nyour confidence.\nSo good.\nSo cute.\nSo intelligent.\nPerfect, my dear love.\n\nBut honestly, I fell even harder for you in the quiet moments —\nwhen I saw the stars and the letter you gave me,\nwhen you took me to the movies when I felt low,\nwhen you took me on dates,\nand when I met an innocent girl\nwho never showed the world who she really was,\nbut showed everything to me.\n\nI love you.\n\n(memories)\n\nWait for the 25th, my dear love.\n\nGood night ❤️",
    media: { image: null, song: null, video: null }
  },
  {
    day: 3,
    title: "Us Through Struggles",
    unlockAt: "2026-01-20T18:30:00Z",
    content:
      "Tonight, I’m taking you back to the moment we became real.\n\nperfect. Not planned. Just… ours.\n\nIf you’re reading this at midnight, it means you kept your promise — you came back.\n\nI know we’ve been through a lot. So many struggles, so many ups and downs… and honestly, more downs.\n\nI know I made you feel bad at times. I know there were trust issues, tears, and moments where everything felt heavy.\n\nBut still — we found our way back to each other. Every single time.\n\nThat’s because our bond is pure. Our love is pure. And you… you are pure, my baby girl.\n\nI love you so much, Dumpling. One whole year passed and I don’t even know how it went by.\n\nI remember the crying streaks, the pain, the silence — and yet, after every struggle, we chose each other again.\nNot every day was soft.\n\nBut even when it rained, we kept choosing each other.\n\nIf you ever doubt us, remember: we survived the storm.\n\nToodles\n\nGood night ❤️\n\nWait for the 25th.\n\n(No hints today — just go and open the window.)",
    media: { image: null, song: null, video: null }
  },
  
  {
    day: 5,
    title: "What You Mean to Me Today",
    unlockAt: "2026-01-22T18:30:00Z",
    content:
      "Tonight, I’m taking you back to the moment we became real.\n\n Perfect. Not planned. Just… ours.\n\nIf you’re reading this at midnight, it means you kept your promise: you came back.\n\nWhat you mean to me today is way beyond anything — like the moon with its stars, like the sun with its sunlight, like Tony with Pepper, like a soul with a heart. You mean so much to me. And you know what? It’s going to be a year as we’ll be together on the 25th, and we’ll be so happy. Mwah!\n\nToday, you mean peace to me — the kind that quiets my mind without saying a word.\nYou mean home, even on days when the world feels unfamiliar.\nRight now, you’re my reminder that love doesn’t have to be loud to be real.\nToday, you mean stability — the calm I didn’t know I needed.\n\nToday, you mean my favorite thought.\nYou mean the smile that comes without effort.\nRight now, you mean more than words can explain and less than promises need.\nYou mean something real in a world that often isn’t.\n\nHeheh, this is what we are — love!!\nWait for the 25th, mwahhh 💕\nToodles 🌙",
    media: { image: null, song: null, video: null }
  },
  {
    day: 6,
    title: "Kaho Na Pyaar Hai",
    unlockAt: "2026-01-23T18:30:00Z",
    content:
      "Tonight, I’m taking you back to the moment we became real.\n\nNot perfect. Not planned. Just… ours.\n\nIf you’re reading this at midnight, it means you kept your promise: you came back.\n\nGood night ❤️\n\nKaho na pyaar hai!! yaad hai? kitni khush thi tu! such a big smile on your face damnnn!!\n\nThat day we both were so bright like couples!!\n\nAnd tbh sorry for that fight but i remember more about us being so happy and holding hands, we were singing on all songs of that movie and then saying “so cool song” and all!!\n\nI remember it all!\n\nBut the BEST PART:\nKAHO NA PYAAR HAI!!\nAND YOU SAID YES!!!!\n\nWas never fading from my memories ever!\n\nI love you shoo much!!\n\nThen we went to cafe gypsy and ate so much food and cocktails and kissed heheh!!\n\nI love you baby!!\n\nWait for 25th mwahhh\n\nToodles 💕",
    media: { image: null, song: null, video: null }
  },
  {
    day: 7,
    title: "The Day We Became Us",
    unlockAt: "2026-01-25T18:30:00Z",
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
