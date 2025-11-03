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
      className="bg-white border-l border-gray-200 h-screen shadow-sm flex flex-col justify-between
      rounded-tl-2xl rounded-bl-2xl p-8 w-full transition-all duration-300"
    >
      {/* Top Section */}
      <div>
        {/* Suggested Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-[#0A4D68]" size={20} />
            <h3 className="text-[#0A4D68] font-semibold text-[18px]">
              Suggested for you
            </h3>
          </div>

          <div className="flex flex-col gap-5">
            {suggested.map((user, i) => (
              <div
                key={i}
                className="flex justify-between items-center hover:bg-[#F8FAFC] px-3 py-2 rounded-xl transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/profile.jpg"
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <span className="block text-[16px] font-medium text-slate-800">
                      {user.name}
                    </span>
                    <span className="text-[13px] text-gray-500">
                      {user.role}
                    </span>
                  </div>
                </div>
                <button className="text-[#0A4D68] text-[15px] font-semibold hover:underline">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        {/* Trending Topics */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-[#0A4D68]" size={20} />
            <h3 className="text-[#0A4D68] font-semibold text-[18px]">
              Trending Topics
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {trending.map((t, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-[15px] text-slate-700 hover:text-[#0A4D68] cursor-pointer transition"
              >
                <span>{t.topic}</span>
                <span className="text-gray-500 text-[14px]">
                  {t.posts} posts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-5">
        <div className="flex items-center gap-2 text-gray-400 text-[14px] hover:text-[#0A4D68] cursor-pointer transition">
          <Info size={16} />
          <span>About MindScape</span>
        </div>
        <p className="text-gray-400 text-[13px] mt-3">
          © 2025 MindScape Inc. · Empowered by AI
        </p>
      </div>
    </div>
  );
};

export default SidebarRight;
