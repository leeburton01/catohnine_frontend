import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AddFilmPage() {
  const [title, setTitle] = useState("");
  const [released, setReleased] = useState("");
  const [metascore, setMetascore] = useState("");
  const [director, setDirector] = useState("");
  const [writer, setWriter] = useState("");
  const [composer, setComposer] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (metascore < 60) {
      alert("Metascore must be above 60 to add the film.");
      return;
    }

    const newFilm = {
      title,
      released: parseInt(released),
      metascore: parseInt(metascore),
      director,
      writer,
      composer,
      genre: genre.split(",").map((g) => g.trim()),
      duration: parseInt(duration),
    };

    fetch("https://shiversbackend.adaptable.app/films", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFilm),
    })
      .then((response) => response.json())
      .then(() => navigate("/films"))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
          marginTop: "80px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Released Year:</label>
            <input
              type="number"
              value={released}
              onChange={(e) => setReleased(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Metascore:</label>
            <input
              type="number"
              value={metascore}
              onChange={(e) => setMetascore(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Director:</label>
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Writer (comma-separated):</label>
            <input
              type="text"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Composer:</label>
            <input
              type="text"
              value={composer}
              onChange={(e) => setComposer(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Genre (comma-separated):</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Duration (minutes):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button
            type="submit"
            style={{ padding: "10px 15px", fontSize: "16px" }}
          >
            Add Film
          </button>
        </form>
      </div>
      
    </div>
  );
}

export default AddFilmPage;
