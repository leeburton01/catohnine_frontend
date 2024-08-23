import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilmsPage from "./pages/FilmsPage";
import AddFilmPage from "./pages/AddFilmPage";
import FilmDetailsPage from "./pages/FilmDetailsPage";
import CreatorsPage from "./pages/CreatorsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/add-film" element={<AddFilmPage />} />
        <Route path="/film/:id" element={<FilmDetailsPage />} />
        <Route path="/creator/:id" element={<CreatorsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
