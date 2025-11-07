import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        className="peer w-full px-3 pt-[14px] pb-[8px] border border-gray-300 rounded-lg text-gray-800 text-[15px] bg-transparent 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
        focus:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all duration-200 ease-in-out"
      />
      <label
        htmlFor={name}
        className={`absolute left-3 text-gray-500 bg-white px-1 transition-all duration-200 ease-in-out
          ${hasValue
            ? "top-[-7px] text-[12px] text-[#5b46f8]"
            : "top-[11px] text-[15px] text-gray-500 peer-focus:top-[-7px] peer-focus:text-[12px] peer-focus:text-[#5b46f8]"
          }`}
      >
        {label}
      </label>
    </div>
  );
};


const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      if (value.length === 0) setPasswordStrength("");
      else if (value.length < 8) setPasswordStrength("weak");
      else setPasswordStrength("strong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return; // stop here
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white flex justify-center items-center font-['Inter'] text-gray-800 px-4 pt-16 pb-10">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl border border-blue-100 rounded-3xl p-7 w-full max-w-sm transition-all duration-300 hover:shadow-[0_8px_28px_rgba(37,99,235,0.15)]">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            मनःSphere
          </h1>
          <p className="text-gray-500 mt-1 text-[13px]">
            Your AI-powered journey to mindfulness
          </p>
        </div>

        {/* Title */}
        <h2
          className="text-xl font-semibold text-center mb-4 text-gray-800 tracking-tight"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Create Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <FloatingInput
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FloatingInput
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <FloatingInput
            label="Email"
            type="email"
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

          {/* Password Strength Message — fixed position so layout doesn’t jump */}
          <div className="min-h-[22px] mt-[-6px] mb-1">
            {passwordStrength && (
              <p
                className={`text-xs ${passwordStrength === "weak" ? "text-red-500" : "text-green-600"
                  } transition-all duration-200`}
              >
                {passwordStrength === "weak"
                  ? "Weak password — try adding more characters."
                  : "Strong password"}
              </p>
            )}
          </div>

          <FloatingInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 mt-4 text-[15px] font-semibold rounded-xl text-white shadow-md transition-all duration-300 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] hover:shadow-lg"
              }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
