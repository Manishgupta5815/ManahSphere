import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 text-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-blue-800 mb-4"
      >
        MindEase 💙
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-gray-700 text-lg md:text-xl max-w-xl mb-8"
      >
        Your mental health companion — reflect, understand, and grow 🌿
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex gap-4"
      >
        <Link
          to="/signup"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all duration-300"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300"
        >
          Login
        </Link>
      </motion.div>
    </div>
  );
}
