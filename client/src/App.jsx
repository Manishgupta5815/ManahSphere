import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Ankit */}
        <Route path="/" element={<Home />} />

        {/* Sneha */}
        <Route path="/login" element={<div>Login Page (Sneha)</div>} />
        <Route path="/signup" element={<div>Signup Page (Sneha)</div>} />

        {/* Anand */}
        <Route path="/journal" element={<div>Journal Page (Anand)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
