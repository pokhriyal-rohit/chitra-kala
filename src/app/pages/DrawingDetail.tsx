import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Heart,
  MessageCircle,
  Eye,
  Share2,
  Swords,
  ArrowLeft,
  Hash,
  Send,
  Bookmark,
  MoreHorizontal,
  UserPlus,
  UserCheck,
  Trophy,
} from "lucide-react";
import { drawings, formatCount, timeAgo } from "../mockData";
import { DrawingCard } from "../components/DrawingCard";

const mockComments = [
  { id: "c1", user: "Yuki T.", avatar: "https://images.unsplash.com/photo-1624091844772-554661d10173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", text: "Absolutely stunning work! The lighting is incredible 🔥", time: "2h ago", likes: 24 },
  { id: "c2", user: "Marcus W.", avatar: "https://images.unsplash.com/photo-1584598788787-e6ce5159df0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", text: "The colors here are so vibrant. How long did this take you?", time: "4h ago", likes: 18 },
  { id: "c3", user: "Amara O.", avatar: "https://images.unsplash.com/photo-1763244737829-5e987d40228c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", text: "This is art goals 😍 I wish I could draw like this", time: "6h ago", likes: 41 },
  { id: "c4", user: "Dex R.", avatar: "https://images.unsplash.com/photo-1584598788787-e6ce5159df0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", text: "The composition is perfect. Love the depth you created!", time: "1d ago", likes: 12 },
];

export function DrawingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const drawing = drawings.find((d) => d.id === id) || drawings[0];
  const [liked, setLiked] = useState(drawing.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(drawing.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [following, setFollowing] = useState(drawing.artist.isFollowing ?? false);
  const [comment, setComment] = useState("");
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const related = drawings.filter((d) => d.id !== drawing.id && (d.category === drawing.category || d.artist.id === drawing.artist.id)).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0d0d14] pt-16 pb-16">
      {/* Back button */}
      <div className="sticky top-16 z-10 bg-[#0d0d14]/90 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl transition-colors ${bookmarked ? "bg-violet-500/20 text-violet-400" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
            </button>
            <button className="p-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Drawing */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl overflow-hidden bg-[#1a1a2e] border border-white/5"
            >
              <div className="relative">
                <img
                  src={drawing.image}
                  alt={drawing.title}
                  className="w-full object-cover max-h-[70vh]"
                />
                {drawing.isFeatured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-white" />
                    <span className="text-white text-sm" style={{ fontWeight: 600 }}>Hall of Fame</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-white mb-1" style={{ fontWeight: 800 }}>{drawing.title}</h1>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10">{drawing.category}</span>
                      <span>{timeAgo(drawing.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {drawing.description && (
                  <p className="text-gray-300 mb-4">{drawing.description}</p>
                )}

                {/* Hashtags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {drawing.hashtags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/explore?tag=${tag}`}
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
                    >
                      <Hash className="w-3 h-3" />
                      {tag}
                    </Link>
                  ))}
                </div>

                {/* Action Row */}
                <div className="flex items-center gap-3 pb-6 border-b border-white/5">
                  <button
                    onClick={() => { setLiked(!liked); setLikeCount(liked ? likeCount - 1 : likeCount + 1); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      liked ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-white/5 text-gray-400 hover:bg-rose-500/10 hover:text-rose-400 border border-white/10"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                    {formatCount(likeCount)}
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition-colors border border-white/10">
                    <MessageCircle className="w-4 h-4" />
                    {formatCount(drawing.comments)}
                  </button>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-500 text-sm border border-white/10">
                    <Eye className="w-4 h-4" />
                    {formatCount(drawing.views)}
                  </div>

                  <div className="flex-1" />

                  <button
                    onClick={() => setShowChallengeModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20"
                  >
                    <Swords className="w-4 h-4" />
                    Challenge Artist
                  </button>
                </div>

                {/* Comments */}
                <div className="pt-4">
                  <h3 className="text-white mb-4" style={{ fontWeight: 600 }}>Comments ({drawing.comments})</h3>

                  {/* Comment Input */}
                  <div className="flex gap-3 mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1624091844772-554661d10173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200"
                      alt="You"
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 flex gap-2">
                      <input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500/50"
                        onKeyDown={(e) => e.key === "Enter" && setComment("")}
                      />
                      <button
                        onClick={() => setComment("")}
                        className="p-2 rounded-xl bg-violet-500 hover:bg-violet-600 transition-colors"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Comment List */}
                  <div className="space-y-4">
                    {mockComments.map((c) => (
                      <div key={c.id} className="flex gap-3">
                        <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white text-sm" style={{ fontWeight: 600 }}>{c.user}</span>
                            <span className="text-gray-600 text-xs">{c.time}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{c.text}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="flex items-center gap-1 text-gray-500 text-xs hover:text-rose-400 transition-colors">
                              <Heart className="w-3 h-3" /> {c.likes}
                            </button>
                            <button className="text-gray-500 text-xs hover:text-violet-400 transition-colors">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Artist Card */}
            <div className="rounded-2xl bg-[#1a1a2e] border border-white/5 p-5">
              <h3 className="text-gray-400 text-sm mb-4" style={{ fontWeight: 600 }}>ARTIST</h3>
              <Link to={`/profile/${drawing.artist.id}`} className="flex items-center gap-3 mb-4 group">
                <img
                  src={drawing.artist.avatar}
                  alt={drawing.artist.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-white/10 group-hover:border-violet-400/50 transition-colors"
                />
                <div>
                  <h4 className="text-white group-hover:text-violet-400 transition-colors" style={{ fontWeight: 600 }}>{drawing.artist.name}</h4>
                  <p className="text-gray-500 text-sm">{drawing.artist.username}</p>
                </div>
              </Link>
              <p className="text-gray-400 text-sm mb-4">{drawing.artist.bio}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-center p-2 rounded-xl bg-white/5">
                  <div className="text-white text-sm" style={{ fontWeight: 700 }}>{formatCount(drawing.artist.followers)}</div>
                  <div className="text-gray-500 text-[10px]">Followers</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/5">
                  <div className="text-white text-sm" style={{ fontWeight: 700 }}>{formatCount(drawing.artist.totalLikes)}</div>
                  <div className="text-gray-500 text-[10px]">Total Likes</div>
                </div>
              </div>
              <button
                onClick={() => setFollowing(!following)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all ${
                  following
                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    : "bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:opacity-90"
                }`}
              >
                {following ? <><UserCheck className="w-4 h-4" /> Following</> : <><UserPlus className="w-4 h-4" /> Follow</>}
              </button>
            </div>

            {/* More from Artist */}
            <div className="rounded-2xl bg-[#1a1a2e] border border-white/5 p-5">
              <h3 className="text-gray-400 text-sm mb-4" style={{ fontWeight: 600 }}>MORE FROM THIS ARTIST</h3>
              <div className="grid grid-cols-2 gap-2">
                {drawings.filter((d) => d.artist.id === drawing.artist.id && d.id !== drawing.id).slice(0, 4).map((d) => (
                  <Link key={d.id} to={`/drawing/${d.id}`} className="group relative rounded-xl overflow-hidden aspect-square">
                    <img src={d.image} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h3 className="text-gray-400 text-sm mb-4" style={{ fontWeight: 600 }}>RELATED ART</h3>
                <div className="space-y-3">
                  {related.slice(0, 3).map((d) => (
                    <Link key={d.id} to={`/drawing/${d.id}`} className="flex gap-3 group">
                      <img src={d.image} alt={d.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform" />
                      <div>
                        <h4 className="text-white text-sm group-hover:text-violet-400 transition-colors" style={{ fontWeight: 600 }}>{d.title}</h4>
                        <p className="text-gray-500 text-xs">{d.artist.username}</p>
                        <p className="text-gray-600 text-xs mt-0.5">♥ {formatCount(d.likes)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Challenge Modal */}
      {showChallengeModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowChallengeModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#1a1a2e] border border-white/10 rounded-3xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-500/30">
                <Swords className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-xl mb-1" style={{ fontWeight: 700 }}>Challenge {drawing.artist.name}!</h3>
              <p className="text-gray-400 text-sm">Can you draw better than <span className="text-violet-400">{drawing.artist.username}</span>?</p>
            </div>
            <div className="space-y-3 mb-6">
              <div>
                <label className="text-gray-400 text-xs block mb-1">Your Challenge Message</label>
                <input
                  placeholder="e.g. I can draw a better dragon than you!"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs block mb-1">Theme / Topic</label>
                <input
                  placeholder="What should you both draw?"
                  defaultValue={drawing.category}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/50"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowChallengeModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowChallengeModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm hover:opacity-90 transition-opacity"
              >
                Send Challenge 🔥
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
