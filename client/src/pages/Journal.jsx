import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Journal() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mood: 5,
    energy: 5,
    stress: 5,
    sleep: "",
    emotions: [],
    coping: [],
    comments: "",
  });

  const [showReport, setShowReport] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProgress(0);
    setShowReport(false);

    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setShowReport(true);
          return 100;
        }
        return old + 10;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white py-16 px-6 font-['Inter'] text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-gray-100"
      >
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          MindScape Journal
        </h1>

        {!showReport ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>

            {/* Mood Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["mood", "energy", "stress"].map((key) => (
                <div key={key}>
                  <label className="block font-semibold mb-2 capitalize">
                    {key}
                  </label>
                  <input
                    type="range"
                    name={key}
                    min="1"
                    max="10"
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full accent-blue-600"
                  />
                  <p className="text-sm text-gray-600">Level: {formData[key]}</p>
                </div>
              ))}
            </div>

            {/* Sleep */}
            <div>
              <label className="block font-semibold mb-2">Sleep Duration</label>
              <input
                type="text"
                name="sleep"
                placeholder="e.g. 7 hours"
                value={formData.sleep}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Emotions */}
            <div>
              <label className="block font-semibold mb-3">
                Emotions You Felt Today
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Happy",
                  "Sad",
                  "Anxious",
                  "Excited",
                  "Tired",
                  "Calm",
                ].map((emotion) => (
                  <label
                    key={emotion}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <input
                      type="checkbox"
                      name="emotions"
                      value={emotion}
                      checked={formData.emotions.includes(emotion)}
                      onChange={handleChange}
                      className="accent-purple-600"
                    />
                    {emotion}
                  </label>
                ))}
              </div>
            </div>

            {/* Coping */}
            <div>
              <label className="block font-semibold mb-3">
                What Helped You Cope?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Meditation",
                  "Talking to a friend",
                  "Music",
                  "Exercise",
                  "Sleep",
                  "Reading",
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-gray-700">
                    <input
                      type="checkbox"
                      name="coping"
                      value={item}
                      checked={formData.coping.includes(item)}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block font-semibold mb-2">Additional Notes</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows="3"
                placeholder="Write anything you’d like to express..."
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="px-10 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-2xl transition-all"
              >
                Analyze My Report
              </motion.button>
            </div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {progress < 100 ? (
              <div className="mt-10">
                <p className="text-gray-600 mb-4">
                  Analyzing your emotions... please wait 💭
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-3 bg-gradient-to-r from-blue-600 to-purple-600"
                  ></motion.div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Your Personalized Wellness Report 🌿
                </h2>
                <p className="text-gray-700 mb-4">
                  Hey {formData.name}, based on your responses:
                </p>
                <p className="text-gray-600 mb-2">
                  Mood: <b>{formData.mood}/10</b>, Energy:{" "}
                  <b>{formData.energy}/10</b>, Stress:{" "}
                  <b>{formData.stress}/10</b>
                </p>
                <p className="text-gray-600 mb-2">
                  You felt: {formData.emotions.join(", ") || "No emotions selected"}.
                </p>
                <p className="text-gray-600 mb-2">
                  You coped using: {formData.coping.join(", ") || "No coping methods"}.
                </p>
                <p className="text-gray-600 mb-6">
                  Sleep Duration: {formData.sleep || "N/A"}
                </p>

                <p className="text-gray-700 italic mb-4">
                  "Remember — emotional ups and downs are part of being human.
                  Reflect, recharge, and be kind to yourself."
                </p>

                <button
                  onClick={() => setShowReport(false)}
                  className="px-8 py-3 mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all"
                >
                  Back to Journal
                </button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}