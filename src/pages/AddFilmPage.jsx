import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    fetch("http://localhost:3001/api/films", {
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
      <h1>Add a New Film</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Released Year:</label>
          <input
            type="number"
            value={released}
            onChange={(e) => setReleased(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Metascore:</label>
          <input
            type="number"
            value={metascore}
            onChange={(e) => setMetascore(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Director:</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Writer (comma-separated):</label>
          <input
            type="text"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Composer:</label>
          <input
            type="text"
            value={composer}
            onChange={(e) => setComposer(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genre (comma-separated):</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Film</button>
      </form>
    </div>
  );
}

export default AddFilmPage;
