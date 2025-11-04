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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white border border-gray-200 rounded-xl shadow-sm 
      w-full mx-auto max-w-2xl mb-6 transition-all duration-300 hover:shadow-[0_4px_14px_rgba(59,130,246,0.1)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-5 pb-3">
        <div className="flex items-start gap-3">
          <img
            src="/profile.jpg"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <div>
            <h3 className="text-[15px] font-semibold text-slate-800">
              {post.user || "Anonymous User"}
            </h3>
            <p className="text-[13px] text-gray-500 leading-tight">
              Software Engineer · {post.time || "Recently"}
            </p>
          </div>
        </div>
        <MoreHorizontal
          size={18}
          className="text-gray-500 hover:text-blue-600 cursor-pointer transition"
        />
      </div>

      {/* Post Content */}
      <div className="px-5 pb-3 text-[15px] leading-relaxed text-slate-800 whitespace-pre-line">
        {post.text}
      </div>

      {/* Optional Image */}
      {post.image && (
        <div className="px-5 pb-3">
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-lg border border-gray-200 object-cover"
          />
        </div>
      )}

      {/* Emotion / AI Result */}
      {/* Emotion / AI Result */}
      <div className="min-h-[28px] px-5 pb-3">
        <AnimatePresence mode="wait">
          {!analyzed ? (
            <motion.p
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-500 italic text-[13px]"
            >
              Analyzing sentiment...
            </motion.p>
          ) : (
            post.emotion && (
              <motion.div
                key="emotion"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-[14px] font-medium"
              >
                {/* Emoji — keep its natural color */}
                <span className="text-[17px]">{post.emotion.emoji}</span>

                {/* Label — gradient applied only to this */}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {post.emotion.label}
                </span>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      <hr className="border-gray-200" />

      {/* Action Buttons */}
      <div className="flex justify-around items-center text-gray-600 text-[13.5px] px-5 py-2.5 select-none">
        {[
          { icon: <ThumbsUp size={16} strokeWidth={1.7} />, label: "Like" },
          { icon: <MessageCircle size={16} strokeWidth={1.7} />, label: "Comment" },
          { icon: <Repeat2 size={16} strokeWidth={1.7} />, label: "Repost" },
          { icon: <Send size={16} strokeWidth={1.7} />, label: "Send" },
        ].map(({ icon, label }, i) => (
          <button
            key={i}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-all duration-200 hover:scale-[1.03]"
          >
            {icon} {label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default PostCard;
