import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import {
  Crown,
  Award,
  Zap,
  UserPlus,
  UserCheck,
  Swords,
  Grid3X3,
  Trophy,
  Heart,
  Eye,
  MessageCircle,
  ChevronRight,
  Settings,
} from "lucide-react";
import { artists, drawings, challenges, formatCount } from "../mockData";
import { DrawingCard } from "../components/DrawingCard";
import { ChallengeCard } from "../components/ChallengeCard";

const badgeConfig = {
  legend: { icon: Crown, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", label: "Legend", desc: "Top 1% of all artists" },
  champion: { icon: Award, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20", label: "Champion", desc: "Challenge champion" },
  rising: { icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", label: "Rising Star", desc: "Rapidly growing artist" },
};

const tabs = [
  { value: "drawings", label: "Drawings", icon: Grid3X3 },
  { value: "challenges", label: "Challenges", icon: Swords },
  { value: "featured", label: "Featured", icon: Trophy },
];

export function Profile() {
  const { id } = useParams();
  const artist = artists.find((a) => a.id === id) || artists[0];
  const [following, setFollowing] = useState(artist.isFollowing ?? false);
  const [activeTab, setActiveTab] = useState("drawings");

  const isOwnProfile = artist.id === "a1"; // pretend we're yuki
  const badge = artist.badge ? badgeConfig[artist.badge] : null;

  const artistDrawings = drawings.filter((d) => d.artist.id === artist.id);
  const artistChallenges = challenges.filter(
    (c) => c.challenger.id === artist.id || c.challengee?.id === artist.id
  );
  const featuredDrawings = artistDrawings.filter((d) => d.isFeatured);

  const displayDrawings =
    activeTab === "drawings"
      ? artistDrawings
      : activeTab === "challenges"
      ? []
      : featuredDrawings;

  return (
    <div className="min-h-screen bg-[#0d0d14] pt-16 pb-16">
      {/* Cover / Header */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        {/* Cover image from their best drawing */}
        {artistDrawings[0] && (
          <img
            src={artistDrawings[0].image}
            alt="cover"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d14]/50 to-[#0d0d14]" />
        {isOwnProfile && (
          <button className="absolute top-20 right-4 p-2 rounded-xl bg-black/40 backdrop-blur-sm text-gray-300 hover:text-white border border-white/10 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 -mt-20 relative z-10 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-4">
            <div className="flex items-end gap-4">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-[#0d0d14] shadow-xl"
              />
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-white" style={{ fontWeight: 800 }}>{artist.name}</h1>
                  {badge && (
                    <div className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${badge.bg} ${badge.color}`}>
                      <badge.icon className="w-3 h-3" />
                      {badge.label}
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{artist.username}</p>
              </div>
            </div>
            <div className="flex gap-2 mb-2">
              {!isOwnProfile ? (
                <>
                  <button
                    onClick={() => setFollowing(!following)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                      following
                        ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                        : "bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:opacity-90"
                    }`}
                  >
                    {following ? <><UserCheck className="w-4 h-4" /> Following</> : <><UserPlus className="w-4 h-4" /> Follow</>}
                  </button>
                  <Link
                    to="/challenges"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:opacity-90 transition-opacity"
                  >
                    <Swords className="w-4 h-4" />
                    Challenge
                  </Link>
                </>
              ) : (
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-white/10 border border-white/10 text-gray-300 hover:bg-white/15 transition-colors">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-300 mb-4 max-w-xl">{artist.bio}</p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {artist.categories.map((cat) => (
              <span key={cat} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                {cat}
              </span>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Followers", value: formatCount(artist.followers) },
              { label: "Following", value: formatCount(artist.following) },
              { label: "Total Likes", value: formatCount(artist.totalLikes) },
              { label: "Drawings", value: artist.totalDrawings },
            ].map(({ label, value }) => (
              <div key={label} className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-white text-xl" style={{ fontWeight: 700 }}>{value}</div>
                <div className="text-gray-500 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Badge detail */}
          {badge && (
            <div className={`flex items-center gap-3 p-4 rounded-2xl border mt-4 ${badge.bg}`}>
              <div className={`w-10 h-10 rounded-xl ${badge.bg} border ${badge.bg} flex items-center justify-center`}>
                <badge.icon className={`w-5 h-5 ${badge.color}`} />
              </div>
              <div>
                <div className={`text-sm ${badge.color}`} style={{ fontWeight: 600 }}>{badge.label} Artist</div>
                <div className="text-gray-400 text-xs">{badge.desc}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-10 bg-[#0d0d14]/90 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 px-4 py-3 text-sm transition-all border-b-2 -mb-px whitespace-nowrap ${
                  activeTab === tab.value
                    ? "border-violet-500 text-violet-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className="text-xs opacity-60">
                  ({tab.value === "drawings" ? artistDrawings.length : tab.value === "challenges" ? artistChallenges.length : featuredDrawings.length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {activeTab === "challenges" ? (
            <div>
              {artistChallenges.length === 0 ? (
                <div className="text-center py-20">
                  <Swords className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                  <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>No challenges yet</h3>
                  {isOwnProfile && (
                    <Link to="/challenges" className="text-violet-400 text-sm hover:text-violet-300">
                      Create your first challenge →
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {artistChallenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
              )}
            </div>
          ) : displayDrawings.length === 0 ? (
            <div className="text-center py-20">
              <Grid3X3 className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>No drawings here yet</h3>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayDrawings.map((drawing) => (
                <DrawingCard key={drawing.id} drawing={drawing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
