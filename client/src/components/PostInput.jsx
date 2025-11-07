import React, { useState } from "react";
import { Image, Video, Send } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/predict";

const PostInput = ({ onPost }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fallback emoji map (used only if backend doesn't send emoji/color)
  const EMOJI_MAP = {
    joy: "😄",
    sadness: "😢",
    anger: "😡",
    fear: "😨",
    love: "❤️",
    neutral: "😐",
    surprise: "😮",
  };

  // Pretty label for display (capitalize first letter)
  const pretty = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  const handlePost = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      // Normalize label from backend (your backend returns lowercase, e.g. "sadness")
      const rawLabel = data.emotion || "";
      const label = rawLabel.toString().trim().toLowerCase();

      // Prefer backend emoji/color; fallback to local map and neutral color
      const emoji = data.emoji || EMOJI_MAP[label] || "😐";
      const color = data.color || "#708090";

      const newPost = {
        user: "Ankit Shaw",
        text,
        emotion: {
          label,                 // keep lowercase internally
          labelPretty: pretty(label), // optional: nice display label
          emoji,
          color,
        },
        confidence: data.confidence, // e.g., 86.0
        time: "Just now",
      };

      onPost?.(newPost);
      setText("");
    } catch (error) {
      console.error("❌ Error connecting to backend:", error);
      alert("Failed to connect to AI model. Check that the FastAPI backend is running and CORS is allowed.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div
      className="bg-white border border-gray-200 rounded-xl shadow-sm 
                 p-5 mb-6 transition-all duration-300 hover:shadow-[0_4px_14px_rgba(59,130,246,0.08)] 
                 w-full mx-auto max-w-2xl"
    >
      {/* Header Section */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src="/profile.jpg"
          alt="User"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
        <div className="flex-1">
          <textarea
            placeholder="Share your thoughts..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={text ? 3 : 2}
            className="w-full bg-[#fafbff] border border-gray-200 focus:border-blue-500 focus:ring-2 
                       focus:ring-blue-300/30 rounded-lg px-4 py-3 text-[15px] leading-relaxed text-slate-800 
                       resize-none outline-none placeholder-gray-500 transition-all duration-300"
          />
        </div>
      </div>

      <hr className="border-gray-200 mb-3" />

      {/* Footer Controls */}
      <div className="flex justify-between items-center">
        {/* Left Buttons */}
        <div className="flex gap-6 text-gray-600 text-[13.5px]">
          <button
            type="button"
            className="flex items-center gap-1.5 hover:text-blue-600 transition-all duration-150 hover:scale-[1.03]"
          >
            <Image size={18} strokeWidth={1.7} /> Photo
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 hover:text-purple-600 transition-all duration-150 hover:scale-[1.03]"
          >
            <Video size={18} strokeWidth={1.7} /> Video
          </button>
        </div>

        {/* Post Button */}
        <button
          type="button"
          onClick={handlePost}
          disabled={!text.trim() || loading}
          className={`flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold rounded-full transition-all duration-300 
            ${
              !text.trim() || loading
                ? "bg-gradient-to-r from-blue-300 to-purple-300 text-white-600 clip-text  cursor-not-allowed shadow-inner"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-[1.04] active:scale-[0.97]"
            }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Posting...
            </>
          ) : (
            <>
              <Send size={16} strokeWidth={1.8} /> Post
            </>
          )}
        </button>
      </div>

      {/* Subtle AI Message */}
      {loading && (
        <div className="mt-3 text-right bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-[13.5px] italic animate-pulse">
          मनःSphere AI is analyzing your post sentiment...
        </div>
      )}
    </div>
  );
};

export default PostInput;