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
      className="bg-white border border-gray-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
      w-full mx-auto max-w-4xl mb-8 transition-all duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.08)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between px-8 pt-7 pb-4">
        <div className="flex items-start gap-4">
          <img
            src="/profile.jpg"
            alt="User"
            className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow-sm"
          />
          <div>
            <h3 className="text-[18px] font-semibold text-slate-800">
              {post.user || "Anonymous User"}
            </h3>
            <p className="text-[15px] text-gray-500 leading-tight">
              Software Engineer · {post.time || "Recently"}
            </p>
          </div>
        </div>
        <MoreHorizontal
          size={22}
          className="text-gray-500 hover:text-[#0A4D68] cursor-pointer transition"
        />
      </div>

      {/* Post Content */}
      <div className="px-8 pb-5 text-[18px] leading-relaxed text-slate-800 whitespace-pre-line">
        {post.text}
      </div>

      {/* Optional Image */}
      {post.image && (
        <div className="px-8 pb-5">
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-xl border border-gray-200 object-cover"
          />
        </div>
      )}

      {/* Emotion / AI Result */}
      <div className="min-h-[35px] px-8 pb-4">
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
                className="text-[16px] font-medium text-[#0A4D68] flex items-center gap-2"
              >
                <span className="text-[20px]">{post.emotion.emoji}</span>
                <span>{post.emotion.label}</span>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      <hr className="border-gray-200" />

      {/* Action Buttons */}
      <div className="flex justify-around items-center text-gray-600 text-[16px] px-8 py-4 select-none">
        <button className="flex items-center gap-2 hover:text-[#0A4D68] transition-all duration-200 hover:scale-[1.05]">
          <ThumbsUp size={20} strokeWidth={1.8} /> Like
        </button>
        <button className="flex items-center gap-2 hover:text-[#0A4D68] transition-all duration-200 hover:scale-[1.05]">
          <MessageCircle size={20} strokeWidth={1.8} /> Comment
        </button>
        <button className="flex items-center gap-2 hover:text-[#0A4D68] transition-all duration-200 hover:scale-[1.05]">
          <Repeat2 size={20} strokeWidth={1.8} /> Repost
        </button>
        <button className="flex items-center gap-2 hover:text-[#0A4D68] transition-all duration-200 hover:scale-[1.05]">
          <Send size={20} strokeWidth={1.8} /> Send
        </button>
      </div>
    </motion.div>
  );
};

export default PostCard;
