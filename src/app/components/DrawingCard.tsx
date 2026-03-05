import { useState } from "react";
import { Link } from "react-router";
import { Heart, MessageCircle, Eye, Swords, Trophy } from "lucide-react";
import { Drawing, formatCount } from "../mockData";

interface DrawingCardProps {
  drawing: Drawing;
  size?: "sm" | "md" | "lg";
  showChallenge?: boolean;
}

export function DrawingCard({ drawing, size = "md", showChallenge = true }: DrawingCardProps) {
  const [liked, setLiked] = useState(drawing.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(drawing.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleChallenge = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link to={`/drawing/${drawing.id}`} className="block group">
      <div className="relative rounded-2xl overflow-hidden bg-[#1a1a2e] border border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10">
        {/* Image */}
        <div className={`relative overflow-hidden ${size === "lg" ? "aspect-[4/3]" : size === "sm" ? "aspect-square" : "aspect-[3/4]"}`}>
          <img
            src={drawing.image}
            alt={drawing.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hall of Fame badge */}
          {drawing.isFeatured && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg px-2 py-1 flex items-center gap-1">
              <Trophy className="w-3 h-3 text-white" />
              <span className="text-white text-[10px]" style={{ fontWeight: 600 }}>Featured</span>
            </div>
          )}

          {/* Challenge badge */}
          {drawing.challengeId && showChallenge && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-rose-500 rounded-lg px-2 py-1 flex items-center gap-1">
              <Swords className="w-3 h-3 text-white" />
              <span className="text-white text-[10px]" style={{ fontWeight: 600 }}>Challenge</span>
            </div>
          )}

          {/* Hover actions */}
          <div className="absolute inset-0 flex items-end justify-between p-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-sm text-sm transition-all ${
                liked
                  ? "bg-rose-500/80 text-white"
                  : "bg-black/50 text-white hover:bg-rose-500/80"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
              {formatCount(likeCount)}
            </button>
            {showChallenge && (
              <button
                onClick={handleChallenge}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-sm text-white text-sm hover:bg-orange-500/80 transition-all"
              >
                <Swords className="w-3.5 h-3.5" />
                Challenge
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-white text-sm truncate mb-1" style={{ fontWeight: 600 }}>{drawing.title}</h3>

          {/* Artist */}
          <Link
            to={`/profile/${drawing.artist.id}`}
            className="flex items-center gap-2 mb-2 group/artist"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={drawing.artist.avatar}
              alt={drawing.artist.name}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-gray-400 text-xs group-hover/artist:text-violet-400 transition-colors">
              {drawing.artist.username}
            </span>
          </Link>

          {/* Stats */}
          <div className="flex items-center gap-3 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <Heart className={`w-3 h-3 ${liked ? "text-rose-400 fill-rose-400" : ""}`} />
              {formatCount(likeCount)}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {formatCount(drawing.comments)}
            </span>
            <span className="flex items-center gap-1 ml-auto">
              <Eye className="w-3 h-3" />
              {formatCount(drawing.views)}
            </span>
          </div>

          {/* Hashtags */}
          {drawing.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {drawing.hashtags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
