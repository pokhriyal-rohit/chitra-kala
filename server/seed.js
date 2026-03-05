const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("./config/db");
const User = require("./models/User");
const Drawing = require("./models/Drawing");
const Challenge = require("./models/Challenge");

// Seed data mirrors the rich mockData used by the frontend so the UI
// renders complete sections (trending, hall of fame, hashtags, etc).
const seedDatabase = async () => {
  await connectDB();

  try {
    await User.deleteMany();
    await Drawing.deleteMany();
    await Challenge.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash("password123", salt);

    // --- Artists (6) ---
    const artistsData = [
      {
        name: "Yuki Tanaka",
        username: "yukiart",
        email: "yuki@test.com",
        passwordHash: pass,
        avatar:
          "https://images.unsplash.com/photo-1624091844772-554661d10173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
        bio: "Anime & manga artist from Tokyo. Bringing characters to life one stroke at a time.",
        categories: ["Anime", "Manga", "Fantasy"],
        badge: "legend",
        totalLikes: 984_200,
        totalDrawings: 312,
      },
      {
        name: "Marcus Webb",
        username: "marcuswebb",
        email: "marcus@test.com",
        passwordHash: pass,
        avatar:
          "https://images.unsplash.com/photo-1584598788787-e6ce5159df0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
        bio: "Digital concept artist. I love dragons, warriors and all things epic.",
        categories: ["Fantasy", "Concept Art", "Portrait"],
        badge: "champion",
        totalLikes: 654_300,
        totalDrawings: 198,
      },
      {
        name: "Amara Osei",
        username: "amaracreates",
        email: "amara@test.com",
        passwordHash: pass,
        avatar:
          "https://images.unsplash.com/photo-1763244737829-5e987d40228c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
        bio: "Illustrator & watercolor artist. Nature is my biggest inspiration.",
        categories: ["Watercolor", "Nature", "Landscape"],
        badge: "rising",
        totalLikes: 421_000,
        totalDrawings: 143,
      },
      {
        name: "Leon Hoffmann",
        username: "leonhoff",
        email: "leon@test.com",
        passwordHash: pass,
        avatar:
          "https://images.unsplash.com/photo-1561137832-10d27c2957a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
        bio: "Portrait and sketch artist. Charcoal is my favorite medium.",
        categories: ["Portrait", "Sketch", "Realism"],
        totalLikes: 318_000,
        totalDrawings: 87,
      },
      {
        name: "Sakura Mitsui",
        username: "sakura_draws",
        email: "sakura@test.com",
        passwordHash: pass,
        avatar:
          "https://images.unsplash.com/photo-1624091844772-554661d10173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
        bio: "Kawaii & chibi specialist. Making the world cuter, one drawing at a time! ✨",
        categories: ["Anime", "Kawaii", "Chibi"],
        badge: "legend",
        totalLikes: 1_200_000,
        totalDrawings: 456,
      },
      {
        name: "Dex Ramirez",
        username: "dexart",
        email: "dex@test.com",
        passwordHash: pass,
        avatar:
          "https://images.unsplash.com/photo-1584598788787-e6ce5159df0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
        bio: "Sci-fi and cyberpunk digital artist. The future is neon.",
        categories: ["Sci-Fi", "Cyberpunk", "Abstract"],
        badge: "rising",
        totalLikes: 248_000,
        totalDrawings: 74,
      },
    ];

    const artists = await User.insertMany(artistsData);

    // Quick follow graph for some social proof
    artists[0].followers.push(artists[1]._id, artists[4]._id);
    artists[1].followers.push(artists[0]._id);
    artists[4].followers.push(artists[0]._id, artists[2]._id);
    await Promise.all(artists.map((a) => a.save()));

    // --- Drawings (16) ---
    const drawingsData = [
      {
        title: "Sakura Spirit",
        image:
          "https://images.unsplash.com/photo-1653723367970-ae966c1b803e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description:
          "A spirit guardian inspired by Japanese cherry blossom mythology. Drew this for the spring challenge!",
        artist: artists[0]._id,
        category: "Anime",
        hashtags: ["anime", "sakura", "digitalart", "characterdesign"],
        views: 284_000,
        isFeatured: true,
        isHallOfFame: true,
      },
      {
        title: "Dragon's Lair",
        image:
          "https://images.unsplash.com/photo-1610308700652-d931026f7eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "An ancient dragon guarding its treasure hoard. Created for the Fantasy Challenge.",
        artist: artists[1]._id,
        category: "Fantasy",
        hashtags: ["fantasy", "dragon", "epicart", "conceptart"],
        views: 198_000,
        isFeatured: true,
        isHallOfFame: true,
      },
      {
        title: "Autumn Serenity",
        image:
          "https://images.unsplash.com/photo-1694637110471-c1ffc862dd67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Watercolor study of a mountain valley in autumn.",
        artist: artists[2]._id,
        category: "Landscape",
        hashtags: ["watercolor", "landscape", "autumn", "nature"],
        views: 142_000,
      },
      {
        title: "The Last Warrior",
        image:
          "https://images.unsplash.com/photo-1694097678130-cb60c8f538ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Epic warrior concept piece.",
        artist: artists[1]._id,
        category: "Fantasy",
        hashtags: ["darkfantasy", "warrior", "epicart", "characterdesign"],
        views: 320_000,
        isFeatured: true,
        isHallOfFame: true,
      },
      {
        title: "Kawaii Dream",
        image:
          "https://images.unsplash.com/photo-1611083880744-f566ce727615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "My entry for the Kawaii Challenge 2026! Dreamy pastel vibes ✨",
        artist: artists[4]._id,
        category: "Anime",
        hashtags: ["kawaii", "anime", "cute", "chibi"],
        views: 510_000,
        isFeatured: true,
      },
      {
        title: "Galaxy Mind",
        image:
          "https://images.unsplash.com/photo-1762441112136-4dfc6edf58e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Sci-fi portrait bathed in cosmic colors.",
        artist: artists[5]._id,
        category: "Sci-Fi",
        hashtags: ["scifi", "space", "galaxy", "digitalart"],
        views: 134_000,
      },
      {
        title: "Forest Whisper",
        image:
          "https://images.unsplash.com/photo-1770034285769-4a5a3f410346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Magical forest illustration.",
        artist: artists[2]._id,
        category: "Nature",
        hashtags: ["forest", "nature", "magical", "illustration"],
        views: 178_000,
        isFeatured: true,
      },
      {
        title: "Manga Vibes",
        image:
          "https://images.unsplash.com/photo-1763732397953-7866a2dd8289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Black and white manga-style illustration.",
        artist: artists[0]._id,
        category: "Manga",
        hashtags: ["manga", "anime", "blackwhite", "comicstyle"],
        views: 265_000,
        isFeatured: true,
      },
      {
        title: "Abstract Pulse",
        image:
          "https://images.unsplash.com/photo-1713188090500-a4fb0d2cf309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Generative abstract colors.",
        artist: artists[5]._id,
        category: "Abstract",
        hashtags: ["abstract", "colorful", "digitalart", "generative"],
        views: 96_000,
      },
      {
        title: "City Sketch",
        image:
          "https://images.unsplash.com/photo-1763063356848-1a0adfcb2f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Quick urban sketch study.",
        artist: artists[3]._id,
        category: "Architecture",
        hashtags: ["sketch", "architecture", "urban", "cityscape"],
        views: 78_000,
      },
      {
        title: "Floral Bliss",
        image:
          "https://images.unsplash.com/photo-1583243553028-e4001cb6dd77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Botanical watercolor.",
        artist: artists[2]._id,
        category: "Watercolor",
        hashtags: ["floral", "watercolor", "botanical", "nature"],
        views: 156_000,
      },
      {
        title: "Neon Dystopia",
        image:
          "https://images.unsplash.com/photo-1601908136178-c5225bdc60f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Cyberpunk alleyway scene.",
        artist: artists[5]._id,
        category: "Sci-Fi",
        hashtags: ["cyberpunk", "neon", "scifi", "futuristic"],
        views: 243_000,
        isFeatured: true,
      },
      {
        title: "Portrait Study #7",
        image:
          "https://images.unsplash.com/photo-1758521232708-d738b0eaa94a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Charcoal portrait practice.",
        artist: artists[3]._id,
        category: "Portrait",
        hashtags: ["portrait", "realism", "sketch", "charcoal"],
        views: 118_000,
      },
      {
        title: "Sunset on the Horizon",
        image:
          "https://images.unsplash.com/photo-1641224656166-f3c82d737efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Digital painting of an ocean sunset.",
        artist: artists[2]._id,
        category: "Landscape",
        hashtags: ["sunset", "ocean", "landscape", "digitalpainting"],
        views: 201_000,
        isFeatured: true,
      },
      {
        title: "Cute Companions",
        image:
          "https://images.unsplash.com/photo-1633012252204-fa9f5873abf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Adorable animal duo illustration.",
        artist: artists[4]._id,
        category: "Anime",
        hashtags: ["cute", "animals", "kawaii", "illustration"],
        views: 380_000,
        isFeatured: true,
      },
      {
        title: "Bird of Paradise",
        image:
          "https://images.unsplash.com/photo-1763243518738-6388419701c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
        description: "Colorful bird illustration.",
        artist: artists[2]._id,
        category: "Nature",
        hashtags: ["bird", "nature", "illustration", "colorful"],
        views: 148_000,
      },
    ];

    const drawings = await Drawing.insertMany(drawingsData);

    // --- Challenges (5) ---
    const today = new Date("2026-03-05");
    const daysFromNow = (n) => {
      const d = new Date(today);
      d.setDate(d.getDate() + n);
      return d;
    };

    const challengesData = [
      {
        title: "Dragon Masters",
        description: "Who can paint the most legendary dragon? The community votes for the champion!",
        theme: "Fantasy Dragons",
        challenger: artists[1]._id,
        challengee: artists[0]._id,
        challengerDrawing: drawings[1]._id,
        status: "voting",
        votes: { challenger: 12_840, challengee: 9_620 },
        endsAt: daysFromNow(2),
        category: "Fantasy",
        prize: "Hall of Fame Badge",
        coverImage: drawings[1].image,
      },
      {
        title: "Dark Fantasy Showdown",
        description:
          "Epic warriors, dark knights, and fallen heroes. Show us your best dark fantasy creation.",
        theme: "Dark Fantasy",
        challenger: artists[1]._id,
        challengee: artists[3]._id,
        challengerDrawing: drawings[3]._id,
        status: "active",
        votes: { challenger: 0, challengee: 0 },
        endsAt: daysFromNow(5),
        category: "Fantasy",
        participants: 2,
        coverImage: drawings[3].image,
      },
      {
        title: "Cyberpunk City Battle",
        description:
          "Neon lights, rain-soaked streets, and dystopian futures. Design the best cyberpunk cityscape!",
        theme: "Cyberpunk",
        challenger: artists[5]._id,
        status: "open",
        votes: { challenger: 0, challengee: 0 },
        endsAt: daysFromNow(7),
        category: "Sci-Fi",
        participants: 1,
        coverImage: "https://images.unsplash.com/photo-1601908136178-c5225bdc60f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      },
      {
        title: "Spring Blossom Anime",
        description:
          "Celebrate spring with an anime-style drawing featuring cherry blossoms or spring themes.",
        theme: "Spring / Sakura",
        challenger: artists[0]._id,
        challengee: artists[4]._id,
        challengerDrawing: drawings[0]._id,
        challengeeDrawing: drawings[4]._id,
        status: "completed",
        votes: { challenger: 8_320, challengee: 24_650 },
        endsAt: daysFromNow(-4),
        category: "Anime",
        prize: "Champion Badge",
        coverImage: "https://images.unsplash.com/photo-1611083880744-f566ce727615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      },
      {
        title: "Kawaii Creatures",
        description: "Design the cutest original creature that deserves its own anime series!",
        theme: "Kawaii Originals",
        challenger: artists[4]._id,
        status: "open",
        votes: { challenger: 0, challengee: 0 },
        endsAt: daysFromNow(10),
        category: "Anime",
        participants: 1,
        coverImage:
          "https://images.unsplash.com/photo-1633012252204-fa9f5873abf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      },
    ];

    await Challenge.insertMany(challengesData);

    console.log("✅ Database seeded with rich demo data");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Error:", err.message);
    process.exit(1);
  }
};

seedDatabase();
