import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import SidebarLeftUpdated from "../components/SidebarLeft";
import SidebarRightUpdated from "../components/SidebarRight";
import PostInput from "../components/PostInput";
import PostCard from "../components/PostCard";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter((p) => {
      const text = `${p.text ?? ""} ${p.user ?? ""} ${p.username ?? ""}`.toLowerCase();
      return text.includes(q);
    });
  }, [posts, query]);

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-800 transition-colors duration-300">
      {/* Sidebars */}
      <SidebarLeftUpdated />
      <SidebarRightUpdated />

      {/* Main Feed Area */}
      <main className="ml-72 mr-80 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Search Bar */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts, authors or topics..."
                className="w-full bg-[#fafbff] border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
              />
            </div>
          </div>

          {/* Post Input Box */}
          <div className="bg-white  ">
            <PostInput onPost={handleNewPost} />
          </div>

          {/* Feed Posts */}
          <div className="space-y-5">
            {filteredPosts.length === 0 ? (
              <div className="text-center text-gray-500 bg-white border border-gray-200 rounded-xl shadow-sm py-10">
                {posts.length === 0
                  ? "No posts yet. Be the first to share something insightful 💭"
                  : "No posts matched your search."}
              </div>
            ) : (
              filteredPosts.map((post, index) => (
                <div key={post.id || index} className="bg-white border border-gray-200 rounded-xl shadow-sm">
                  <PostCard post={post} />
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedPage;
