import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Settings, HelpCircle, LogOut, MoreHorizontal } from "lucide-react";

const MoreMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // if you're storing JWT
    navigate("/login");
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* More Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all"
      >
        <MoreHorizontal size={22} className="text-gray-700" />
        <span className="text-gray-800 font-medium">More</span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-2">
          <Link
            to="/settings"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
            onClick={() => setOpen(false)}
          >
            <Settings size={18} className="text-gray-600" />
            <span>Settings</span>
          </Link>

          <Link
            to="/help"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
            onClick={() => setOpen(false)}
          >
            <HelpCircle size={18} className="text-gray-600" />
            <span>Help & Support</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-red-600 w-full text-left transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreMenu;
