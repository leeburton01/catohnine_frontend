import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilmsPage from "./pages/FilmsPage";
import AddFilmPage from "./pages/AddFilmPage";
import FilmDetailsPage from "./pages/FilmDetailsPage";
import CreatorsPage from "./pages/CreatorsPage";
import Footer from "./components/Footer"; // Import Footer

function App() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      if (windowHeight + scrollTop >= scrollHeight - 50) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/add-film" element={<AddFilmPage />} />
        <Route path="/film/:id" element={<FilmDetailsPage />} />
        <Route path="/creator/:id" element={<CreatorsPage />} />
      </Routes>
      {/* Render Footer only once, based on scroll */}
      {showFooter && <Footer />}
    </Router>
  );
}

export default App;
