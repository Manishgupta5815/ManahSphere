import React, { useState, useEffect } from "react";
import {
  Search,
  MessageCircle,
  Book,
  Shield,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Mail,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqsData = [
  {
    question: "How do I start a mental health check-up?",
    answer:
      "Navigate to the Activities page and click 'Mental Health Check-up'. You'll be guided through standardized questionnaires (PHQ-9, GAD-7, WHO-5). Results are private and only visible to you.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Yes. मनःSphere stores sensitive data securely. Review Settings → Privacy & Security to manage sharing preferences and export options.",
  },
  {
    question: "How does the AI sentiment analysis work?",
    answer:
      "When you create a post, our AI analyzes the text to detect emotional tone and sentiment. These insights are private and help you track mood over time.",
  },
  {
    question: "Can I delete my posts?",
    answer:
      "Yes — click the three dots (•••) on any post and select 'Delete'. The content will be removed from the platform.",
  },
  {
    question: "How do I change my password?",
    answer:
      "Go to Settings → Privacy & Security → Change Password. You'll need your current password to update it.",
  },
  {
    question: "What is the suggested users feature?",
    answer:
      "We suggest users based on shared interests and activity. Find them in the 'Suggested for you' section.",
  },
  {
    question: "How do I enable dark mode?",
    answer:
      "Open Settings → Appearance and toggle Dark Mode. You can also toggle it from the More menu.",
  },
  {
    question: "Can I export my mental health data?",
    answer:
      "Yes. Visit Settings → Account → Export Data to download your posts, checkup results, and activity (with your consent).",
  },
];

const quickHelpData = [
  {
    icon: <Book size={22} />,
    title: "Getting Started Guide",
    description: "Learn the basics of मनःSphere",
    link: "#",
  },
  {
    icon: <Shield size={22} />,
    title: "Privacy & Safety",
    description: "Understand how we protect your data",
    link: "#",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "Community Guidelines",
    description: "Rules for a supportive community",
    link: "#",
  },
  {
    icon: <HelpCircle size={22} />,
    title: "Contact Support",
    description: "Get help from our team",
    link: "#",
  },
];

export default function Help() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [faqs, setFaqs] = useState(faqsData);

  useEffect(() => {
    // ensure page renders in light mode (like Settings)
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    // optional: filter FAQs client-side by search query
    if (!searchQuery.trim()) {
      setFaqs(faqsData);
    } else {
      const q = searchQuery.toLowerCase();
      setFaqs(
        faqsData.filter(
          (f) =>
            f.question.toLowerCase().includes(q) ||
            f.answer.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery]);

  const tabs = [
    { id: "overview", label: "Overview", icon: <Users size={16} /> },
    { id: "faqs", label: "FAQs", icon: <HelpCircle size={16} /> },
    { id: "quick", label: "Quick Help", icon: <Book size={16} /> },
    { id: "contact", label: "Contact", icon: <Mail size={16} /> },
  ];

  const toggleFAQ = (i) => setExpandedFAQ(expandedFAQ === i ? null : i);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white text-slate-900">
      {/* Fixed back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white/90 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Back</span>
      </button>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Help & Support
          </h1>
          <p className="text-sm text-slate-500">
            Find guides, FAQs, and support resources for मनःSphere.
          </p>
        </div>

        <div className="flex gap-6">
          {/* Left sidebar tabs */}
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

          {/* Main content */}
          <main className="flex-1">
            <div className="rounded-xl border border-gray-200 bg-gradient-to-b from-white to-[#f9fbff] shadow-sm p-6">
              {/* OVERVIEW */}
              {activeTab === "overview" && (
                <section>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Quick help & resources
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Use the tabs to browse FAQs, quick guides, or contact the
                      support team.
                    </p>
                  </div>

                  {/* Search */}
                  <div className="mb-8">
                    <div className="relative max-w-2xl">
                      <Search
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search FAQs, guides or keywords..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Quick help cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                    {quickHelpData.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all group"
                      >
                        <div className="text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </a>
                    ))}
                  </div>

                  {/* Top FAQs preview */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-4">Popular questions</h3>
                    <div className="space-y-3">
                      {faqs.slice(0, 4).map((faq, i) => (
                        <div
                          key={i}
                          className="border border-gray-100 rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => {
                              setActiveTab("faqs");
                              setTimeout(() => toggleFAQ(i), 60);
                            }}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-900">
                              {faq.question}
                            </span>
                            <ChevronDown className="text-gray-500" size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* FAQ TAB */}
              {activeTab === "faqs" && (
                <section>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
                    <div className="text-sm text-slate-500">
                      {faqs.length} result{faqs.length !== 1 ? "s" : ""}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {faqs.length === 0 ? (
                      <div className="p-6 bg-yellow-50 border border-yellow-100 rounded-lg text-yellow-800">
                        No FAQs match your search.
                      </div>
                    ) : (
                      faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            {expandedFAQ === index ? (
                              <ChevronUp className="text-gray-500 flex-shrink-0" size={18} />
                            ) : (
                              <ChevronDown className="text-gray-500 flex-shrink-0" size={18} />
                            )}
                          </button>

                          {expandedFAQ === index && (
                            <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </section>
              )}

              {/* QUICK HELP TAB */}
              {activeTab === "quick" && (
                <section>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">Quick Help</h2>
                    <p className="text-sm text-slate-500 mt-1">Short guides and helpful resources to get you started.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {quickHelpData.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all group"
                      >
                        <div className="text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* CONTACT TAB */}
              {activeTab === "contact" && (
                <section>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">Contact Support</h2>
                    <p className="text-sm text-slate-500 mt-1">Reach out to our support team for help with account or technical issues.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="font-semibold mb-2">Email support</h3>
                      <p className="text-sm text-gray-600 mb-4">Send us an email and we'll respond within 24–48 hours.</p>
                      <a href="mailto:support@manosphere.com" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                        <Mail size={16} /> Email Support
                      </a>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="font-semibold mb-2">Community help</h3>
                      <p className="text-sm text-gray-600 mb-4">Join our community forums and ask other users for tips.</p>
                      <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
                        <Users size={16} /> Visit Community
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold mb-2">Support form</h4>
                    <p className="text-sm text-gray-600 mb-4">Describe your issue and our team will get back to you.</p>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="mb-3">
                        <label className="block text-sm text-slate-700 mb-1">Subject</label>
                        <input className="w-full px-4 py-2 rounded-lg border border-gray-300" placeholder="Short summary" />
                      </div>
                      <div className="mb-3">
                        <label className="block text-sm text-slate-700 mb-1">Message</label>
                        <textarea className="w-full px-4 py-2 rounded-lg border border-gray-300 h-28" placeholder="Describe your issue..." />
                      </div>
                      <div className="flex gap-3">
                        <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">Send</button>
                        <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border border-gray-200 rounded-lg">Cancel</button>
                      </div>
                    </form>
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
