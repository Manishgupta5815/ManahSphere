import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Reusable floating input component
const FloatingInput = ({ label, type, name, value, onChange, required }) => {
  const hasValue = value && value.length > 0;

  return (
    <div className="relative mb-5">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full px-3 pt-[16px] pb-[8px] border border-gray-300 rounded-lg text-gray-800 text-[15px] bg-transparent 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
        focus:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all duration-200 ease-in-out"
      />
      <label
        htmlFor={name}
        className={`absolute left-3 text-gray-500 bg-white px-1 transition-all duration-200 ease-in-out
          ${
            hasValue
              ? "top-[-7px] text-[12px] text-[#5b46f8]"
              : "top-[11px] text-[15px] text-gray-500 peer-focus:top-[-7px] peer-focus:text-[12px] peer-focus:text-[#5b46f8]"
          }`}
      >
        {label}
      </label>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        console.log("User logged in:", data);
        navigate("/feed");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white flex justify-center items-start font-['Inter'] text-gray-800 px-4 pt-44 pb-24">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl border border-blue-100 rounded-3xl p-8 w-full max-w-sm transition-all duration-300 hover:shadow-[0_8px_28px_rgba(37,99,235,0.15)]">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            MindScape
          </h1>
          <p className="text-gray-500 mt-1 text-[14px]">
            Welcome back to your mindful journey
          </p>
        </div>

        {/* Title */}
        <h2
          className="text-2xl font-semibold text-center mb-5 text-gray-800 tracking-tight"
          style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
        >
          Log in to Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingInput
            label="Email or Username"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FloatingInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 mt-4 text-[16px] font-semibold rounded-xl text-white shadow-md transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] hover:shadow-lg"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-5">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;