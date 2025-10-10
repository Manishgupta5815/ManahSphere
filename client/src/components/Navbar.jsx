import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      <h1 className="text-2xl font-semibold text-blue-700">MindEase 💙</h1>
      <div className="flex gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/journal" className="text-gray-700 hover:text-blue-600">
          Journal
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600">
          Login
        </Link>
        <Link to="/signup" className="text-gray-700 hover:text-blue-600">
          Signup
        </Link>
      </div>
    </nav>
  );
}
