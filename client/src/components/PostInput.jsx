import React, { useState } from "react";
import { Image, Video, Send } from "lucide-react";

const emotions = [
  { label: "Joy", emoji: "😄" },
  { label: "Sadness", emoji: "😢" },
  { label: "Anger", emoji: "😡" },
  { label: "Fear", emoji: "😨" },
  { label: "Love", emoji: "❤️" },
  { label: "Neutral", emoji: "😐" },
];

const PostInput = ({ onPost }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = () => {
    if (!text.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const randomEmotion =
        emotions[Math.floor(Math.random() * emotions.length)];
      const newPost = {
        user: "Ankit Shaw",
        text,
        emotion: randomEmotion,
        time: "Just now",
      };
      onPost(newPost);
      setText("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl shadow-[0_4px_22px_rgba(0,0,0,0.06)] 
      p-8 mb-8 transition-all duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.08)] 
      w-full mx-auto max-w-4xl"
    >
      {/* Header Section */}
      <div className="flex items-start gap-6 mb-6">
        <img
          src="/profile.jpg"
          alt="User"
          className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow-sm"
        />

        <div className="flex-1">
          <textarea
            placeholder="Share your thoughts, reflections, or experiences..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={text ? 5 : 3}
            className="w-full bg-gray-50 border border-gray-200 focus:border-[#0A4D68] focus:ring-2 
            focus:ring-[#0A4D68]/30 rounded-xl px-6 py-5 text-[18px] leading-relaxed text-slate-800 resize-none 
            outline-none placeholder-gray-500 transition-all duration-300 min-h-[160px]"
          />
        </div>
      </div>

      <hr className="border-gray-200 mb-5" />

      {/* Footer Controls */}
      <div className="flex justify-between items-center">
        {/* Left Buttons */}
        <div className="flex gap-10 text-gray-600 text-[16px]">
          <button className="flex items-center gap-2 hover:text-[#0A4D68] transition-all duration-150 hover:scale-[1.03]">
            <Image size={24} strokeWidth={1.8} /> <span>Photo</span>
          </button>
          <button className="flex items-center gap-2 hover:text-[#0A4D68] transition-all duration-150 hover:scale-[1.03]">
            <Video size={24} strokeWidth={1.8} /> <span>Video</span>
          </button>
        </div>

        {/* Post Button */}
        <button
          onClick={handlePost}
          disabled={!text.trim() || loading}
          className={`flex items-center gap-2 px-9 py-3 text-[17px] font-semibold rounded-full transition-all duration-200
            ${
              !text.trim() || loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#0A4D68] text-white hover:bg-[#0c5d82] shadow-sm hover:shadow-md hover:scale-[1.02]"
            }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Posting...
            </>
          ) : (
            <>
              <Send size={20} strokeWidth={1.8} /> Post
            </>
          )}
        </button>
      </div>

      {/* Subtle AI Message */}
      {loading && (
        <div className="mt-4 text-right text-[#0A4D68] text-[15px] italic animate-pulse">
          MindScape AI is analyzing your post sentiment...
        </div>
      )}
    </div>
  );
};

export default PostInput;
