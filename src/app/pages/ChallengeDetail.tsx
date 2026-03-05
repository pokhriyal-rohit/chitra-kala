import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Swords, ArrowLeft, Clock, Trophy, Users, Crown, Heart, ChevronRight } from "lucide-react";
import { challenges, drawings, formatCount } from "../mockData";
import { DrawingCard } from "../components/DrawingCard";

export function ChallengeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const challenge = challenges.find((c) => c.id === id) || challenges[0];
  const [voted, setVoted] = useState<"challenger" | "challengee" | null>(null);
  const [votes, setVotes] = useState(challenge.votes ?? { challenger: 0, challengee: 0 });

  const totalVotes = votes.challenger + votes.challengee;
  const challengerPct = totalVotes > 0 ? Math.round((votes.challenger / totalVotes) * 100) : 50;
  const challengeePct = 100 - challengerPct;

  const handleVote = (side: "challenger" | "challengee") => {
    if (voted) return;
    setVoted(side);
    setVotes((prev) => ({
      ...prev,
      [side]: prev[side] + 1,
    }));
  };

  const statusColors = {
    open: "text-emerald-400 bg-emerald-500/20 border-emerald-500/30",
    active: "text-blue-400 bg-blue-500/20 border-blue-500/30",
    voting: "text-orange-400 bg-orange-500/20 border-orange-500/30",
    completed: "text-gray-400 bg-gray-500/20 border-gray-500/30",
  };

  const winner = challenge.status === "completed"
    ? votes.challenger > votes.challengee ? "challenger" : "challengee"
    : null;

  return (
    <div className="min-h-screen bg-[#0d0d14] pt-16 pb-16">
      {/* Back */}
      <div className="sticky top-16 z-10 bg-[#0d0d14]/90 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Challenges
          </button>
          <span className={`ml-auto text-xs px-3 py-1.5 rounded-full border ${statusColors[challenge.status]}`}>
            {challenge.status === "voting" ? "🔥 Voting Open" :
             challenge.status === "open" ? "✅ Open to Join" :
             challenge.status === "active" ? "⚡ In Progress" : "✓ Completed"}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-4">
            <Swords className="w-4 h-4" />
            Art Battle · {challenge.category}
          </div>
          <h1 className="text-white mb-3" style={{ fontWeight: 800, fontSize: "2rem" }}>{challenge.title}</h1>
          <p className="text-gray-400 max-w-xl mx-auto">{challenge.description}</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Ends {challenge.endsAt}</span>
            {challenge.prize && (
              <span className="flex items-center gap-1 text-amber-400"><Crown className="w-4 h-4" /> {challenge.prize}</span>
            )}
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {formatCount(totalVotes)} votes</span>
          </div>
        </div>

        {/* Battle Arena */}
        <div className="relative mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {/* Challenger Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`rounded-3xl overflow-hidden border-2 transition-all ${
                winner === "challenger" ? "border-yellow-500/60 shadow-lg shadow-yellow-500/20" :
                voted === "challenger" ? "border-violet-500/60" :
                "border-white/10 hover:border-violet-500/30"
              }`}
            >
              {challenge.challengerDrawing ? (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={challenge.challengerDrawing.image}
                      alt={challenge.challengerDrawing.title}
                      className="w-full h-full object-cover"
                    />
                    {winner === "challenger" && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                        <Crown className="w-4 h-4 text-black" />
                        <span className="text-black text-sm" style={{ fontWeight: 700 }}>WINNER</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-[#1a1a2e]">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={challenge.challenger.avatar} alt="" className="w-9 h-9 rounded-xl object-cover border border-violet-400/40" />
                      <div>
                        <div className="text-white text-sm" style={{ fontWeight: 600 }}>{challenge.challenger.name}</div>
                        <div className="text-gray-500 text-xs">{challenge.challenger.username}</div>
                      </div>
                    </div>
                    {(challenge.status === "voting" || challenge.status === "completed") && (
                      <>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-violet-400">{challengerPct}%</span>
                          <span className="text-gray-500">{formatCount(votes.challenger)} votes</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-3">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700"
                            style={{ width: `${challengerPct}%` }}
                          />
                        </div>
                        {challenge.status === "voting" && !voted && (
                          <button
                            onClick={() => handleVote("challenger")}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm hover:opacity-90 transition-opacity"
                            style={{ fontWeight: 600 }}
                          >
                            Vote for {challenge.challenger.name}
                          </button>
                        )}
                        {voted === "challenger" && (
                          <div className="w-full py-2.5 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-400 text-sm text-center">
                            ✓ You voted for this!
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-[#1a1a2e] to-[#12121f] flex items-center justify-center">
                  <div className="text-center p-6">
                    <img src={challenge.challenger.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-400/40 mx-auto mb-3" />
                    <div className="text-white mb-1" style={{ fontWeight: 600 }}>{challenge.challenger.name}</div>
                    <div className="text-gray-500 text-sm">has issued this challenge!</div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* VS Badge */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-2xl bg-[#0d0d14] border-2 border-orange-500/60 items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-orange-400 text-lg" style={{ fontWeight: 800 }}>VS</span>
            </div>

            {/* Challengee Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`rounded-3xl overflow-hidden border-2 transition-all ${
                winner === "challengee" ? "border-yellow-500/60 shadow-lg shadow-yellow-500/20" :
                voted === "challengee" ? "border-pink-500/60" :
                "border-white/10 hover:border-pink-500/30"
              }`}
            >
              {challenge.challengeeDrawing ? (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={challenge.challengeeDrawing.image}
                      alt={challenge.challengeeDrawing.title}
                      className="w-full h-full object-cover"
                    />
                    {winner === "challengee" && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                        <Crown className="w-4 h-4 text-black" />
                        <span className="text-black text-sm" style={{ fontWeight: 700 }}>WINNER</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-[#1a1a2e]">
                    {challenge.challengee && (
                      <div className="flex items-center gap-3 mb-3">
                        <img src={challenge.challengee.avatar} alt="" className="w-9 h-9 rounded-xl object-cover border border-pink-400/40" />
                        <div>
                          <div className="text-white text-sm" style={{ fontWeight: 600 }}>{challenge.challengee.name}</div>
                          <div className="text-gray-500 text-xs">{challenge.challengee.username}</div>
                        </div>
                      </div>
                    )}
                    {(challenge.status === "voting" || challenge.status === "completed") && (
                      <>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-pink-400">{challengeePct}%</span>
                          <span className="text-gray-500">{formatCount(votes.challengee)} votes</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-3">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-700"
                            style={{ width: `${challengeePct}%` }}
                          />
                        </div>
                        {challenge.status === "voting" && !voted && challenge.challengee && (
                          <button
                            onClick={() => handleVote("challengee")}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white text-sm hover:opacity-90 transition-opacity"
                            style={{ fontWeight: 600 }}
                          >
                            Vote for {challenge.challengee.name}
                          </button>
                        )}
                        {voted === "challengee" && (
                          <div className="w-full py-2.5 rounded-xl bg-pink-500/20 border border-pink-500/30 text-pink-400 text-sm text-center">
                            ✓ You voted for this!
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-[#1a1a2e] to-[#12121f] flex items-center justify-center border-2 border-dashed border-white/10 rounded-3xl">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center mx-auto mb-3">
                      <Swords className="w-8 h-8 text-gray-700" />
                    </div>
                    <div className="text-gray-400 mb-3" style={{ fontWeight: 600 }}>Open Challenge!</div>
                    <div className="text-gray-500 text-sm mb-4">No one has accepted yet. Can you beat them?</div>
                    {challenge.status === "open" && (
                      <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm hover:opacity-90 transition-opacity">
                        Accept Challenge
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Overall vote bar */}
        {totalVotes > 0 && (
          <div className="mb-10 p-6 rounded-2xl bg-[#1a1a2e] border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-violet-400 text-sm" style={{ fontWeight: 600 }}>{challenge.challenger.name}</span>
              <span className="text-gray-400 text-xs">{formatCount(totalVotes)} total votes</span>
              <span className="text-pink-400 text-sm" style={{ fontWeight: 600 }}>{challenge.challengee?.name || "Open"}</span>
            </div>
            <div className="relative h-4 rounded-full bg-white/10 overflow-hidden">
              <div
                className="absolute left-0 h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-1000"
                style={{ width: `${challengerPct}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-violet-400 text-sm" style={{ fontWeight: 700 }}>{challengerPct}%</span>
              <span className="text-pink-400 text-sm" style={{ fontWeight: 700 }}>{challengeePct}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
