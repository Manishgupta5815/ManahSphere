import React from "react";
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Bell,
  PlusCircle,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";

const SidebarLeft = () => {
  const navItems = [
    { icon: <Home size={22} />, label: "Home" },
    { icon: <Search size={22} />, label: "Search" },
    { icon: <Compass size={22} />, label: "Explore" },
    { icon: <MessageCircle size={22} />, label: "Messages" },
    { icon: <Bell size={22} />, label: "Notifications" },
    { icon: <PlusCircle size={22} />, label: "Create Post" },
    { icon: <User size={22} />, label: "Profile" },
  ];

  const bottomItems = [
    { icon: <Settings size={22} />, label: "Settings" },
    { icon: <HelpCircle size={22} />, label: "Help & Support" },
  ];

  return (
    <div
      className="bg-white border-r border-gray-200 h-screen shadow-sm flex flex-col justify-between 
      rounded-tr-2xl rounded-br-2xl transition-all duration-300 w-full"
    >
      {/* Top Section */}
      <div>
        <div className="px-8 py-6 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-[#0A4D68] tracking-tight">
            MindScape
          </h1>
          <p className="text-gray-500 text-[15px] mt-1">Your AI-powered space</p>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-4 mt-6 px-8">
          {navItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 text-[17px] text-gray-700 font-medium 
              hover:text-[#0A4D68] hover:bg-[#F8FAFC] px-4 py-2 rounded-xl cursor-pointer 
              transition-all duration-200 hover:translate-x-[3px]"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-8 py-5 border-t border-gray-100">
        {bottomItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-[16px] text-gray-600 hover:text-[#0A4D68] 
            hover:bg-[#F8FAFC] px-4 py-2 rounded-xl cursor-pointer transition-all duration-200"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
        <p className="text-gray-400 text-[13px] mt-5">
          © 2025 MindScape Inc.
        </p>
      </div>
    </div>
  );
};

export default SidebarLeft;
