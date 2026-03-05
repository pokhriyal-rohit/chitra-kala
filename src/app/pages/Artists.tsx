import { useState } from "react";
import { Search, TrendingUp, Star, Crown, Zap, Award, Users } from "lucide-react";
import { artists, categories, formatCount } from "../mockData";
import { ArtistCard } from "../components/ArtistCard";

const sortOptions = [
  { value: "followers", label: "Most Followed" },
  { value: "likes", label: "Most Liked" },
  { value: "drawings", label: "Most Active" },
];

export function Artists() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("followers");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = artists.filter((a) => {
    if (selectedCategory !== "all" && !a.categories.some((c) => c.toLowerCase().includes(selectedCategory.toLowerCase()))) return false;
    if (searchQuery && !a.name.toLowerCase().includes(searchQuery.toLowerCase()) && !a.username.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "likes") return b.totalLikes - a.totalLikes;
    if (sortBy === "drawings") return b.totalDrawings - a.totalDrawings;
    return b.followers - a.followers;
  });

  const topArtists = [...artists].sort((a, b) => b.followers - a.followers).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0d0d14] pt-20 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-40 bg-cyan-600/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-80 h-40 bg-violet-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative px-4 sm:px-6 pt-8 pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 text-sm" style={{ fontWeight: 600 }}>ARTIST COMMUNITY</span>
            </div>
            <h1 className="text-white mb-2" style={{ fontWeight: 800, fontSize: "2rem" }}>Artists</h1>
            <p className="text-gray-400">Discover talented creators and follow your favorites</p>
          </div>
        </div>
      </div>

      {/* Leaderboard Top 3 */}
      <div className="px-4 sm:px-6 mb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm" style={{ fontWeight: 600 }}>TOP ARTISTS THIS WEEK</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {topArtists.map((artist, i) => (
              <div
                key={artist.id}
                className={`relative p-5 rounded-2xl border overflow-hidden ${
                  i === 0
                    ? "bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border-yellow-500/20"
                    : i === 1
                    ? "bg-gradient-to-br from-gray-400/10 to-gray-500/5 border-gray-400/20"
                    : "bg-gradient-to-br from-amber-700/10 to-amber-900/5 border-amber-700/20"
                }`}
              >
                <div className={`absolute top-3 right-3 w-10 h-10 rounded-2xl flex items-center justify-center text-sm ${
                  i === 0 ? "bg-yellow-500 text-black" :
                  i === 1 ? "bg-gray-300 text-black" :
                  "bg-amber-700 text-white"
                }`} style={{ fontWeight: 800 }}>#{i + 1}</div>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className={`w-14 h-14 rounded-2xl object-cover border-2 ${
                      i === 0 ? "border-yellow-500/50" : i === 1 ? "border-gray-400/50" : "border-amber-700/50"
                    }`}
                  />
                  <div>
                    <h3 className="text-white" style={{ fontWeight: 700 }}>{artist.name}</h3>
                    <p className="text-gray-500 text-sm">{artist.username}</p>
                    {artist.badge && (
                      <div className={`inline-flex items-center gap-1 text-xs mt-1 ${
                        artist.badge === "legend" ? "text-yellow-400" :
                        artist.badge === "champion" ? "text-violet-400" :
                        "text-cyan-400"
                      }`}>
                        {artist.badge === "legend" && <Crown className="w-3 h-3" />}
                        {artist.badge === "champion" && <Award className="w-3 h-3" />}
                        {artist.badge === "rising" && <Zap className="w-3 h-3" />}
                        {artist.badge.charAt(0).toUpperCase() + artist.badge.slice(1)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 rounded-xl bg-white/5">
                    <div className="text-white text-sm" style={{ fontWeight: 700 }}>{formatCount(artist.followers)}</div>
                    <div className="text-gray-500 text-[10px]">Followers</div>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-white/5">
                    <div className="text-white text-sm" style={{ fontWeight: 700 }}>{formatCount(artist.totalLikes)}</div>
                    <div className="text-gray-500 text-[10px]">Total Likes</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search + Sort + Filter */}
      <div className="px-4 sm:px-6 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 mb-4 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artists..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 text-sm focus:outline-none focus:border-violet-500/50 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#1a1a2e]">{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm transition-all ${
                selectedCategory === "all"
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              All Categories
            </button>
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all ${
                  selectedCategory === cat.id
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Artists Grid */}
      <div className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">{sorted.length} artists found</span>
          </div>
          {sorted.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>No artists found</h3>
              <p className="text-gray-400 text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sorted.map((artist, i) => (
                <ArtistCard key={artist.id} artist={artist} rank={i + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
