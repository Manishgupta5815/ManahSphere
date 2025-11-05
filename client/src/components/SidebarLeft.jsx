import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  Compass,
  MessageCircle,
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  MoreHorizontal,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import logoFull from "../assets/logo.png"; // ensure this path is correct

const SidebarLeft = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { icon: <Home size={18} />, label: "Home", path: "/" },
    { icon: <Compass size={18} />, label: "Activities", path: "/activity" },
    { icon: <MessageCircle size={18} />, label: "Messages", path: "/messages" },
    { icon: <Bell size={18} />, label: "Notifications", path: "/notifications" },
    { icon: <User size={18} />, label: "Profile", path: "/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="fixed top-0 left-0 w-[18rem] h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white 
      border-r border-gray-200 shadow-sm flex flex-col justify-start transition-all duration-300 z-40"
    >
      {/* --- Top Section (Logo + Shadow + Tagline + Nav) --- */}
      <div>
        <div className="px-4 pt-4 pb-2 border-b border-gray-100 text-center">
          <div className="flex flex-col items-center justify-center overflow-visible leading-none">
            {/* Logo */}
            <img
              src={logoFull}
              alt="मनःSphere Full Logo"
              className="h-20 w-auto object-contain select-none contrast-125 brightness-110"
              draggable="false"
              loading="eager"
            />

            {/* Shadow under the globe */}
            <svg
              className="-mt-2"
              width="132"
              height="10"
              viewBox="0 0 180 16"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="globeShadow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopOpacity="0.22" stopColor="#000" />
                  <stop offset="100%" stopOpacity="0" stopColor="#000" />
                </radialGradient>
              </defs>
              <ellipse cx="90" cy="8" rx="60" ry="4" fill="url(#globeShadow)" />
            </svg>

            {/* Tagline */}
            <p className="text-gray-500 text-[12px] mt-1 tracking-wide">
              Your <span className="text-blue-600 font-medium">AI-powered</span> space
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-1.5 mt-4 px-4">
          {navItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 text-[14px] font-medium px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700"
                }`
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

      {/* --- Bottom Section  --- */}
      <div
        className="mt-auto px-6 py-4 border-t border-gray-100"
        ref={menuRef}
      >
        {/* More Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 text-[13px] text-gray-700 hover:bg-gradient-to-r 
          hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 px-3 py-2 rounded-lg 
          cursor-pointer transition-all duration-200 w-full"
        >
          <MoreHorizontal size={18} />
          <span>More</span>
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute bottom-16 left-6 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-2">
            <button
              onClick={() => {
                navigate("/settings");
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              <Settings size={18} className="text-gray-600" />
              <span>Settings</span>
            </button>

            <button
              onClick={() => {
                navigate("/help");
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              <HelpCircle size={18} className="text-gray-600" />
              <span>Help & Support</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-gray-100 transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}

        <p className="text-gray-400 text-[12px] mt-4">© 2025 MindScape Inc.</p>
      </div>
    </div>
  );
};

export default SidebarLeft;
