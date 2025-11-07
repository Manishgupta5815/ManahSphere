import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FeedPage from "./pages/FeedPage";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import SidebarLeft from "./components/SidebarLeft"; 
import CheckupResults from "./pages/CheckupResults";
import MentalCheckup from "./pages/MentalCheckup";

// ✅ Layout now includes Navbar logic
const Layout = ({ children }) => {
  const location = useLocation();

  // Pages where sidebar should not appear
  const hideSidebarPaths = ["/login", "/signup", "/"];
  const hideSidebar = hideSidebarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // Pages where navbar should appear (only landing page in this case)
  const showNavbarPaths = ["/","/login", "/signup"];
  const showNavbar = showNavbarPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* ✅ Show Navbar on landing page only */}
      {showNavbar && <Navbar />}

      <div className="flex flex-1">
        {/* ✅ Sidebar for logged-in sections */}
        {!hideSidebar && <SidebarLeft />}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path= "/edit-profile"element= {<EditProfile/>}/>,
          <Route path="/profile" element={<Profile />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/mental-checkup" element={<MentalCheckup />} />
          <Route path="/checkup-results" element={<CheckupResults />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
