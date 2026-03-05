import { Link } from "react-router";
import { Swords, Clock, Users, Trophy, Flame, Crown } from "lucide-react";
import { Challenge, formatCount } from "../mockData";

interface ChallengeCardProps {
  challenge: Challenge;
  compact?: boolean;
}

const statusConfig = {
  open: { label: "Open to Join", color: "text-emerald-400", bg: "bg-emerald-500/20 border-emerald-500/30", dot: "bg-emerald-400" },
  active: { label: "In Progress", color: "text-blue-400", bg: "bg-blue-500/20 border-blue-500/30", dot: "bg-blue-400" },
  voting: { label: "Voting Now", color: "text-orange-400", bg: "bg-orange-500/20 border-orange-500/30", dot: "bg-orange-400 animate-pulse" },
  completed: { label: "Completed", color: "text-gray-400", bg: "bg-gray-500/20 border-gray-500/30", dot: "bg-gray-400" },
};

export function ChallengeCard({ challenge, compact = false }: ChallengeCardProps) {
  const status = statusConfig[challenge.status];
  const totalVotes = (challenge.votes?.challenger ?? 0) + (challenge.votes?.challengee ?? 0);
  const challengerPct = totalVotes > 0 ? Math.round(((challenge.votes?.challenger ?? 0) / totalVotes) * 100) : 50;
  const challengeePct = 100 - challengerPct;

  return (
    <Link to={`/challenges/${challenge.id}`} className="block group">
      <div className="rounded-2xl overflow-hidden bg-[#1a1a2e] border border-white/5 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10">
        {/* Cover Image */}
        <div className="relative h-36 overflow-hidden">
          {challenge.coverImage && (
            <img
              src={challenge.coverImage}
              alt={challenge.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-black/30 to-transparent" />

          {/* Status badge */}
          <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs backdrop-blur-sm ${status.bg} ${status.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </div>

          {/* Category */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-gray-300 text-xs border border-white/10">
            {challenge.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Swords className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white text-sm line-clamp-1" style={{ fontWeight: 700 }}>{challenge.title}</h3>
              <p className="text-gray-500 text-xs mt-0.5">Theme: {challenge.theme}</p>
            </div>
          </div>

          <p className="text-gray-400 text-xs mb-4 line-clamp-2">{challenge.description}</p>

          {/* VS Section */}
          {challenge.status === "voting" || challenge.status === "completed" ? (
            <div className="mb-4">
              {/* Combatants */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 flex items-center gap-2">
                  <img
                    src={challenge.challenger.avatar}
                    alt={challenge.challenger.name}
                    className="w-7 h-7 rounded-full object-cover border border-violet-400/40"
                  />
                  <span className="text-xs text-gray-300 truncate">{challenge.challenger.name}</span>
                </div>
                <div className="text-orange-400 text-xs px-1" style={{ fontWeight: 700 }}>VS</div>
                <div className="flex-1 flex items-center gap-2 flex-row-reverse">
                  {challenge.challengee && (
                    <>
                      <img
                        src={challenge.challengee.avatar}
                        alt={challenge.challengee.name}
                        className="w-7 h-7 rounded-full object-cover border border-pink-400/40"
                      />
                      <span className="text-xs text-gray-300 truncate text-right">{challenge.challengee.name}</span>
                    </>
                  )}
                </div>
              </div>
              {/* Vote bar */}
              <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700"
                  style={{ width: `${challengerPct}%` }}
                />
                <div
                  className="absolute right-0 top-0 h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-700"
                  style={{ width: `${challengeePct}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-violet-400 text-[10px]">{challengerPct}% ({formatCount(challenge.votes?.challenger ?? 0)})</span>
                <span className="text-pink-400 text-[10px]">({formatCount(challenge.votes?.challengee ?? 0)}) {challengeePct}%</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-4">
              <img
                src={challenge.challenger.avatar}
                alt={challenge.challenger.name}
                className="w-7 h-7 rounded-full object-cover border border-violet-400/40"
              />
              <span className="text-gray-400 text-xs">{challenge.challenger.name}</span>
              <span className="text-orange-400 text-xs ml-1">challenges</span>
              {challenge.challengee ? (
                <img
                  src={challenge.challengee.avatar}
                  alt={challenge.challengee.name}
                  className="w-7 h-7 rounded-full object-cover border border-pink-400/40"
                />
              ) : (
                <div className="flex items-center gap-1 ml-1 text-xs text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  anyone
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Clock className="w-3.5 h-3.5" />
              Ends {challenge.endsAt}
            </div>
            {challenge.prize && (
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                <Crown className="w-3 h-3" />
                {challenge.prize}
              </div>
            )}
            {challenge.status === "open" && (
              <button
                onClick={(e) => e.preventDefault()}
                className="text-xs px-3 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:opacity-90 transition-opacity"
              >
                Accept
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
