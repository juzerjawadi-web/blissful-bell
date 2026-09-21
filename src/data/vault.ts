export type VaultMood = "Tender" | "Passionate" | "Melancholic" | "Hopeful" | "Devastating" | "Comforting" | "Falling" | "Longing" | "Forever" | "Heartbreak" | "Midnight";
export type VaultEra = "Classic" | "Vintage" | "Modern" | "Contemporary";
export type BookFormat = "Novel" | "Poetry" | "Letters" | "Short Story" | "Diary";

export interface LoveBook {
  id: string;
  title: string;
  author: string;
  category: "Classic Romance" | "Modern Romance" | "Tragic Love" | "Slow Burn" | "Young Love" | "Forbidden Love" | "Letters & Diaries" | "Poetry" | "Short Stories" | "Love & Philosophy";
  moods: VaultMood[];
  era: VaultEra;
  format: BookFormat;
  description: string;
  excerpt?: string;
  cover?: string;
  embedUrl?: string;
  hearts: number;
}

export interface LoveSong {
  id: string;
  title: string;
  artist: string;
  moodCategory: "WHEN YOU MISS THEM" | "WHEN YOU'RE FALLING" | "MIDNIGHT LOVE" | "OLD LOVE" | "HAPPY LOVE" | "HEARTBREAK" | "FOREVER";
  description: string;
  cover?: string;
  embedUrl?: string; // e.g. Spotify embed link
}

export interface LovePoem {
  id: string;
  lines: string[];
  author: string;
}

export interface LoveLetter {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const BOOKS: LoveBook[] = [
  {
    id: "b1",
    title: "Pride & Prejudice",
    author: "Jane Austen",
    category: "Classic Romance",
    moods: ["Hopeful", "Comforting"],
    era: "Classic",
    format: "Novel",
    description: "A story about two people learning that love sometimes hides behind first impressions.",
    excerpt: "In vain have I struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.",
    embedUrl: "https://www.youtube.com/embed/nXVBjrFTZ9Y?autoplay=1",
    hearts: 2400
  },
  {
    id: "b2",
    title: "The Notebook",
    author: "Nicholas Sparks",
    category: "Modern Romance",
    moods: ["Passionate", "Devastating"],
    era: "Contemporary",
    format: "Novel",
    description: "A love remembered across a lifetime.",
    excerpt: "I am nothing special, of this I am sure. I am a common man with common thoughts... but I've loved another with all my heart and soul, and to me, this has always been enough.",
    embedUrl: "https://www.youtube.com/embed/xKDyf1T6ygw?autoplay=1",
    hearts: 3100
  },
  {
    id: "b3",
    title: "Letters to Milena",
    author: "Franz Kafka",
    category: "Letters & Diaries",
    moods: ["Melancholic", "Longing"],
    era: "Classic",
    format: "Letters",
    description: "The raw, obsessive, beautiful letters of a man deeply in love.",
    excerpt: "I am tired, can't think of anything and want only to lay my face in your lap, feel your hand on my head and remain like that through all eternity.",
    hearts: 1800
  }
];

export const SONGS: LoveSong[] = [
  {
    id: "s1",
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    moodCategory: "WHEN YOU'RE FALLING",
    description: "For the moments when one person suddenly feels like home.",
    embedUrl: "https://www.youtube.com/embed/4BnLL8KYasU?autoplay=1"
  },
  {
    id: "s2",
    title: "Sparks",
    artist: "Coldplay",
    moodCategory: "WHEN YOU MISS THEM",
    description: "I wish you were here.",
    embedUrl: "https://www.youtube.com/embed/xno6lesVMJc?autoplay=1"
  },
  {
    id: "s3",
    title: "Lover",
    artist: "Taylor Swift",
    moodCategory: "HAPPY LOVE",
    description: "For the days when everything feels right.",
    embedUrl: "https://www.youtube.com/embed/-BjZmE2gtdo?autoplay=1"
  },
  {
    id: "s4",
    title: "The Night We Met",
    artist: "Lord Huron",
    moodCategory: "HEARTBREAK",
    description: "For the love that didn't stay.",
    embedUrl: "https://www.youtube.com/embed/kU7J9_u4a3U?autoplay=1"
  }
];

export const POEMS: LovePoem[] = [
  {
    id: "p1",
    lines: [
      "I would find you",
      "in every lifetime."
    ],
    author: "Love, somewhere between memory and forever"
  },
  {
    id: "p2",
    lines: [
      "If I had a flower for every time I thought of you...",
      "I could walk through my garden forever."
    ],
    author: "Alfred Tennyson"
  },
  {
    id: "p3",
    lines: [
      "You are the poem",
      "I never knew how to write."
    ],
    author: "Unknown"
  }
];

export const LETTERS: LoveLetter[] = [
  {
    id: "l1",
    title: "To the person I never stopped thinking about",
    description: "I don't know if you'll ever read this...",
    content: "There is a quiet space in my mind where I still talk to you. Sometimes about my day, sometimes about a song I heard. I hope you're happy wherever you are."
  },
  {
    id: "l2",
    title: "To the one I miss",
    description: "There are certain hours of the day that belong to you...",
    content: "2:00 PM when the sun hits the desk. 11:00 PM when the house goes quiet. I miss you in the most ordinary moments."
  },
  {
    id: "l3",
    title: "To my future love",
    description: "I haven't met you yet, but...",
    content: "I am saving up all my favorite stories to tell you. I hope you like coffee, and I hope you have kind eyes."
  }
];
