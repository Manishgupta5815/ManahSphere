import React from "react";
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Bell,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logoFull from "../assets/logo.png"; 

const SidebarLeft = () => {
  const navItems = [
    { icon: <Home size={18} />, label: "Home", path: "/" },
    { icon: <Search size={18} />, label: "Search", path: "/search" },
    { icon: <Compass size={18} />, label: "Explore", path: "/explore" },
    { icon: <MessageCircle size={18} />, label: "Messages", path: "/messages" },
    { icon: <Bell size={18} />, label: "Notifications", path: "/notifications" },
    { icon: <User size={18} />, label: "Profile", path: "/profile" },
  ];

  const bottomItems = [
    { icon: <Settings size={18} />, label: "Settings" },
    { icon: <HelpCircle size={18} />, label: "Help & Support" },
  ];

  return (
    <div
      className="fixed top-0 left-0 w-[18rem] h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white
      border-r border-gray-200 shadow-sm flex flex-col justify-between transition-all duration-300 z-40"
    >
      {/* 🔹 Top Section with Full Logo */}
      <div>
<div className="px-2 mt-2 border-b border-gray-100 text-center">
  <div className="flex flex-col items-center justify-center overflow-visible">
    {/* Logo */}
    <img
      src={logoFull}
      alt="मनःSphere Full Logo"
      className="h-20 md:h-20 w-auto object-contain select-none contrast-100 brightness-100"
      draggable="false"
      loading="eager"
    />

    {/* Shadow under the globe */}
    <svg
      className="-mt-1"
      width="90"           
      height="16"
      viewBox="0 0 180 16"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="globeShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopOpacity="0.28" stopColor="#000" />
          <stop offset="100%" stopOpacity="0" stopColor="#000" />
        </radialGradient>
      </defs>
      <ellipse
        cx="90" cy="8" rx="84" ry="6"
        fill="url(#globeShadow)"
      />
    </svg>

    {/* Tagline */}
    <p className="text-gray-500 text-[13px] mt-2 tracking-wide">
      Your <span className="text-blue-600 font-medium">AI-powered</span> space
    </p>
  </div>
</div>



        {/* 🔹 Navigation Items */}
        <div className="flex flex-col gap-2.5 mt-5 px-6">
          {navItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 text-[14px] font-medium px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                ${isActive
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700"}`
              }
            >
              <span className="text-gray-600 group-hover:text-blue-600">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* 🔹 Bottom Section */}
      <div className="px-6 py-4 border-t border-gray-100">
        {bottomItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-[13px] text-gray-600 hover:bg-gradient-to-r 
            hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 px-3 py-2 rounded-lg 
            cursor-pointer transition-all duration-200"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
        <p className="text-gray-400 text-[12px] mt-4">© 2025 MindScape Inc.</p>
      </div>
    </div>
  );
};

export default SidebarLeft;
