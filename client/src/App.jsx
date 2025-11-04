import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FeedPage from "./pages/FeedPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<h1>hey</h1>} /> */}
        <Route path="/feed" element={<FeedPage/>} />  
        <Route path="/signup" element={<Signup/>} />
        <Route path="/journal" element={<Journal/>} />
      </Routes>
    </Router>
  );
}

export default App;
