

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FilmsPage() {
  const [films, setFilms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("metascore");
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    fetch("http://localhost:8000/api/films")
      .then((response) => response.json())
      .then((data) => {
        setFilms(shuffleArray(data)); 
      })
      .catch((error) => console.error("Error fetching films:", error));
  }, []);

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleSortChange(event) {
    setSortOption(event.target.value);
  }

  function handleGenreChange(event) {
    setSelectedGenre(event.target.value);
  }

  function filterAndSortFilms(films) {
    
    const filteredFilms = films.filter((film) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        film.title.toLowerCase().includes(searchLower) ||
        (Array.isArray(film.writer) &&
          film.writer.some((writer) =>
            writer.toLowerCase().includes(searchLower)
          )) ||
        (Array.isArray(film.director) &&
          film.director.some((director) =>
            director.toLowerCase().includes(searchLower)
          )) ||
        (typeof film.writer === "string" &&
          film.writer.toLowerCase().includes(searchLower)) ||
        (typeof film.director === "string" &&
          film.director.toLowerCase().includes(searchLower))
      );
    });

    
    const genreFilteredFilms =
      selectedGenre === "All"
        ? filteredFilms
        : filteredFilms.filter((film) => film.genre.includes(selectedGenre));

    
    const sortedFilms = genreFilteredFilms.sort((a, b) => {
      switch (sortOption) {
        case "metascore":
          return b.metascore - a.metascore;
        case "year":
          return b.released - a.released;
        case "name":
          return a.title.localeCompare(b.title);
        case "duration":
          return b.duration - a.duration;
        default:
          return 0;
      }
    });

    return sortedFilms;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "28px" }}>LOGO</h1>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by title, director, writer..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            fontSize: "14px",
            width: "30%",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        {/* Sort Options */}
        <select
          value={sortOption}
          onChange={handleSortChange}
          style={{
            padding: "10px",
            fontSize: "14px",
            width: "30%",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="metascore">Sort by: Metascore</option>
          <option value="year">Sort by: Year</option>
          <option value="name">Sort by: Name</option>
          <option value="duration">Sort by: Duration</option>
        </select>

        {/* Genre Dropdown */}
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          style={{
            padding: "10px",
            fontSize: "14px",
            width: "30%",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="All">All Genres</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
          <option value="Comedy">Comedy</option>
          <option value="Action">Action</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Mystery">Mystery</option>
          <option value="Crime">Crime</option>
        </select>
      </div>

      {/* Films List */}
      <div>
        {filterAndSortFilms(films).map((film) => (
          <Link
            to={`/film/${film.id}`}
            key={film.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {/* Poster */}
              <img
                src={film.poster}
                alt={film.title}
                style={{
                  width: "120px",
                  height: "auto",
                  marginRight: "20px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />

              {/* Title and Year */}
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: "0 0 10px 0", fontSize: "20px" }}>
                  {film.title} ({film.released})
                </h2>
              </div>

              {/* Film Details */}
              <div style={{ flex: 1 }}>
                <p style={{ margin: "5px 0", fontSize: "14px" }}>
                  <strong>Written by:</strong>{" "}
                  {Array.isArray(film.writer)
                    ? film.writer.join(", ")
                    : film.writer}
                </p>
                <p style={{ margin: "5px 0", fontSize: "14px" }}>
                  <strong>Directed by:</strong>{" "}
                  {Array.isArray(film.director)
                    ? film.director.join(", ")
                    : film.director}
                </p>
                <p style={{ margin: "5px 0", fontSize: "14px" }}>
                  <strong>Music by:</strong> {film.composer}
                </p>
              </div>

              {/* Metascore */}
              <div style={{ marginLeft: "20px", textAlign: "right" }}>
                <p
                  style={{ margin: "0", fontSize: "14px", fontWeight: "bold" }}
                >
                  <strong>Metascore:</strong> {film.metascore}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FilmsPage;
