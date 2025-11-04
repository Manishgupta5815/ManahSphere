import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import PostInput from "../components/PostInput";
import PostCard from "../components/PostCard";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div
      className="min-h-screen font-['Inter'] text-gray-800 overflow-x-hidden transition-colors duration-500 
      bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white"
    >
      {/* Fixed Sidebars */}
      <SidebarLeft />
      <SidebarRight />

      {/* Main Feed Area */}
      <main
        className="flex flex-col items-center pt-20 px-4 sm:px-6"
        style={{
          marginLeft: "18rem", // aligned with your smaller sidebar width
          marginRight: "18rem",
        }}
      >
        {/* Post Input Section */}
        <motion.div
          className="w-full flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <PostInput onPost={handleNewPost} />
        </motion.div>

        {/* Feed Posts */}
        <div className="w-full max-w-2xl mt-6 space-y-6">
          <AnimatePresence>
            {posts.length === 0 ? (
              <motion.div
                key="no-posts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center text-gray-500 mt-10 text-[15px]"
              >
                No posts yet. Be the first to share something insightful 💭
              </motion.div>
            ) : (
              posts.map((post, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default FeedPage;
