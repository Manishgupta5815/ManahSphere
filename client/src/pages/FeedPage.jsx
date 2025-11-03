import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoggedInNavbar from "../components/LoggedInNavbar";
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
      className="bg-[#F8FAFC] text-slate-900 min-h-screen overflow-x-hidden transition-colors duration-500"
    >
      {/* Navbar */}
      <LoggedInNavbar className="fixed top-0 w-full z-50 shadow-sm bg-[#0A4D68] text-white" />

      {/* Layout */}
      <div className="flex justify-center pt-24 px-6">
        {/* Left Sidebar */}
        <aside className="hidden xl:flex w-80 mr-8">
          <SidebarLeft />
        </aside>

        {/* Main Feed */}
        <main className="flex-1 max-w-2xl">
          {/* Animated PostInput */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <PostInput onPost={handleNewPost} />
          </motion.div>

          {/* Feed Posts */}
          <div className="space-y-6 mt-6">
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

        {/* Right Sidebar */}
        <aside className="hidden xl:flex w-84 ml-8">
          <SidebarRight />
        </aside>
      </div>
    </div>
  );
};

export default FeedPage;
