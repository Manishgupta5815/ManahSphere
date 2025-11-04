import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Navbar from "./components/Navbar";
import LoggedInNavbar from "./components/LoggedInNavbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FeedPage from "./pages/FeedPage";
import Profile from "./pages/Profile"; 

// ✅ Helper component to conditionally render navbars
const Layout = ({ children }) => {
  const location = useLocation();

  // Define which paths should show the LoggedInNavbar
  const loggedInPaths = ["/feed", "/profile", "/journal"];

  // Check if current route matches a logged-in path
  const showLoggedInNavbar = loggedInPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {showLoggedInNavbar ? <LoggedInNavbar /> : <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Authenticated Routes */}
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
