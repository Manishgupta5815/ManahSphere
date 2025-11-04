import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LoggedInNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const location = useLocation();

  useEffect(() => {
    const storedName = localStorage.getItem("username") || "User";
    setUsername(storedName);
  }, []);

  const navItems = [
    { label: "Feed", path: "/feed" },
    { label: "Create Post", path: "/create" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">
        {/* Brand */}
        <Link
          to="/feed"
          className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          MindScape
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition ${
                location.pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side greeting */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-gray-700 font-medium">
            Hey, <span className="text-blue-600 font-semibold">{username}</span>
          </span>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="ml-4 px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:text-white hover:bg-blue-600 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <div className="flex flex-col items-center gap-4 py-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium transition ${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="text-gray-700 font-medium">
              Hey, <span className="text-blue-600 font-semibold">{username}</span>
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:text-white hover:bg-blue-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LoggedInNavbar;
