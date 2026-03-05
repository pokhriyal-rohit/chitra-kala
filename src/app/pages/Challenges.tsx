import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Swords,
  Trophy,
  Crown,
  Flame,
  Plus,
  Clock,
  Users,
  ChevronRight,
  Star,
  Zap,
} from "lucide-react";
import { challenges, artists, drawings, formatCount } from "../mockData";
import { ChallengeCard } from "../components/ChallengeCard";

const statusTabs = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "active", label: "Active" },
  { value: "voting", label: "Voting" },
  { value: "completed", label: "Completed" },
];

export function Challenges() {
  const [activeTab, setActiveTab] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = activeTab === "all" ? challenges : challenges.filter((c) => c.status === activeTab);

  const votingChallenge = challenges.find((c) => c.status === "voting");

  return (
    <div className="min-h-screen bg-[#0d0d14] pt-20 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-40 bg-orange-600/15 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/3 w-80 h-40 bg-rose-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative px-4 sm:px-6 pt-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Swords className="w-6 h-6 text-orange-400" />
                  <span className="text-orange-400 text-sm" style={{ fontWeight: 600 }}>ART BATTLES</span>
                </div>
                <h1 className="text-white mb-2" style={{ fontWeight: 800, fontSize: "2rem" }}>Challenges</h1>
                <p className="text-gray-400">Challenge artists, vote on battles, win glory</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/25"
              >
                <Plus className="w-4 h-4" />
                Create Challenge
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { label: "Active Battles", value: challenges.filter((c) => c.status === "active" || c.status === "voting").length, icon: Flame, color: "text-orange-400" },
                { label: "Open to Join", value: challenges.filter((c) => c.status === "open").length, icon: Plus, color: "text-emerald-400" },
                { label: "Votes Cast Today", value: "24.8K", icon: Star, color: "text-yellow-400" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
                  <div className="text-white text-xl" style={{ fontWeight: 700 }}>{value}</div>
                  <div className="text-gray-500 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hot battle spotlight */}
      {votingChallenge && (
        <div className="px-4 sm:px-6 mb-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-white text-sm" style={{ fontWeight: 600 }}>BATTLE SPOTLIGHT</span>
            </div>
            <Link to={`/challenges/${votingChallenge.id}`}>
              <div className="relative rounded-3xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all group">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Challenger drawing */}
                  <div className="relative aspect-video md:aspect-auto md:h-72 overflow-hidden">
                    {votingChallenge.challengerDrawing && (
                      <img
                        src={votingChallenge.challengerDrawing.image}
                        alt={votingChallenge.challengerDrawing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
                    <div className="absolute bottom-4 left-4">
                      <img
                        src={votingChallenge.challenger.avatar}
                        alt={votingChallenge.challenger.name}
                        className="w-10 h-10 rounded-xl object-cover border-2 border-violet-400 mb-2"
                      />
                      <div className="text-white text-sm" style={{ fontWeight: 600 }}>{votingChallenge.challenger.name}</div>
                      <div className="text-violet-400 text-xs">{formatCount(votingChallenge.votes?.challenger ?? 0)} votes</div>
                    </div>
                  </div>

                  {/* VS divider */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-2xl bg-[#0d0d14] border-2 border-orange-500 items-center justify-center shadow-lg shadow-orange-500/30">
                    <span className="text-orange-400 text-lg" style={{ fontWeight: 800 }}>VS</span>
                  </div>

                  {/* Challengee slot or drawing */}
                  <div className="relative aspect-video md:aspect-auto md:h-72 overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#12121f]">
                    {votingChallenge.challengeeDrawing ? (
                      <img
                        src={votingChallenge.challengeeDrawing.image}
                        alt={votingChallenge.challengeeDrawing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center mx-auto mb-3">
                            <Plus className="w-8 h-8 text-gray-600" />
                          </div>
                          <p className="text-gray-400 text-sm">Accept the Challenge!</p>
                        </div>
                      </div>
                    )}
                    {votingChallenge.challengeeDrawing && <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50" />}
                    {votingChallenge.challengee && (
                      <div className="absolute bottom-4 right-4 text-right">
                        <div className="flex justify-end mb-2">
                          <img
                            src={votingChallenge.challengee.avatar}
                            alt={votingChallenge.challengee.name}
                            className="w-10 h-10 rounded-xl object-cover border-2 border-pink-400"
                          />
                        </div>
                        <div className="text-white text-sm" style={{ fontWeight: 600 }}>{votingChallenge.challengee.name}</div>
                        <div className="text-pink-400 text-xs">{formatCount(votingChallenge.votes?.challengee ?? 0)} votes</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="bg-[#1a1a2e] px-6 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-white" style={{ fontWeight: 700 }}>{votingChallenge.title}</h3>
                    <p className="text-gray-500 text-sm">{votingChallenge.category} · Ends {votingChallenge.endsAt}</p>
                  </div>
                  <div>
                    {/* Vote progress bar */}
                    {votingChallenge.votes && (votingChallenge.votes.challenger + votingChallenge.votes.challengee) > 0 && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-violet-400">{Math.round((votingChallenge.votes.challenger / (votingChallenge.votes.challenger + votingChallenge.votes.challengee)) * 100)}%</span>
                          <span className="text-pink-400">{Math.round((votingChallenge.votes.challengee / (votingChallenge.votes.challenger + votingChallenge.votes.challengee)) * 100)}%</span>
                        </div>
                        <div className="w-48 h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                            style={{ width: `${Math.round((votingChallenge.votes.challenger / (votingChallenge.votes.challenger + votingChallenge.votes.challengee)) * 100)}%` }}
                          />
                        </div>
                        <div className="text-center text-gray-500 text-xs mt-1">{formatCount(votingChallenge.votes.challenger + votingChallenge.votes.challengee)} total votes</div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm hover:opacity-90 transition-opacity"
                    style={{ fontWeight: 600 }}
                  >
                    Cast Your Vote →
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="px-4 sm:px-6 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm transition-all ${
                  activeTab === tab.value
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {tab.label}
                {tab.value !== "all" && (
                  <span className="ml-2 text-xs opacity-70">
                    {challenges.filter((c) => tab.value === "all" || c.status === tab.value).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Challenge Grid */}
      <div className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Swords className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>No challenges here</h3>
              <p className="text-gray-400 text-sm">Be the first to create one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Challenge Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#1a1a2e] border border-white/10 rounded-3xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center">
                <Swords className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white" style={{ fontWeight: 700 }}>Create a Challenge</h3>
                <p className="text-gray-500 text-sm">Dare another artist to beat you</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Challenge Title</label>
                <input
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/50"
                  placeholder="e.g. Dragon Masters Battle"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Theme / Topic</label>
                <input
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/50"
                  placeholder="e.g. Fantasy Dragons"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Category</label>
                <select className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-white/10 rounded-xl text-gray-300 text-sm focus:outline-none focus:border-orange-500/50">
                  <option>Anime</option>
                  <option>Fantasy</option>
                  <option>Sci-Fi</option>
                  <option>Portrait</option>
                  <option>Landscape</option>
                  <option>Abstract</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Challenge Artist (optional)</label>
                <input
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/50"
                  placeholder="@username or leave blank for open challenge"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-none"
                  placeholder="Describe your challenge rules..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm hover:opacity-90 transition-opacity"
                >
                  Launch Challenge 🔥
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
