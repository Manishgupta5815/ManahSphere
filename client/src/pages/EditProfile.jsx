import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

const initial = {
  name: "Manish Kumar",
  username: "manish_k",
  bio:
    "🌿 Mindfulness Advocate | 💻 Tech Enthusiast | 🧘 Mental Wellness Champion\nSpreading positivity and mental wellness awareness through मनःSphere",
  website: "https://manosphere.dev",
  location: "New Delhi, India",
  profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=manish",
  coverImage:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=300&fit=crop",
};

const EditProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  const onSelectImage = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setData((d) => ({ ...d, [field]: url }));
  };

  const validate = () => {
    const next = {};
    if (!data.name.trim()) next.name = "Name is required.";
    if (!/^[a-z0-9_\.]{3,20}$/i.test(data.username))
      next.username = "3–20 chars: letters, numbers, underscore, dot.";
    if (data.website && !/^https?:\/\/.+/i.test(data.website))
      next.website = "Must start with http(s)://";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // persist to API here
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-semibold">Edit Profile</h1>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={() => setData(initial)}
              className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm"
            >
              Reset
            </button>
            <button
              form="edit-form"
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Save changes
            </button>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-4 pb-12">
        {/* Cover preview */}
        <div className="relative mt-6">
          <img
            src={data.coverImage}
            alt="Cover"
            className="w-full h-44 sm:h-56 md:h-64 object-cover rounded-xl border border-gray-200"
          />
          <button
            onClick={() => coverInputRef.current?.click()}
            className="absolute bottom-3 right-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 border border-gray-200 shadow-sm hover:bg-white"
          >
            <Upload size={16} /> Change cover
          </button>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onSelectImage(e, "coverImage")}
          />
        </div>

        {/* Avatar + fields card */}
        <form id="edit-form" onSubmit={submit} className="mt-6 grid grid-cols-1 gap-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <img
              src={data.profilePic}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            <div>
              <button
                type="button"
                onClick={() => profileInputRef.current?.click()}
                className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm"
              >
                Change avatar
              </button>
              <input
                ref={profileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onSelectImage(e, "profilePic")}
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended: square image, at least 256×256.
              </p>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                value={data.name}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.name ? "border-red-400" : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                name="username"
                value={data.username}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.username ? "border-red-400" : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="username"
              />
              {errors.username && (
                <p className="text-xs text-red-600 mt-1">{errors.username}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                name="bio"
                value={data.bio}
                onChange={onChange}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell the world about you"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                name="website"
                value={data.website}
                onChange={onChange}
                className={`w-full rounded-lg border ${
                  errors.website ? "border-red-400" : "border-gray-300"
                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="https://example.com"
              />
              {errors.website && (
                <p className="text-xs text-red-600 mt-1">{errors.website}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                name="location"
                value={data.location}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, Country"
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
