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
      className="bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white border border-gray-200 rounded-xl shadow-sm 
      p-5 mb-6 transition-all duration-300 hover:shadow-[0_4px_14px_rgba(59,130,246,0.1)] w-full mx-auto max-w-2xl"
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
            className="w-full bg-white/70 border border-gray-200 focus:border-blue-500 focus:ring-2 
            focus:ring-blue-400/30 rounded-lg px-4 py-3 text-[15px] leading-relaxed text-slate-800 resize-none 
            outline-none placeholder-gray-500 transition-all duration-300"
          />
        </div>
      </div>

      <hr className="border-gray-200 mb-3" />

      {/* Footer Controls */}
      <div className="flex justify-between items-center">
        {/* Left Buttons */}
        <div className="flex gap-6 text-gray-600 text-[13.5px]">
          <button className="flex items-center gap-1.5 hover:text-blue-600 transition-all duration-150 hover:scale-[1.02]">
            <Image size={18} strokeWidth={1.7} /> Photo
          </button>
          <button className="flex items-center gap-1.5 hover:text-purple-600 transition-all duration-150 hover:scale-[1.02]">
            <Video size={18} strokeWidth={1.7} /> Video
          </button>
        </div>

        {/* Post Button */}
        <button
          onClick={handlePost}
          disabled={!text.trim() || loading}
          className={`flex items-center gap-2 px-6 py-2 text-[14px] font-semibold rounded-full transition-all duration-300
            ${
              !text.trim() || loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-[1.03]"
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
          MindScape AI is analyzing your post sentiment...
        </div>
      )}
    </div>
  );
};

export default PostInput;
