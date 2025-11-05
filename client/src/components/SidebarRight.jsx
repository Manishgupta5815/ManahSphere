import React from "react";
import { Users, TrendingUp, Info } from "lucide-react";

const SidebarRight = () => {
  const suggested = [
    { name: "captures_by_am", role: "Photographer" },
    { name: "rupsa_", role: "Content Creator" },
    { name: "themunsubo", role: "Tech Enthusiast" },
    { name: "gauravgupta08", role: "Marketing Manager" },
  ];

  const trending = [
    { topic: "#MindfulLiving", posts: "12.4K" },
    { topic: "#AIInnovation", posts: "8.2K" },
    { topic: "#MentalHealth", posts: "6.5K" },
  ];

  return (
    <div
      className="fixed top-0 right-0 w-[18rem] h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white 
      border-l border-gray-200 shadow-sm flex flex-col justify-between p-6 transition-all duration-300 z-40"
    >
      {/* Top Section */}
      <div>
        {/* Suggested Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-blue-600" size={18} />
            <h3 className="font-semibold text-[15px] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Suggested for you
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {suggested.map((user, i) => (
              <div
                key={i}
                className="flex justify-between items-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/profile.jpg"
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <span className="block text-[14px] font-medium text-slate-800">
                      {user.name}
                    </span>
                    <span className="text-[12px] text-gray-500">
                      {user.role}
                    </span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[12px] px-3 py-1 rounded-full font-medium hover:opacity-90 transition">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200" />

        {/* Trending Topics */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-blue-600" size={18} />
            <h3 className="font-semibold text-[15px] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trending Topics
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {trending.map((t, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-[13px] text-slate-700 hover:text-blue-700 cursor-pointer transition"
              >
                <span>{t.topic}</span>
                <span className="text-gray-500 text-[12px]">
                  {t.posts} posts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 text-gray-500 text-[12.5px] hover:text-blue-600 cursor-pointer transition">
          <Info size={14} />
          <span>About MindScape</span>
        </div>
        <p className="text-gray-400 text-[11.5px] mt-2">
          © 2025 MindScape Inc. · Empowered by AI
        </p>
      </div>
    </div>
  );
};

export default SidebarRight;