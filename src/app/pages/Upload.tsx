import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Upload, Image, Hash, X, ChevronLeft, Sparkles, CheckCircle } from "lucide-react";
import { categories } from "../mockData";

export function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const addHashtag = () => {
    const tag = hashtagInput.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    if (tag && !hashtags.includes(tag) && hashtags.length < 10) {
      setHashtags([...hashtags, tag]);
      setHashtagInput("");
    }
  };

  const removeHashtag = (tag: string) => setHashtags(hashtags.filter((h) => h !== tag));

  const handleSubmit = () => {
    if (!preview || !title || !selectedCategory) return;
    setSubmitted(true);
    setTimeout(() => navigate("/"), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-500/30">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-white text-2xl mb-2" style={{ fontWeight: 700 }}>Art Posted! 🎉</h2>
          <p className="text-gray-400">Your drawing is live on DrawVerse</p>
          <p className="text-gray-600 text-sm mt-2">Redirecting to home...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d14] pt-16 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <div>
            <h1 className="text-white" style={{ fontWeight: 700 }}>Post Your Art</h1>
            <p className="text-gray-400 text-sm">Share your creation with the world</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Upload Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => !preview && fileInputRef.current?.click()}
            className={`relative rounded-3xl overflow-hidden border-2 border-dashed transition-all cursor-pointer ${
              isDragging ? "border-violet-500 bg-violet-500/10" :
              preview ? "border-violet-500/40 cursor-default" :
              "border-white/20 hover:border-violet-500/40 hover:bg-white/5"
            } ${preview ? "" : "aspect-video flex items-center justify-center"}`}
          >
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full max-h-[60vh] object-contain bg-[#12121f]" />
                <button
                  onClick={() => setPreview(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </>
            ) : (
              <div className="text-center p-10">
                <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-violet-400" />
                </div>
                <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>Drop your drawing here</h3>
                <p className="text-gray-500 text-sm">or click to browse · PNG, JPG, GIF, WebP</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {/* Title */}
          <div>
            <label className="text-gray-300 text-sm block mb-2" style={{ fontWeight: 500 }}>Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your artwork a title"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 text-sm block mb-2" style={{ fontWeight: 500 }}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Tell the story behind your art..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500/50 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-gray-300 text-sm block mb-2" style={{ fontWeight: 500 }}>Category *</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                    selectedCategory === cat.id
                      ? "bg-violet-500 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <label className="text-gray-300 text-sm block mb-2" style={{ fontWeight: 500 }}>Hashtags (up to 10)</label>
            <div className="flex gap-2 mb-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl">
                <Hash className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <input
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addHashtag()}
                  placeholder="Add a hashtag..."
                  className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-600"
                />
              </div>
              <button
                onClick={addHashtag}
                className="px-4 py-2 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30 text-sm hover:bg-violet-500/30 transition-colors"
              >
                Add
              </button>
            </div>
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20"
                  >
                    #{tag}
                    <button onClick={() => removeHashtag(tag)} className="hover:text-rose-400 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!preview || !title || !selectedCategory}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25"
            style={{ fontWeight: 600 }}
          >
            <Sparkles className="w-5 h-5" />
            Publish Your Art
          </button>
        </div>
      </div>
    </div>
  );
}
