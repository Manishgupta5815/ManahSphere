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
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen overflow-x-hidden transition-colors duration-500">
      {/* Fixed Sidebars */}
      <SidebarLeft />
      <SidebarRight />

      {/* Main Feed Section */}
      <main
        className="flex flex-col items-center pt-16 px-6"
        style={{
          marginLeft: "24rem",
          marginRight: "24rem",
        }}
      >
        {/* Post Input */}
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <PostInput onPost={handleNewPost} />
        </motion.div>

        {/* Posts Section */}
        <div className="w-full max-w-4xl mt-6 space-y-6">
          <AnimatePresence>
            {posts.length === 0 ? (
              <motion.div
                key="no-posts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center text-gray-500 mt-10 text-[16px]"
              >
                No posts yet. Be the first to share something insightful!
              </motion.div>
            ) : (
              posts.map((post, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
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
