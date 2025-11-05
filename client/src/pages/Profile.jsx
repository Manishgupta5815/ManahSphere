import React, { useState } from "react";
import { FaRegEdit, FaCog, FaTh, FaRegBookmark, FaUserTag } from "react-icons/fa";

const Profile = () => {
  const [user] = useState({
    username: "anand_k",
    name: "Anand Kumar",
    bio: "🌿 Mindfulness | 💻 CSE Student | ☀️ Solar Energy Enthusiast",
    website: "https://mindhealth.in",
    followers: 1020,
    following: 890,
    posts: 45,
    profilePic: "https://i.pravatar.cc/200", // Sample avatar
    postsImages: [
      "https://source.unsplash.com/random/300x300?mind",
      "https://source.unsplash.com/random/300x300?sun",
      "https://source.unsplash.com/random/300x300?nature",
      "https://source.unsplash.com/random/300x300?coding",
      "https://source.unsplash.com/random/300x300?focus",
      "https://source.unsplash.com/random/300x300?wellbeing",
      "https://source.unsplash.com/random/300x300?peace",
      "https://source.unsplash.com/random/300x300?energy",
      "https://source.unsplash.com/random/300x300?study",
    ],
  });

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen font-sans pb-10">
      {/* Header Section */}
      <div className="w-full max-w-4xl bg-white p-6 mt-8 rounded-xl shadow-sm">
        <div className="flex items-center space-x-10">
          <img
            src={user.profilePic}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <button className="border px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100">
                Edit Profile
              </button>
              <FaCog className="text-gray-500 cursor-pointer" size={20} />
            </div>

            <div className="flex space-x-6 mt-4 text-sm">
              <p>
                <span className="font-semibold">{user.posts}</span> posts
              </p>
              <p>
                <span className="font-semibold">{user.followers}</span> followers
              </p>
              <p>
                <span className="font-semibold">{user.following}</span> following
              </p>
            </div>

            <div className="mt-3">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm">{user.bio}</p>
              <a
                href={user.website}
                className="text-blue-500 text-sm hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {user.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex space-x-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center">
              <FaRegEdit className="text-gray-400" size={24} />
            </div>
            <p className="text-xs mt-2 text-gray-600">Highlight {i}</p>
          </div>
        ))}
      </div>

      {/* Navigation Bar */}
      <div className="flex justify-center mt-8 border-t border-gray-300 w-full max-w-4xl">
        <button className="flex items-center gap-2 py-4 px-6 text-sm font-medium text-gray-700 border-t-2 border-black">
          <FaTh /> POSTS
        </button>
        <button className="flex items-center gap-2 py-4 px-6 text-sm font-medium text-gray-500 hover:text-black">
          <FaRegBookmark /> SAVED
        </button>
        <button className="flex items-center gap-2 py-4 px-6 text-sm font-medium text-gray-500 hover:text-black">
          <FaUserTag /> TAGGED
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 mt-2 max-w-4xl">
        {user.postsImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`post-${index}`}
            className="w-full h-64 object-cover hover:opacity-90 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
