import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Grid,
  Bookmark,
  Tag,
  MapPin,
  Link as LinkIcon,
  Calendar,
  ArrowLeft,
  Image as ImageIcon,
  Inbox,
} from "lucide-react";

/** tiny skeleton utility */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`} />
);

/** image with skeleton */
const PostImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="aspect-square overflow-hidden">
      {!loaded && <Skeleton className="w-full h-full" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0 absolute"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");

  const user = useMemo(
    () => ({
      username: "manish_k",
      name: "Manish Kumar",
      bio: "🌿 Mindfulness Advocate | 💻 Tech Enthusiast | 🧘 Mental Wellness Champion\nSpreading positivity and mental wellness awareness through मनःSphere",
      website: "https://manosphere.dev",
      location: "New Delhi, India",
      joinDate: "January 2024",
      followers: 1250,
      following: 920,
      posts: 52,
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=manish",
      coverImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=300&fit=crop",
      postsImages: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
      ],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-600 hover:text-gray-900 transition-colors z-50"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      <main className="min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Cover */}
          <div className="relative">
            <img
              src={user.coverImage}
              alt="Cover"
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
            />
          </div>

          {/* Header */}
          <section className="relative bg-white border-x border-b border-gray-200 px-6 pb-6">
            <div className="flex justify-between items-start -mt-16 mb-4 relative">
              <img
                src={user.profilePic}
                alt={user.name}
                className="relative z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white shadow-md"
              />

              <div className="flex gap-2 mt-20 sm:mt-16">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Settings"
                >
                  <Settings size={20} />
                </button>
              </div>
            </div>

            <div className="pr-2">
              <h1 className="text-2xl font-bold leading-tight">{user.name}</h1>
              <p className="text-gray-600">@{user.username}</p>
            </div>

            <p className="mt-3 whitespace-pre-line leading-relaxed text-[15px]">
              {user.bio}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-gray-600">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-1">
                  <LinkIcon size={16} />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {user.website}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Joined {user.joinDate}</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-5 grid grid-cols-3 gap-3 max-w-md">
              {[
                { label: "Posts", value: user.posts },
                { label: "Following", value: user.following },
                { label: "Followers", value: user.followers },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-200 p-3 text-center hover:shadow-sm transition-shadow"
                >
                  <div className="text-xl font-semibold">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Tabs */}
          <nav className="bg-white border-x border-b border-gray-200">
            <div className="flex justify-around text-sm font-semibold relative">
              {[
                { key: "posts", label: "Posts", Icon: Grid },
                { key: "saved", label: "Saved", Icon: Bookmark },
                { key: "tagged", label: "Tagged", Icon: Tag },
              ].map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative flex items-center gap-2 py-4 px-6 transition-colors ${
                    activeTab === key
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {activeTab === key && (
                    <span className="pointer-events-none absolute bottom-0 left-3 right-3 h-1 rounded-t bg-blue-600 z-0" />
                  )}
                  <Icon size={18} className="shrink-0" />
                  {label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          {activeTab === "posts" && (
            <section className="grid grid-cols-2 sm:grid-cols-3 gap-1 bg-white border-x border-b border-gray-200">
              {user.postsImages.map((img, idx) => (
                <PostImage key={idx} src={img} alt={`Post ${idx + 1}`} />
              ))}
            </section>
          )}

          {activeTab === "saved" && (
            <section className="bg-white border-x border-b border-gray-200 py-16">
              <div className="max-w-md mx-auto text-center px-6">
                <Bookmark size={36} className="mx-auto mb-3 text-gray-400" />
                <h3 className="text-lg font-semibold">No saved posts yet</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Save posts you like and they’ll appear here for quick access.
                </p>
                <button
                  onClick={() => setActiveTab("posts")}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  <ImageIcon size={16} />
                  Explore posts
                </button>
              </div>
            </section>
          )}

          {activeTab === "tagged" && (
            <section className="bg-white border-x border-b border-gray-200 py-16">
              <div className="max-w-md mx-auto text-center px-6">
                <Inbox size={36} className="mx-auto mb-3 text-gray-400" />
                <h3 className="text-lg font-semibold">Nothing tagged yet</h3>
                <p className="text-gray-600 text-sm mt-1">
                  When others tag you in a post, it will show up here.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
