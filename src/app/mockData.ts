export interface Artist {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  following: number;
  totalLikes: number;
  totalDrawings: number;
  bio: string;
  categories: string[];
  badge?: "legend" | "rising" | "champion";
  isFollowing?: boolean;
}

export interface Drawing {
  id: string;
  title: string;
  image: string;
  artist: Artist;
  likes: number;
  comments: number;
  views: number;
  category: string;
  hashtags: string[];
  createdAt: string;
  isLiked?: boolean;
  isFeatured?: boolean;
  description?: string;
  challengeId?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  theme: string;
  challenger: Artist;
  challengee?: Artist;
  challengerDrawing?: Drawing;
  challengeeDrawing?: Drawing;
  status: "open" | "active" | "voting" | "completed";
  votes?: { challenger: number; challengee: number };
  endsAt: string;
  category: string;
  participants?: number;
  prize?: string;
  coverImage?: string;
}

export const artists: Artist[] = [
  {
    id: "a1",
    name: "Yuki Tanaka",
    username: "@yukiart",
    avatar: "https://images.unsplash.com/photo-1624091844772-554661d10173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 128400,
    following: 342,
    totalLikes: 984200,
    totalDrawings: 312,
    bio: "Anime & manga artist from Tokyo. Bringing characters to life one stroke at a time.",
    categories: ["Anime", "Manga", "Fantasy"],
    badge: "legend",
    isFollowing: false,
  },
  {
    id: "a2",
    name: "Marcus Webb",
    username: "@marcuswebb",
    avatar: "https://images.unsplash.com/photo-1584598788787-e6ce5159df0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 87600,
    following: 210,
    totalLikes: 654300,
    totalDrawings: 198,
    bio: "Digital concept artist. I love dragons, warriors and all things epic.",
    categories: ["Fantasy", "Concept Art", "Portrait"],
    badge: "champion",
    isFollowing: true,
  },
  {
    id: "a3",
    name: "Amara Osei",
    username: "@amaracreates",
    avatar: "https://images.unsplash.com/photo-1763244737829-5e987d40228c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 54300,
    following: 180,
    totalLikes: 421000,
    totalDrawings: 143,
    bio: "Illustrator & watercolor artist. Nature is my biggest inspiration.",
    categories: ["Watercolor", "Nature", "Landscape"],
    badge: "rising",
    isFollowing: false,
  },
  {
    id: "a4",
    name: "Leon Hoffmann",
    username: "@leonhoff",
    avatar: "https://images.unsplash.com/photo-1561137832-10d27c2957a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 41200,
    following: 95,
    totalLikes: 318000,
    totalDrawings: 87,
    bio: "Portrait and sketch artist. Charcoal is my favorite medium.",
    categories: ["Portrait", "Sketch", "Realism"],
    isFollowing: false,
  },
  {
    id: "a5",
    name: "Sakura Mitsui",
    username: "@sakura_draws",
    avatar: "https://images.unsplash.com/photo-1624091844772-554661d10173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 196000,
    following: 400,
    totalLikes: 1200000,
    totalDrawings: 456,
    bio: "Kawaii & chibi specialist. Making the world cuter, one drawing at a time! ✨",
    categories: ["Anime", "Kawaii", "Chibi"],
    badge: "legend",
    isFollowing: true,
  },
  {
    id: "a6",
    name: "Dex Ramirez",
    username: "@dexart",
    avatar: "https://images.unsplash.com/photo-1584598788787-e6ce5159df0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 32100,
    following: 130,
    totalLikes: 248000,
    totalDrawings: 74,
    bio: "Sci-fi and cyberpunk digital artist. The future is neon.",
    categories: ["Sci-Fi", "Cyberpunk", "Abstract"],
    badge: "rising",
    isFollowing: false,
  },
];

export const drawings: Drawing[] = [
  {
    id: "d1",
    title: "Sakura Spirit",
    image: "https://images.unsplash.com/photo-1653723367970-ae966c1b803e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[0],
    likes: 48200,
    comments: 1820,
    views: 284000,
    category: "Anime",
    hashtags: ["anime", "sakura", "digitalart", "characterdesign"],
    createdAt: "2026-03-03",
    isLiked: false,
    isFeatured: true,
    description: "A spirit guardian inspired by Japanese cherry blossom mythology. Drew this for the spring challenge!",
  },
  {
    id: "d2",
    title: "Dragon's Lair",
    image: "https://images.unsplash.com/photo-1610308700652-d931026f7eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[1],
    likes: 36700,
    comments: 1240,
    views: 198000,
    category: "Fantasy",
    hashtags: ["fantasy", "dragon", "epicart", "conceptart"],
    createdAt: "2026-03-02",
    isLiked: true,
    isFeatured: true,
    description: "An ancient dragon guarding its treasure hoard. Created for the Fantasy Challenge.",
    challengeId: "c1",
  },
  {
    id: "d3",
    title: "Autumn Serenity",
    image: "https://images.unsplash.com/photo-1694637110471-c1ffc862dd67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[2],
    likes: 29100,
    comments: 890,
    views: 142000,
    category: "Landscape",
    hashtags: ["watercolor", "landscape", "autumn", "nature"],
    createdAt: "2026-03-01",
    isLiked: false,
    description: "Watercolor study of a mountain valley in autumn.",
  },
  {
    id: "d4",
    title: "The Last Warrior",
    image: "https://images.unsplash.com/photo-1694097678130-cb60c8f538ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[1],
    likes: 52400,
    comments: 2100,
    views: 320000,
    category: "Fantasy",
    hashtags: ["darkfantasy", "warrior", "epicart", "characterdesign"],
    createdAt: "2026-02-28",
    isLiked: false,
    isFeatured: true,
    challengeId: "c2",
  },
  {
    id: "d5",
    title: "Kawaii Dream",
    image: "https://images.unsplash.com/photo-1611083880744-f566ce727615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[4],
    likes: 71000,
    comments: 3200,
    views: 510000,
    category: "Anime",
    hashtags: ["kawaii", "anime", "cute", "chibi"],
    createdAt: "2026-03-04",
    isLiked: true,
    isFeatured: true,
    description: "My entry for the Kawaii Challenge 2026! Dreamy pastel vibes ✨",
  },
  {
    id: "d6",
    title: "Galaxy Mind",
    image: "https://images.unsplash.com/photo-1762441112136-4dfc6edf58e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[5],
    likes: 23800,
    comments: 760,
    views: 134000,
    category: "Sci-Fi",
    hashtags: ["scifi", "space", "galaxy", "digitalart"],
    createdAt: "2026-03-03",
    isLiked: false,
  },
  {
    id: "d7",
    title: "Forest Whisper",
    image: "https://images.unsplash.com/photo-1770034285769-4a5a3f410346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[2],
    likes: 31200,
    comments: 980,
    views: 178000,
    category: "Nature",
    hashtags: ["forest", "nature", "magical", "illustration"],
    createdAt: "2026-02-27",
    isLiked: false,
    isFeatured: true,
  },
  {
    id: "d8",
    title: "Manga Vibes",
    image: "https://images.unsplash.com/photo-1763732397953-7866a2dd8289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[0],
    likes: 44500,
    comments: 1600,
    views: 265000,
    category: "Manga",
    hashtags: ["manga", "anime", "blackwhite", "comicstyle"],
    createdAt: "2026-03-04",
    isLiked: false,
    isFeatured: true,
  },
  {
    id: "d9",
    title: "Abstract Pulse",
    image: "https://images.unsplash.com/photo-1713188090500-a4fb0d2cf309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[5],
    likes: 18300,
    comments: 540,
    views: 96000,
    category: "Abstract",
    hashtags: ["abstract", "colorful", "digitalart", "generative"],
    createdAt: "2026-03-02",
    isLiked: false,
  },
  {
    id: "d10",
    title: "City Sketch",
    image: "https://images.unsplash.com/photo-1763063356848-1a0adfcb2f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[3],
    likes: 14700,
    comments: 420,
    views: 78000,
    category: "Architecture",
    hashtags: ["sketch", "architecture", "urban", "cityscape"],
    createdAt: "2026-03-01",
    isLiked: false,
  },
  {
    id: "d11",
    title: "Floral Bliss",
    image: "https://images.unsplash.com/photo-1583243553028-e4001cb6dd77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[2],
    likes: 27600,
    comments: 810,
    views: 156000,
    category: "Watercolor",
    hashtags: ["floral", "watercolor", "botanical", "nature"],
    createdAt: "2026-02-26",
    isLiked: false,
  },
  {
    id: "d12",
    title: "Neon Dystopia",
    image: "https://images.unsplash.com/photo-1601908136178-c5225bdc60f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[5],
    likes: 39800,
    comments: 1380,
    views: 243000,
    category: "Sci-Fi",
    hashtags: ["cyberpunk", "neon", "scifi", "futuristic"],
    createdAt: "2026-03-04",
    isLiked: true,
    isFeatured: true,
    challengeId: "c3",
  },
  {
    id: "d13",
    title: "Portrait Study #7",
    image: "https://images.unsplash.com/photo-1758521232708-d738b0eaa94a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[3],
    likes: 21400,
    comments: 670,
    views: 118000,
    category: "Portrait",
    hashtags: ["portrait", "realism", "sketch", "charcoal"],
    createdAt: "2026-02-25",
    isLiked: false,
  },
  {
    id: "d14",
    title: "Sunset on the Horizon",
    image: "https://images.unsplash.com/photo-1641224656166-f3c82d737efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[2],
    likes: 33900,
    comments: 1050,
    views: 201000,
    category: "Landscape",
    hashtags: ["sunset", "ocean", "landscape", "digitalpainting"],
    createdAt: "2026-02-24",
    isLiked: false,
    isFeatured: true,
  },
  {
    id: "d15",
    title: "Cute Companions",
    image: "https://images.unsplash.com/photo-1633012252204-fa9f5873abf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[4],
    likes: 58200,
    comments: 2600,
    views: 380000,
    category: "Anime",
    hashtags: ["cute", "animals", "kawaii", "illustration"],
    createdAt: "2026-03-03",
    isLiked: false,
    isFeatured: true,
  },
  {
    id: "d16",
    title: "Bird of Paradise",
    image: "https://images.unsplash.com/photo-1763243518738-6388419701c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    artist: artists[2],
    likes: 25400,
    comments: 720,
    views: 148000,
    category: "Nature",
    hashtags: ["bird", "nature", "illustration", "colorful"],
    createdAt: "2026-02-23",
    isLiked: false,
  },
];

export const challenges: Challenge[] = [
  {
    id: "c1",
    title: "Dragon Masters",
    description: "Who can paint the most legendary dragon? The community votes for the champion!",
    theme: "Fantasy Dragons",
    challenger: artists[1],
    challengee: artists[0],
    challengerDrawing: drawings[1],
    status: "voting",
    votes: { challenger: 12840, challengee: 9620 },
    endsAt: "2026-03-07",
    category: "Fantasy",
    prize: "Hall of Fame Badge",
    coverImage: "https://images.unsplash.com/photo-1610308700652-d931026f7eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  },
  {
    id: "c2",
    title: "Dark Fantasy Showdown",
    description: "Epic warriors, dark knights, and fallen heroes. Show us your best dark fantasy creation.",
    theme: "Dark Fantasy",
    challenger: artists[1],
    challengee: artists[3],
    challengerDrawing: drawings[3],
    status: "active",
    votes: { challenger: 0, challengee: 0 },
    endsAt: "2026-03-10",
    category: "Fantasy",
    participants: 2,
    coverImage: "https://images.unsplash.com/photo-1694097678130-cb60c8f538ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  },
  {
    id: "c3",
    title: "Cyberpunk City Battle",
    description: "Neon lights, rain-soaked streets, and dystopian futures. Design the best cyberpunk cityscape!",
    theme: "Cyberpunk",
    challenger: artists[5],
    status: "open",
    votes: { challenger: 0, challengee: 0 },
    endsAt: "2026-03-12",
    category: "Sci-Fi",
    participants: 1,
    coverImage: "https://images.unsplash.com/photo-1601908136178-c5225bdc60f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  },
  {
    id: "c4",
    title: "Spring Blossom Anime",
    description: "Celebrate spring with an anime-style drawing featuring cherry blossoms or spring themes.",
    theme: "Spring / Sakura",
    challenger: artists[0],
    challengee: artists[4],
    challengerDrawing: drawings[0],
    challengeeDrawing: drawings[4],
    status: "completed",
    votes: { challenger: 8320, challengee: 24650 },
    endsAt: "2026-03-01",
    category: "Anime",
    prize: "Champion Badge",
    coverImage: "https://images.unsplash.com/photo-1611083880744-f566ce727615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  },
  {
    id: "c5",
    title: "Kawaii Creatures",
    description: "Design the cutest original creature that deserves its own anime series!",
    theme: "Kawaii Originals",
    challenger: artists[4],
    status: "open",
    votes: { challenger: 0, challengee: 0 },
    endsAt: "2026-03-15",
    category: "Anime",
    participants: 1,
    coverImage: "https://images.unsplash.com/photo-1633012252204-fa9f5873abf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  },
  {
    id: "c6",
    title: "Ocean Dreamscape",
    description: "Paint the most breathtaking ocean or underwater scene. Realism, fantasy, or anime style welcome!",
    theme: "Ocean / Water",
    challenger: artists[2],
    challengee: artists[3],
    challengerDrawing: drawings[13],
    status: "voting",
    votes: { challenger: 7100, challengee: 5800 },
    endsAt: "2026-03-08",
    category: "Landscape",
    coverImage: "https://images.unsplash.com/photo-1641224656166-f3c82d737efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  },
];

export const trendingHashtags = [
  { tag: "anime", count: 284000, color: "from-pink-500 to-rose-500" },
  { tag: "kawaii", count: 198000, color: "from-purple-500 to-pink-500" },
  { tag: "fantasy", count: 176000, color: "from-indigo-500 to-purple-500" },
  { tag: "digitalart", count: 154000, color: "from-blue-500 to-cyan-500" },
  { tag: "cyberpunk", count: 132000, color: "from-cyan-500 to-teal-500" },
  { tag: "watercolor", count: 118000, color: "from-emerald-500 to-teal-500" },
  { tag: "portrait", count: 96000, color: "from-amber-500 to-orange-500" },
  { tag: "landscape", count: 87000, color: "from-green-500 to-emerald-500" },
  { tag: "sketch", count: 74000, color: "from-gray-500 to-slate-500" },
  { tag: "manga", count: 68000, color: "from-red-500 to-rose-500" },
  { tag: "scifi", count: 62000, color: "from-sky-500 to-blue-500" },
  { tag: "chibi", count: 54000, color: "from-violet-500 to-purple-500" },
];

export const categories = [
  { id: "anime", label: "Anime", emoji: "🎌", count: 284000 },
  { id: "fantasy", label: "Fantasy", emoji: "🐉", count: 176000 },
  { id: "manga", label: "Manga", emoji: "📖", count: 148000 },
  { id: "landscape", label: "Landscape", emoji: "🏔️", count: 134000 },
  { id: "portrait", label: "Portrait", emoji: "🎭", count: 118000 },
  { id: "abstract", label: "Abstract", emoji: "🎨", count: 96000 },
  { id: "scifi", label: "Sci-Fi", emoji: "🚀", count: 88000 },
  { id: "watercolor", label: "Watercolor", emoji: "💧", count: 82000 },
  { id: "sketch", label: "Sketch", emoji: "✏️", count: 74000 },
  { id: "nature", label: "Nature", emoji: "🌿", count: 68000 },
  { id: "chibi", label: "Chibi", emoji: "✨", count: 64000 },
  { id: "architecture", label: "Architecture", emoji: "🏙️", count: 42000 },
];

export const hallOfFame: Drawing[] = [
  drawings[4],
  drawings[3],
  drawings[14],
  drawings[7],
  drawings[1],
  drawings[13],
];

export function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

export function timeAgo(dateStr: string): string {
  const now = new Date("2026-03-04");
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff}d ago`;
  return `${Math.floor(diff / 7)}w ago`;
}
