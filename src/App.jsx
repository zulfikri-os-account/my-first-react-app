import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Header (Shared across all pages) */}
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      {/* Page Manager */}
      <Routes>
        {/* "/" matches the root URL */}
        <Route path="/" element={<Home />} />

        {/* "/about" matches the about page URL */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
