import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Flame,
  TrendingUp,
  Trophy,
  Swords,
  ChevronRight,
  Sparkles,
  Hash,
  Star,
} from "lucide-react";
import {
  drawings,
  challenges,
  artists,
  trendingHashtags,
  hallOfFame,
  categories,
  formatCount,
} from "../mockData";
import { DrawingCard } from "../components/DrawingCard";
import { ArtistCard } from "../components/ArtistCard";
import { ChallengeCard } from "../components/ChallengeCard";

const popularToday = [...drawings].sort((a, b) => b.views - a.views).slice(0, 8);
const featuredDrawings = drawings.filter((d) => d.isFeatured).slice(0, 6);
const animeDrawings = drawings.filter((d) => d.category === "Anime" || d.category === "Manga").slice(0, 4);
const fantasyDrawings = drawings.filter((d) => d.category === "Fantasy").slice(0, 4);
const activeChallenge = challenges[0];

export function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="min-h-screen bg-[#0d0d14] pb-16">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl" />
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Welcome to the world's best art community
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-4" style={{ fontWeight: 800, lineHeight: 1.15 }}>
              Share Your Art,{" "}
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Rule the Canvas
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Post drawings, challenge artists, discover trending art across anime, fantasy, portraits & more.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/explore"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Explore Art
              </Link>
              <Link
                to="/challenges"
                className="px-6 py-3 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-white/15 transition-colors flex items-center gap-2"
              >
                <Swords className="w-4 h-4" />
                View Challenges
              </Link>
            </div>
          </motion.div>

          {/* Featured drawing strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredDrawings.map((drawing, i) => (
              <motion.div
                key={drawing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link to={`/drawing/${drawing.id}`} className="block group relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <img
                    src={drawing.image}
                    alt={drawing.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs truncate" style={{ fontWeight: 600 }}>{drawing.title}</p>
                    <p className="text-gray-300 text-[10px]">{drawing.artist.username}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Challenge Banner */}
      {activeChallenge && (
        <section className="px-4 sm:px-6 mb-12">
          <div className="max-w-7xl mx-auto">
            <Link to={`/challenges/${activeChallenge.id}`}>
              <div className="relative rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all">
                <div className="absolute inset-0">
                  {activeChallenge.coverImage && (
                    <img src={activeChallenge.coverImage} alt="" className="w-full h-full object-cover opacity-20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/90 to-transparent" />
                </div>
                <div className="relative flex items-center gap-6 p-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
                    <Swords className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-orange-400 text-xs px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30">
                        🔥 HOT CHALLENGE
                      </span>
                      <span className="text-gray-500 text-xs">{activeChallenge.category}</span>
                    </div>
                    <h3 className="text-white text-xl mb-1" style={{ fontWeight: 700 }}>{activeChallenge.title}</h3>
                    <p className="text-gray-400 text-sm">{activeChallenge.description}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <img src={activeChallenge.challenger.avatar} alt="" className="w-12 h-12 rounded-xl object-cover border-2 border-violet-400/40 mx-auto mb-1" />
                        <span className="text-violet-400 text-xs">{formatCount(activeChallenge.votes?.challenger ?? 0)}</span>
                      </div>
                      <div className="text-orange-400 text-lg" style={{ fontWeight: 700 }}>VS</div>
                      <div className="text-center">
                        {activeChallenge.challengee ? (
                          <>
                            <img src={activeChallenge.challengee.avatar} alt="" className="w-12 h-12 rounded-xl object-cover border-2 border-pink-400/40 mx-auto mb-1" />
                            <span className="text-pink-400 text-xs">{formatCount(activeChallenge.votes?.challengee ?? 0)}</span>
                          </>
                        ) : (
                          <div className="w-12 h-12 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center mx-auto mb-1">
                            <span className="text-gray-500 text-lg">?</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-orange-400 text-sm px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-500/30" style={{ fontWeight: 600 }}>
                      Vote Now →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Trending Hashtags */}
      <section className="px-4 sm:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={<Hash className="w-5 h-5 text-pink-400" />}
            title="Trending Hashtags"
            subtitle="What the community is drawing right now"
            link="/explore"
          />
          <div className="flex flex-wrap gap-3">
            {trendingHashtags.map((hashtag, i) => (
              <motion.div
                key={hashtag.tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={`/explore?tag=${hashtag.tag}`}
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r ${hashtag.color} bg-opacity-10 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-0.5`}
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <div className={`w-7 h-7 rounded-xl bg-gradient-to-r ${hashtag.color} flex items-center justify-center flex-shrink-0`}>
                    <Hash className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-sm" style={{ fontWeight: 600 }}>#{hashtag.tag}</div>
                    <div className="text-gray-500 text-[10px]">{formatCount(hashtag.count)} posts</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Today */}
      <section className="px-4 sm:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={<Flame className="w-5 h-5 text-orange-400" />}
            title="Popular Today"
            subtitle="The most-viewed drawings in the last 24 hours"
            link="/explore"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularToday.map((drawing) => (
              <DrawingCard key={drawing.id} drawing={drawing} size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* Popular in Anime */}
      <section className="px-4 sm:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={<span className="text-lg">🎌</span>}
            title="Popular in Anime & Manga"
            subtitle="Top picks from the anime & manga community"
            link="/explore?category=anime"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {animeDrawings.map((drawing) => (
              <DrawingCard key={drawing.id} drawing={drawing} size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* Popular in Fantasy */}
      <section className="px-4 sm:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={<span className="text-lg">🐉</span>}
            title="Popular in Fantasy"
            subtitle="Epic worlds, dragons and legendary heroes"
            link="/explore?category=fantasy"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {fantasyDrawings.map((drawing) => (
              <DrawingCard key={drawing.id} drawing={drawing} size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* Hall of Fame */}
      <section className="px-4 sm:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={<Trophy className="w-5 h-5 text-yellow-400" />}
            title="Hall of Fame"
            subtitle="The greatest artworks ever posted on DrawVerse"
            link="/explore?sort=hof"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {hallOfFame.map((drawing, i) => (
              <Link key={drawing.id} to={`/drawing/${drawing.id}`} className="block group relative rounded-2xl overflow-hidden aspect-square">
                <img
                  src={drawing.image}
                  alt={drawing.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className={`absolute top-2 left-2 w-7 h-7 rounded-xl flex items-center justify-center text-sm ${
                  i === 0 ? "bg-yellow-500 text-black" :
                  i === 1 ? "bg-gray-300 text-black" :
                  i === 2 ? "bg-amber-700 text-white" :
                  "bg-gray-800/80 text-gray-300"
                }`} style={{ fontWeight: 700 }}>#{i + 1}</div>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs truncate" style={{ fontWeight: 600 }}>{drawing.title}</p>
                  <p className="text-yellow-400 text-[10px]">♥ {formatCount(drawing.likes)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Active Challenges */}
      <section className="px-4 sm:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={<Swords className="w-5 h-5 text-orange-400" />}
            title="Active Challenges"
            subtitle="Join, vote, or watch epic art battles unfold"
            link="/challenges"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.filter((c) => c.status !== "completed").slice(0, 3).map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      </section>

      {/* Hot Artists */}
      <section className="px-4 sm:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            icon={<Star className="w-5 h-5 text-cyan-400" />}
            title="Hot Artists This Week"
            subtitle="The most followed and liked artists right now"
            link="/artists"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {artists.slice(0, 3).map((artist, i) => (
              <ArtistCard key={artist.id} artist={artist} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
  link,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  link?: string;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <h2 className="text-white" style={{ fontWeight: 700 }}>{title}</h2>
        </div>
        {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
      </div>
      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 text-violet-400 text-sm hover:text-violet-300 transition-colors flex-shrink-0 mt-1"
        >
          See all <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}