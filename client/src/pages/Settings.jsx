import React, { useEffect, useState } from "react";
import { User, Lock, Bell, Eye, Globe, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");

  // ensure page renders light
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const tabs = [
    { id: "account", label: "Account", icon: <User size={18} /> },
    { id: "privacy", label: "Privacy & Security", icon: <Lock size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Eye size={18} /> },
    { id: "accessibility", label: "Accessibility", icon: <Globe size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white text-slate-800">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white/90 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-[15px] text-slate-500">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="rounded-xl border border-gray-200 bg-white/90 shadow-sm p-2">
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-all duration-200 " +
                      (active
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm"
                        : "text-slate-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50")
                    }
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1">
            <div className="rounded-xl border border-gray-200 bg-gradient-to-b from-white to-[#f9fbff] shadow-sm p-6">
              {activeTab === "account" && (
                <section className="space-y-6">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Account Settings
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="manish.kumar@manosphere.com"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        defaultValue="manish_k"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="+91 98765 43210"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition">
                      Save Changes
                    </button>
                  </div>
                </section>
              )}

              {activeTab === "privacy" && (
                <section className="space-y-6">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Privacy & Security
                  </h2>

                  <div className="space-y-4">
                    {/* Switch */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-slate-900">Private Account</h3>
                        <p className="text-sm text-slate-500">
                          Only approved followers can see your posts
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <span className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></span>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-slate-900">Activity Status</h3>
                        <p className="text-sm text-slate-500">Show when you're active</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <span className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></span>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-slate-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-slate-500">Add an extra layer of security</p>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-gray-100 text-slate-900 font-medium hover:bg-gray-200 transition">
                        Enable
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <h3 className="font-medium text-slate-900">Change Password</h3>
                      <p className="text-sm text-slate-500">Update your password regularly</p>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-gray-100 text-slate-900 font-medium hover:bg-gray-200 transition">
                        Change
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === "notifications" && (
                <section className="space-y-6">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    {[
                      { title: "Post Likes", desc: "When someone likes your post" },
                      { title: "New Followers", desc: "When someone follows you" },
                      { title: "Comments", desc: "When someone comments on your post" },
                      { title: "Messages", desc: "When you receive a new message" },
                      { title: "Mental Health Reminders", desc: "Daily wellness check-ins" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3 border-b border-gray-200"
                      >
                        <div>
                          <h3 className="font-medium text-slate-900">{item.title}</h3>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={i < 3}
                            className="sr-only peer"
                          />
                          <span className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "appearance" && (
                <section className="space-y-6">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Appearance
                  </h2>
                  <div className="space-y-4">
                    <div className="py-3 border-b border-gray-200">
                      <h3 className="font-medium text-slate-900 mb-3">Font Size</h3>
                      <div className="flex gap-3">
                        {["Small", "Medium", "Large"].map((size, i) => (
                          <button
                            key={size}
                            className={
                              "px-4 py-2 rounded-lg text-sm font-medium transition " +
                              (i === 1
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                : "bg-gray-100 text-slate-900 hover:bg-gray-200")
                            }
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === "accessibility" && (
                <section className="space-y-6">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Accessibility
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-slate-900">Screen Reader Support</h3>
                        <p className="text-sm text-slate-500">Optimize for screen readers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <span className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></span>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-slate-900">Reduce Motion</h3>
                        <p className="text-sm text-slate-500">Minimize animations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <span className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></span>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div>
                        <h3 className="font-medium text-slate-900">High Contrast</h3>
                        <p className="text-sm text-slate-500">Increase contrast for better visibility</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <span className="w-11 h-6 bg-gray-2 00 rounded-full peer-checked:bg-blue-600 transition peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></span>
                      </label>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
