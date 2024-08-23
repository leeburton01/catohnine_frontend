import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function FilmDetailsPage() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [director, setDirector] = useState(null);

  useEffect(() => {
    // Fetch film details
    fetch(`http://localhost:8000/api/films/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Film fetch failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Film data:", data); 
        setFilm(data);

        
        if (data.director) {
          fetch(`http://localhost:8000/api/directors`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Directors fetch failed: ${response.status}`);
              }
              return response.json();
            })
            .then((directors) => {
              console.log("Directors list:", directors); 
              const matchedDirector = directors.find(
                (d) => d.name === data.director
              );
              if (matchedDirector) {
                console.log("Matched Director:", matchedDirector);
                setDirector(matchedDirector);
              } else {
                setDirector({ name: "Director not found" });
              }
            })
            .catch((error) => {
              console.error("Error fetching directors list:", error);
              setDirector({ name: "Director not found" }); 
            });
        } else {
          console.log("No director name found in film data");
          setDirector({ name: "Director not available" });
        }
      })
      .catch((error) => {
        console.error("Error fetching film details:", error);
        setFilm({ title: "Film not found" });
      });
  }, [id]);

  if (!film) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{film.title}</h1>
      <img
        src={film.poster}
        alt={film.title}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <p>
        <strong>Released:</strong> {film.released}
      </p>
      <p>
        <strong>Genre:</strong>{" "}
        {Array.isArray(film.genre) ? film.genre.join(", ") : film.genre}
      </p>
      <p>
        <strong>Duration:</strong> {film.duration} minutes
      </p>
      <p>
        <strong>Directed by:</strong>{" "}
        {director?.name ? (
          <Link to={`/creator/${director.id}`}>{director.name}</Link>
        ) : (
          "Loading..."
        )}
      </p>
      <p>
        <strong>Written by:</strong>{" "}
        {Array.isArray(film.writer) ? film.writer.join(", ") : film.writer}
      </p>
      <p>
        <strong>Music by:</strong> {film.composer}
      </p>

      <p>
        <strong>Synopsis:</strong> {film.synopsis}
      </p>

      <p>
        <strong>Production Company:</strong> {film.production_company}
      </p>

      {film.trailer && (
        <a href={film.trailer} target="_blank" rel="noopener noreferrer">
          Watch Trailer
        </a>
      )}
      <br />
      {film.o_s_t && (
        <a href={film.o_s_t} target="_blank" rel="noopener noreferrer">
          Listen to Soundtrack
        </a>
      )}
    </div>
  );
}

export default FilmDetailsPage;
