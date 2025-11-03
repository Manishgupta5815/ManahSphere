import React, { useEffect, useState } from "react";
import {
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Repeat2,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PostCard = ({ post }) => {
  const [analyzed, setAnalyzed] = useState(false);

  // Simulate delayed AI emotion reveal
  useEffect(() => {
    const timer = setTimeout(() => setAnalyzed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white border border-gray-200 rounded-2xl shadow-[0_3px_12px_rgba(0,0,0,0.05)] 
      mb-6 transition-all duration-300 hover:shadow-[0_5px_18px_rgba(0,0,0,0.08)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6 pb-3">
        <div className="flex items-start gap-3">
          <img
            src="/profile.jpg"
            alt="User"
            className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm"
          />
          <div>
            <h3 className="text-[17px] font-semibold text-slate-800">
              {post.user || "Anonymous User"}
            </h3>
            <p className="text-[14px] text-gray-500 leading-tight">
              Software Engineer · {post.time || "Recently"}
            </p>
          </div>
        </div>
        <MoreHorizontal
          size={20}
          className="text-gray-500 hover:text-[#0A4D68] cursor-pointer transition"
        />
      </div>

      {/* Content */}
      <div className="px-6 pb-4 text-[17px] leading-relaxed text-slate-800 whitespace-pre-line">
        {post.text}
      </div>

      {/* Optional Image */}
      {post.image && (
        <div className="px-6 pb-4">
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-xl border border-gray-200 object-cover"
          />
        </div>
      )}

      {/* Animated Emotion Tag */}
      <div className="min-h-[30px] px-6 pb-3">
        <AnimatePresence mode="wait">
          {!analyzed ? (
            <motion.p
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-gray-500 italic text-[15px]"
            >
               Analyzing sentiment...
            </motion.p>
          ) : (
            post.emotion && (
              <motion.div
                key="emotion"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-[15px] font-medium text-[#0A4D68] flex items-center gap-2"
              >
                <span className="text-[18px]">{post.emotion.emoji}</span>
                <span>{post.emotion.label}</span>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Action Buttons */}
      <div className="flex justify-around items-center text-gray-600 text-[16px] px-6 py-3 select-none">
        <button className="flex items-center gap-2 hover:text-[#0A4D68] transition-all duration-200 hover:scale-[1.05]">
          <ThumbsUp size={18} strokeWidth={1.8} /> Like
        </button>
        <button className="flex items-center gap-2 hover:text-[#0A4D68] transition-all duration-200 hover:scale-[1.05]">
          <MessageCircle size={18} strokeWidth={1.8} /> Comment
        </button>
        <button className="flex items-center gap-2 hover:text-[#0A4D68] transition-all duration-200 hover:scale-[1.05]">
          <Repeat2 size={18} strokeWidth={1.8} /> Repost
        </button>
        <button className="flex items-center gap-2 hover:text-[#0A4D68] transition-all duration-200 hover:scale-[1.05]">
          <Send size={18} strokeWidth={1.8} /> Send
        </button>
      </div>
    </motion.div>
  );
};

export default PostCard;
