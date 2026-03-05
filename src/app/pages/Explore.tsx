import { useState } from "react";
import { useSearchParams } from "react-router";
import { Search, SlidersHorizontal, Grid3X3, LayoutList, TrendingUp, Hash } from "lucide-react";
import { drawings, categories, trendingHashtags, formatCount } from "../mockData";
import { DrawingCard } from "../components/DrawingCard";

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Most Recent" },
  { value: "likes", label: "Most Liked" },
  { value: "views", label: "Most Viewed" },
];

export function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialTag = searchParams.get("tag") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [gridSize, setGridSize] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = drawings.filter((d) => {
    if (selectedCategory !== "all" && d.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (selectedTag && !d.hashtags.includes(selectedTag)) return false;
    if (searchQuery && !d.title.toLowerCase().includes(searchQuery.toLowerCase()) && !d.artist.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "likes") return b.likes - a.likes;
    if (sortBy === "views") return b.views - a.views;
    if (sortBy === "recent") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return b.views + b.likes - (a.views + a.likes);
  });

  return (
    <div className="min-h-screen bg-[#0d0d14] pt-20 pb-16">
      {/* Header */}
      <div className="px-4 sm:px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-white mb-1" style={{ fontWeight: 700 }}>Explore</h1>
              <p className="text-gray-400 text-sm">Discover amazing art from talented creators</p>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drawings, artists, hashtags..."
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
            <div className="flex gap-1">
              <button
                onClick={() => setGridSize("grid")}
                className={`p-2.5 rounded-xl transition-colors ${gridSize === "grid" ? "bg-violet-500/20 text-violet-400" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridSize("list")}
                className={`p-2.5 rounded-xl transition-colors ${gridSize === "list" ? "bg-violet-500/20 text-violet-400" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => { setSelectedCategory("all"); setSelectedTag(""); }}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm transition-all ${
                selectedCategory === "all" && !selectedTag
                  ? "bg-violet-500 text-white shadow-lg shadow-violet-500/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              All Art
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setSelectedTag(""); }}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                  selectedCategory === cat.id
                    ? "bg-violet-500 text-white shadow-lg shadow-violet-500/25"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active Tag Filter */}
          {selectedTag && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-gray-400 text-sm">Filtered by:</span>
              <button
                onClick={() => setSelectedTag("")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-pink-500/20 border border-pink-500/30 text-pink-400 text-sm hover:bg-pink-500/30 transition-colors"
              >
                <Hash className="w-3.5 h-3.5" />
                #{selectedTag}
                <span className="ml-1 text-xs">✕</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trending Hashtags sidebar row */}
      <div className="px-4 sm:px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-pink-400" />
            <span className="text-gray-300 text-sm" style={{ fontWeight: 600 }}>Trending Tags</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {trendingHashtags.map((h) => (
              <button
                key={h.tag}
                onClick={() => { setSelectedTag(selectedTag === h.tag ? "" : h.tag); setSelectedCategory("all"); }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm transition-all ${
                  selectedTag === h.tag
                    ? "bg-pink-500/30 text-pink-400 border border-pink-500/40"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                <Hash className="w-3 h-3" />
                {h.tag}
                <span className="text-[10px] opacity-60">{formatCount(h.count)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">{sorted.length} drawings found</span>
          </div>

          {sorted.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>No drawings found</h3>
              <p className="text-gray-400 text-sm">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className={gridSize === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" : "flex flex-col gap-4"}>
              {sorted.map((drawing) => (
                <DrawingCard key={drawing.id} drawing={drawing} size={gridSize === "list" ? "lg" : "md"} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
