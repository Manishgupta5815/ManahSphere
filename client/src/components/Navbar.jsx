import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          MindEase
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#home" className="hover:text-blue-600 transition-all">
            Home
          </a>
          <a href="#features" className="hover:text-blue-600 transition-all">
            Features
          </a>
          <a href="#how" className="hover:text-blue-600 transition-all">
            How It Works
          </a>
          <a href="#testimonials" className="hover:text-blue-600 transition-all">
            Testimonials
          </a>

          {/* Right CTA Buttons */}
          <div className="flex items-center gap-4 ml-6">
            <Link
              to="/signup"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-[2px] transition-all"
            >
              Discover Calm
            </Link>
            <Link
              to="/login"
              className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-all"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-200/50 shadow-sm">
          <div className="flex flex-col items-center gap-4 py-6 text-gray-700 font-medium">
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-lg"
            >
              Discover Calm
            </Link>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-50"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
