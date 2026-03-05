import { useState } from "react";
import { Link } from "react-router";
import { Crown, Zap, Award, UserPlus, UserCheck } from "lucide-react";
import { Artist, formatCount } from "../mockData";

interface ArtistCardProps {
  artist: Artist;
  rank?: number;
  compact?: boolean;
}

const badgeConfig = {
  legend: { icon: Crown, color: "text-yellow-400", bg: "bg-yellow-500/20", label: "Legend" },
  champion: { icon: Award, color: "text-violet-400", bg: "bg-violet-500/20", label: "Champion" },
  rising: { icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/20", label: "Rising Star" },
};

export function ArtistCard({ artist, rank, compact = false }: ArtistCardProps) {
  const [following, setFollowing] = useState(artist.isFollowing ?? false);
  const badge = artist.badge ? badgeConfig[artist.badge] : null;

  if (compact) {
    return (
      <Link to={`/profile/${artist.id}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/20 transition-all group">
        <div className="relative flex-shrink-0">
          {rank && (
            <div className={`absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] z-10 ${
              rank === 1 ? "bg-yellow-500 text-black" :
              rank === 2 ? "bg-gray-400 text-black" :
              rank === 3 ? "bg-amber-700 text-white" :
              "bg-gray-700 text-gray-300"
            }`} style={{ fontWeight: 700 }}>{rank}</div>
          )}
          <img
            src={artist.avatar}
            alt={artist.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white/10 group-hover:border-violet-400/50 transition-colors"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-white text-sm truncate" style={{ fontWeight: 600 }}>{artist.name}</span>
            {badge && <badge.icon className={`w-3 h-3 ${badge.color} flex-shrink-0`} />}
          </div>
          <span className="text-gray-500 text-xs">{formatCount(artist.followers)} followers</span>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); setFollowing(!following); }}
          className={`text-xs px-3 py-1 rounded-lg transition-all flex-shrink-0 ${
            following
              ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
              : "bg-violet-500 text-white hover:bg-violet-600"
          }`}
        >
          {following ? "Following" : "Follow"}
        </button>
      </Link>
    );
  }

  return (
    <Link to={`/profile/${artist.id}`} className="block group">
      <div className="relative rounded-2xl overflow-hidden bg-[#1a1a2e] border border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 p-5">
        {/* Rank Badge */}
        {rank && (
          <div className={`absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center text-sm z-10 ${
            rank === 1 ? "bg-yellow-500 text-black" :
            rank === 2 ? "bg-gray-300 text-black" :
            rank === 3 ? "bg-amber-700 text-white" :
            "bg-gray-700/50 text-gray-400"
          }`} style={{ fontWeight: 700 }}>#{rank}</div>
        )}

        {/* Avatar + Badge */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-violet-400/50 transition-colors"
            />
            {badge && (
              <div className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg ${badge.bg} flex items-center justify-center border border-white/10`}>
                <badge.icon className={`w-3.5 h-3.5 ${badge.color}`} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-white mb-0.5 truncate" style={{ fontWeight: 700 }}>{artist.name}</h3>
            <p className="text-gray-500 text-sm">{artist.username}</p>
            {badge && (
              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-1 ${badge.bg} ${badge.color}`}>
                <badge.icon className="w-3 h-3" />
                {badge.label}
              </span>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{artist.bio}</p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {artist.categories.slice(0, 3).map((cat) => (
            <span key={cat} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
              {cat}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Followers", value: formatCount(artist.followers) },
            { label: "Drawings", value: artist.totalDrawings },
            { label: "Likes", value: formatCount(artist.totalLikes) },
          ].map(({ label, value }) => (
            <div key={label} className="text-center p-2 rounded-xl bg-white/5">
              <div className="text-white text-sm" style={{ fontWeight: 700 }}>{value}</div>
              <div className="text-gray-500 text-[10px] mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Follow button */}
        <button
          onClick={(e) => { e.preventDefault(); setFollowing(!following); }}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all ${
            following
              ? "bg-violet-500/20 text-violet-400 border border-violet-500/30 hover:bg-violet-500/30"
              : "bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:opacity-90"
          }`}
        >
          {following ? (
            <><UserCheck className="w-4 h-4" /> Following</>
          ) : (
            <><UserPlus className="w-4 h-4" /> Follow</>
          )}
        </button>
      </div>
    </Link>
  );
}
