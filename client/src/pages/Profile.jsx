import React, { useState, useEffect } from "react";

const Profile = () => {
  // Simulated user data (replace this with data from your backend or context)
  const [user, setUser] = useState({
    username: "Anand",
    email: "anand@example.com",
    bio: "Working on my mindfulness and improving daily habits.",
    goal: "Reduce stress and practice meditation every day.",
    mood: "😊 Happy",
    progress: 70,
    profilePic: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [newData, setNewData] = useState(user);

  // Handle file upload preview
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewData({
        ...newData,
        profilePic: URL.createObjectURL(file),
      });
    }
  };

  // Handle saving changes
  const handleSave = () => {
    setUser(newData);
    setEditMode(false);
    alert("Profile updated successfully ✅");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // adjust if using auth context
    alert("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg transition-all duration-300 hover:shadow-2xl">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={
                newData.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-blue-600">
                ✎
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </label>
            )}
          </div>

          {/* Username */}
          {editMode ? (
            <input
              type="text"
              value={newData.username}
              onChange={(e) =>
                setNewData({ ...newData, username: e.target.value })
              }
              className="mt-4 text-xl text-center border-b-2 border-blue-300 focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl font-semibold mt-4 text-gray-700">
              {user.username}
            </h2>
          )}
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Bio & Goal */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">About Me</h3>
          {editMode ? (
            <textarea
              value={newData.bio}
              onChange={(e) =>
                setNewData({ ...newData, bio: e.target.value })
              }
              className="w-full p-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="mt-2 text-gray-600">{user.bio}</p>
          )}

          <h3 className="text-lg font-semibold mt-4 text-gray-700">
            My Mental Health Goal
          </h3>
          {editMode ? (
            <textarea
              value={newData.goal}
              onChange={(e) =>
                setNewData({ ...newData, goal: e.target.value })
              }
              className="w-full p-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="mt-2 text-gray-600">{user.goal}</p>
          )}
        </div>

        {/* Mood Tracker */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Current Mood
          </h3>
          {editMode ? (
            <select
              value={newData.mood}
              onChange={(e) =>
                setNewData({ ...newData, mood: e.target.value })
              }
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option>😊 Happy</option>
              <option>😐 Neutral</option>
              <option>😔 Sad</option>
              <option>😡 Angry</option>
              <option>😴 Tired</option>
            </select>
          ) : (
            <p className="mt-2 text-xl">{user.mood}</p>
          )}
        </div>

        {/* Wellness Progress */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Wellness Progress
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className="bg-green-400 h-4 rounded-full transition-all duration-300"
              style={{ width: `${user.progress}%` }}
            ></div>
          </div>
          <p className="text-right text-gray-600 text-sm mt-1">
            {user.progress}% completed
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
