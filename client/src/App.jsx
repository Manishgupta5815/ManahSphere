import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FeedPage from "./pages/FeedPage";
import Profile from "./pages/Profile";

const Layout = ({ children }) => {
  const location = useLocation();

  // 👇 Define which pages should hide the Navbar
  const hideNavbarPaths = ["/feed", "/profile", "/journal"];

  const hideNavbar = hideNavbarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideNavbar && <Navbar />}
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
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
