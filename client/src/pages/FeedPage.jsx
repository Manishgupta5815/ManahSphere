import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import PostInput from "../components/PostInput";
import PostCard from "../components/PostCard";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter((p) => {
      const text = `${p.text ?? ""} ${p.author ?? ""} ${p.title ?? ""}`.toLowerCase();
      return text.includes(q);
    });
  }, [posts, query]);

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
        className="flex flex-col items-center pt-14 px-4 sm:px-6" // reduced top padding for balanced height
        style={{
          marginLeft: "18rem",
          marginRight: "18rem",
        }}
      >
        {/* Search + Post Input Container */}
        <div className="w-full max-w-2xl relative flex flex-col items-center">
          {/* Search Bar (slightly lifted to appear in middle visually) */}
          <motion.div
            className="w-full absolute -top-10" // Moves the search bar up visually
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="flex items-center w-full bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts, authors or topics..."
                className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                aria-label="Search posts"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-sm text-gray-500 hover:text-gray-700 ml-2"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>

          {/* Post Input Section */}
          <motion.div
            className="w-full flex justify-center mt-10" // keeps perfect spacing below lifted search bar
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <PostInput onPost={handleNewPost} />
          </motion.div>
        </div>

        {/* Feed Posts */}
        <div className="w-full max-w-2xl mt-8 space-y-6">
          <AnimatePresence>
            {filteredPosts.length === 0 ? (
              <motion.div
                key="no-posts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center text-gray-500 mt-10 text-[15px]"
              >
                {posts.length === 0
                  ? "No posts yet. Be the first to share something insightful 💭"
                  : "No posts matched your search."}
              </motion.div>
            ) : (
              filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.id ?? idx}
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
