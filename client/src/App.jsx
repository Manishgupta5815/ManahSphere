import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<div className="p-10 text-center text-xl">Login Page (Sneha)</div>} />
        <Route path="/signup" element={<div className="p-10 text-center text-xl">Signup Page (Sneha)</div>} />
        <Route path="/journal" element={<div className="p-10 text-center text-xl">Journal Page (Anand)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
