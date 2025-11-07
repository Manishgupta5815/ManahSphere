import React, {
  useMemo,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import {
  TrendingUp,
  Users,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  Bookmark,
  Check,
  Image as ImageIcon,
  Inbox,
  X,
  Share2,
} from "lucide-react";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";

/* =========================
   Utilities / Small UI
   ========================= */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`} />
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/90 border border-gray-200 shadow-sm">
    {children}
  </span>
);

/* Track bounding rect of the center container (no hardcoded widths) */
function useBoundingRect() {
  const ref = useRef(null);
  const [rect, setRect] = useState(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      setRect({
        left: r.left,
        width: r.width,
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { ref, rect: rect };
}

/* =========================
   Activity Card
   ========================= */
const ActivityCard = ({ a, joined, onToggleJoin, onOpen }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => onOpen(a)}
    >
      <div className="relative overflow-hidden h-44 sm:h-48">
        {!loaded && <Skeleton className="absolute inset-0" />}
        <img
          src={a.image}
          alt={a.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
        />

        <div className="absolute top-3 left-3">
          <Pill>{a.category}</Pill>
        </div>

        {a.trending && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-600/90 shadow-sm">
              <TrendingUp size={12} />
              Trending
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {a.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">Hosted by {a.host}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>{a.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            <span>{a.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            <span className="truncate">{a.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} />
            <span>{a.participants.toLocaleString()} registered</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleJoin(a.id);
            }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              joined
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {joined ? (
              <span className="inline-flex items-center gap-2">
                <Check size={16} /> Joined
              </span>
            ) : (
              "Join Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================
   Center-bounded Fixed Modal
   ========================= */
const ActivityFixedModal = ({
  open,
  activity,
  onClose,
  joined,
  onToggleJoin,
  anchorRect,
}) => {
  if (!open || !activity || !anchorRect) return null;

  const left = anchorRect.left + window.scrollX;
  const width = anchorRect.width;

  return (
    <>
      {/* overlay only across center column */}
      <div
        className="fixed z-40 bg-black/30"
        style={{
          top: 0,
          left,
          width,
          height: "100vh",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* centered panel within the same fixed area */}
      <div
        className="fixed z-50 flex items-center justify-center pointer-events-none"
        style={{
          top: 0,
          left,
          width,
          height: "100vh",
        }}
      >
        <div className="pointer-events-auto w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold truncate pr-3">
              {activity.title}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const url = `${window.location.origin}/activities/${activity.id}`;
                  navigator.clipboard.writeText(url).catch(() => {});
                }}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100"
                aria-label="Share"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Pill>{activity.category}</Pill>
                {activity.trending && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-600/90 shadow-sm">
                    <TrendingUp size={12} />
                    Trending
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600">
                Hosted by{" "}
                <span className="font-medium text-gray-900">
                  {activity.host}
                </span>
              </p>

              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={16} /> {activity.date}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={16} /> {activity.duration}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={16} /> {activity.location}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users size={16} />{" "}
                  {activity.participants.toLocaleString()} registered
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-1">About</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  This session focuses on practical mindfulness tools and
                  community support. Expect guided practice, Q&A, and
                  actionable takeaways for daily balance.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleJoin(activity.id);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    joined
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {joined ? "Joined" : "Join Now"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const url = `${window.location.origin}/activities/${activity.id}`;
                    navigator.clipboard.writeText(url).catch(() => {});
                  }}
                  className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-100"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* =========================
   Page
   ========================= */
const Activities = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [joinedIds, setJoinedIds] = useState(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerActivity, setDrawerActivity] = useState(null);

  const { ref: centerRef, rect: centerRect } = useBoundingRect();

  const activities = useMemo(
    () => [
      {
        id: 1,
        title: "Morning Meditation Session",
        category: "Meditation",
        host: "MindSpace Community",
        participants: 234,
        date: "Today, 7:00 AM",
        duration: "30 mins",
        location: "Virtual",
        image:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
        trending: true,
      },
      {
        id: 2,
        title: "Mental Health Awareness Workshop",
        category: "Workshop",
        host: "Wellness Warriors",
        participants: 156,
        date: "Tomorrow, 5:00 PM",
        duration: "2 hours",
        location: "Community Center, Delhi",
        image:
          "https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=300&fit=crop",
        trending: true,
      },
      {
        id: 3,
        title: "Yoga for Beginners",
        category: "Fitness",
        host: "Healthy Living Group",
        participants: 89,
        date: "Dec 28, 6:00 AM",
        duration: "45 mins",
        location: "Virtual",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        trending: false,
      },
      {
        id: 4,
        title: "Stress Management Techniques",
        category: "Wellness",
        host: "Peace of Mind Institute",
        participants: 312,
        date: "Dec 29, 4:00 PM",
        duration: "1 hour",
        location: "Virtual",
        image:
          "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop",
        trending: true,
      },
      {
        id: 5,
        title: "Nature Walk & Mindfulness",
        category: "Outdoor",
        host: "Green Minds Collective",
        participants: 67,
        date: "Dec 30, 8:00 AM",
        duration: "2 hours",
        location: "Lodhi Gardens, Delhi",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
        trending: false,
      },
      {
        id: 6,
        title: "Art Therapy Session",
        category: "Creative",
        host: "Colors of Calm",
        participants: 45,
        date: "Dec 31, 3:00 PM",
        duration: "1.5 hours",
        location: "Virtual",
        image:
          "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop",
        trending: false,
      },
    ],
    []
  );

  const categories = [
    { name: "All", icon: Sparkles },
    { name: "Meditation", icon: Sparkles },
    { name: "Workshop", icon: Bookmark },
    { name: "Fitness", icon: TrendingUp },
    { name: "Wellness", icon: Sparkles },
    { name: "Outdoor", icon: MapPin },
    { name: "Creative", icon: Sparkles },
  ];

  const filtered = useMemo(() => {
    let list = [...activities];

    if (selectedCategory !== "All") {
      list = list.filter((a) => a.category === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.host.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q)
      );
    }
    if (activeTab === "registered") {
      list = list.filter((a) => joinedIds.has(a.id));
    }
    if (sort === "popular") list.sort((a, b) => b.participants - a.participants);
    if (sort === "upcoming") list.sort((a, b) => a.id - b.id); // placeholder
    if (sort === "trending")
      list.sort((a, b) => Number(b.trending) - Number(a.trending));

    return list;
  }, [activities, selectedCategory, search, sort, activeTab, joinedIds]);

  const toggleJoin = (id) => {
    setJoinedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openDrawer = (a) => {
    setDrawerActivity(a);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerActivity(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SidebarLeft />
      <SidebarRight />

      <main className="ml-72 mr-80 min-h-screen">
        <div
          ref={centerRef}
          className={`max-w-5xl mx-auto px-6 py-6 relative ${drawerOpen ? "overflow-hidden" : ""}`}
        >
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-black mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Discover Activities</h1>
            <p className="text-gray-600">
              Join wellness events, workshops, and community activities
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mb-6 border-b border-gray-200">
            {[
              { key: "discover", label: "Discover" },
              { key: "registered", label: "My Activities" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`relative pb-3 px-1 font-semibold transition-colors ${
                  activeTab === t.key
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {t.label}
                {activeTab === t.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t z-0" />
                )}
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            {/* categories — wrapped, no horizontal scroll */}
            <div className="flex flex-wrap gap-2 pb-1">
              {categories.map((c) => {
                const Icon = c.icon;
                const active = selectedCategory === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelectedCategory(c.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={16} />
                    {c.name}
                  </button>
                );
              })}
            </div>

            {/* right tools */}
            <div className="flex items-center gap-3 sm:ml-auto">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search activities"
                  className="pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="popular">Most popular</option>
                  <option value="trending">Trending</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid / Empty states — fixed 2 columns */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((a) => (
                <ActivityCard
                  key={a.id}
                  a={a}
                  joined={joinedIds.has(a.id)}
                  onToggleJoin={toggleJoin}
                  onOpen={openDrawer}
                />
              ))}
            </div>
          ) : activeTab === "registered" ? (
            <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center">
              <Inbox size={40} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-semibold">No joined activities yet</h3>
              <p className="text-gray-600 text-sm mt-1">
                Join events you like and they’ll appear here.
              </p>
              <button
                onClick={() => setActiveTab("discover")}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                <ImageIcon size={16} />
                Explore activities
              </button>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center">
              <Bookmark size={40} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-semibold">
                Nothing matches your filters
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Try clearing filters or searching something else.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearch("");
                  setSort("popular");
                }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Center-bounded modal */}
          <ActivityFixedModal
            open={drawerOpen}
            activity={drawerActivity}
            onClose={closeDrawer}
            joined={drawerActivity ? joinedIds.has(drawerActivity.id) : false}
            onToggleJoin={toggleJoin}
            anchorRect={centerRect}
          />
        </div>
      </main>
    </div>
  );
};

export default Activities;
