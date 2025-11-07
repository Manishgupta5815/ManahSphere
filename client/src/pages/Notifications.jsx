import React, { useMemo, useState } from "react";
import {
  Bell,
  AtSign,
  Check,
  Filter,
  Search,
  MessageCircle,
  Calendar,
  Heart,
  Sparkles,
  Briefcase,
} from "lucide-react";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";

/** —— label styles ———————————————————————————— */
const LABEL_STYLES = {
  Wellness: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
  Meditation: { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-200" },
  Fitness: { bg: "bg-orange-50", text: "text-orange-700", ring: "ring-orange-200" },
  AI: { bg: "bg-fuchsia-50", text: "text-fuchsia-700", ring: "ring-fuchsia-200" },
  Design: { bg: "bg-cyan-50", text: "text-cyan-700", ring: "ring-cyan-200" },
  Community: { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-200" },
};

/** —— demo data (replace with API) ————————————————— */
const seedNotifications = [
  { id: 1, title: "New Wellness workshop near you", body: "Stress Management Techniques starts this Friday.", label: "Wellness", type: "event", createdAt: Date.now() - 1000 * 60 * 12, unread: true, icon: Calendar },
  { id: 2, title: "You were mentioned in a discussion", body: "@you check the new breathing routine we shared.", label: "Meditation", type: "mention", createdAt: Date.now() - 1000 * 60 * 45, unread: true, icon: AtSign },
  { id: 3, title: "AI trend: Mindful chat prompts", body: "A curated list of prompts to check your daily mood.", label: "AI", type: "update", createdAt: Date.now() - 1000 * 60 * 60 * 5, unread: false, icon: Sparkles },
  { id: 4, title: "Design critique invited", body: "Share feedback on the new ‘Calm Card’ component.", label: "Design", type: "thread", createdAt: Date.now() - 1000 * 60 * 60 * 26, unread: false, icon: MessageCircle },
  { id: 5, title: "Fitness challenge starts tomorrow", body: "Join the 5k mindful walk challenge.", label: "Fitness", type: "event", createdAt: Date.now() - 1000 * 60 * 60 * 50, unread: true, icon: Heart },
  { id: 6, title: "Community spotlight", body: "Anand Kumar shared a progress update.", label: "Community", type: "social", createdAt: Date.now() - 1000 * 60 * 60 * 72, unread: false, icon: Briefcase },
];

/** —— utils ——————————————————————————————— */
const timeAgo = (ts) => {
  const diff = Math.max(0, Date.now() - ts) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
};

const LabelPill = ({ children, active, onClick }) => {
  const styles = LABEL_STYLES[children] || { bg: "bg-gray-50", text: "text-gray-700", ring: "ring-gray-200" };
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium ${styles.bg} ${styles.text} ring-1 ${styles.ring} transition hover:brightness-95 ${active ? "ring-2" : ""}`}
    >
      {children}
    </button>
  );
};

const Tabs = ({ tab, setTab }) => (
  <div className="flex items-center gap-4 border-b border-gray-200 mb-4">
    {[
      { key: "all", label: "All", Icon: Bell },
      { key: "mentions", label: "Mentions", Icon: AtSign },
    ].map(({ key, label, Icon }) => (
      <button
        key={key}
        onClick={() => setTab(key)}
        className={`relative pb-3 px-1 font-semibold flex items-center gap-2 ${tab === key ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
      >
        <Icon size={16} />
        {label}
        {tab === key && <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t" />}
      </button>
    ))}
  </div>
);

const Notifications = () => {
  const [tab, setTab] = useState("all");
  const [activeLabel, setActiveLabel] = useState("All");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(seedNotifications);

  const labels = useMemo(() => ["All", ...Object.keys(LABEL_STYLES)], []);
  const unreadCount = items.filter((n) => n.unread).length;

  const filtered = useMemo(() => {
    let list = [...items];
    if (tab === "mentions") list = list.filter((n) => n.type === "mention");
    if (activeLabel !== "All") list = list.filter((n) => n.label === activeLabel);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q) ||
          n.label.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => Number(b.unread) - Number(a.unread) || b.createdAt - a.createdAt);
    return list;
  }, [items, tab, activeLabel, query]);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  const toggleRead = (id) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)));

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed sidebars */}
      <SidebarLeft />
      <SidebarRight />

      {/* Center content */}
      <main className="ml-72 mr-80 min-h-screen">
        <header className="max-w-4xl mx-auto px-6 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 sm:justify-between">
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Notifications</h1>
              <p className="text-gray-500">Insights across your industries & interests</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markAllRead}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Check size={16} /> Mark all as read
              </button>
              <span className="hidden sm:inline-flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm">
                {unreadCount} unread
              </span>
            </div>
          </div>

          {/* Tabs */}
          <Tabs tab={tab} setTab={setTab} />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              {labels.map((name) => (
                <LabelPill
                  key={name}
                  active={activeLabel === name}
                  onClick={() => setActiveLabel(name)}
                >
                  {name}
                </LabelPill>
              ))}
            </div>

            <div className="sm:ml-auto flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search notifications"
                  className="pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
                />
              </div>
              <div className="hidden sm:flex items-center gap-2 text-gray-500">
                <Filter size={16} />
                <span className="text-sm">Unread first</span>
              </div>
            </div>
          </div>
        </header>

        {/* List */}
        <main className="max-w-4xl mx-auto px-6 pb-10">
          {filtered.length === 0 ? (
            <div className="mt-16 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
              <Bell size={32} className="mx-auto text-gray-400 mb-2" />
              <h3 className="font-semibold text-slate-800">You’re all caught up!</h3>
              <p className="text-gray-500 text-sm">No notifications match your filters right now.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {filtered.map((n) => {
                const styles = LABEL_STYLES[n.label] || { bg: "bg-gray-50", text: "text-gray-700", ring: "ring-gray-200" };
                const Icon = n.icon || Bell;
                return (
                  <li
                    key={n.id}
                    className={`relative rounded-xl border transition ${n.unread ? "border-blue-200 bg-blue-50/40" : "border-gray-200 bg-white"}`}
                  >
                    <div className="flex items-start gap-3 p-4">
                      <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${n.unread ? "bg-blue-600" : "bg-gray-300"}`} aria-hidden="true" />
                      <div className="shrink-0 p-2 rounded-lg bg-white ring-1 ring-gray-200">
                        <Icon size={16} className="text-gray-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{n.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${styles.bg} ${styles.text} ring-1 ${styles.ring}`}>
                            {n.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{n.body}</p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                          <span>{timeAgo(n.createdAt)} ago</span>
                          {n.type === "mention" && (
                            <span className="inline-flex items-center gap-1 text-indigo-600">
                              <AtSign size={12} /> Mention
                            </span>
                          )}
                          {n.type === "event" && (
                            <span className="inline-flex items-center gap-1 text-emerald-600">
                              <Calendar size={12} /> Event
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0">
                        <button
                          onClick={() => toggleRead(n.id)}
                          className="px-3 py-1.5 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {n.unread ? "Mark read" : "Mark unread"}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </main>
      </main>
    </div>
  );
};

export default Notifications;
