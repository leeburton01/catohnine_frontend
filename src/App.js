import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilmsPage from "./pages/FilmsPage";
import AddFilmPage from "./pages/AddFilmPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/contribute" element={<AddFilmPage />} />
      </Routes>
    </Router>
  );
}

export default App;
