import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

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
              const matchedDirector = directors.find(
                (d) => d.name === data.director
              );
              if (matchedDirector) {
                setDirector(matchedDirector);
              } else {
                setDirector({ name: "Director not found" });
              }
            })
            .catch((error) => {
              setDirector({ name: "Director not found" });
            });
        } else {
          setDirector({ name: "Director not available" });
        }
      })
      .catch((error) => {
        setFilm({ title: "Film not found" });
      });
  }, [id]);

  if (!film) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div style={{ paddingTop: "0px", marginLeft: "165px" }}>
        {/* Title and Genres */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              marginBottom: "20px",
              marginLeft: "0px",
            }}
          >
            {film.title}
            <span
              style={{ fontSize: "20px", color: "#780606", marginLeft: "10px" }}
            >
              ({film.released})
            </span>
          </h1>
          <div
            style={{
              fontSize: "18px",
              color: "#780606",
              marginRight: "165px",
            }}
          >
            {Array.isArray(film.genre) ? film.genre.join(", ") : film.genre}
          </div>
        </div>

        {/* Layout: Poster on the left, video player on the right */}
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          {/* Poster */}
          <div style={{ flex: "1", maxWidth: "300px" }}>
            <img
              src={film.poster}
              alt={film.title}
              style={{
                width: "100%",
                height: "auto",
                marginBottom: "10px",
              }}
            />
          </div>

          {/* Video Player */}
          <div style={{ flex: "2", maxWidth: "790px" }}>
            {film.streaming && film.streaming[0]?.freeToWatch === "yes" ? (
              <iframe
                width="100%"
                height="100%"
                src={film.streaming[0].youtubeLink}
                title="Full Movie"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "16/9",
                }}
              ></iframe>
            ) : film.trailer ? (
              <iframe
                width="100%"
                height="100%"
                src={film.trailer.replace("watch?v=", "embed/")}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "16/9",
                }}
              ></iframe>
            ) : (
              <p>Trailer not available.</p>
            )}
          </div>
        </div>

        {/* Container for Additional Film Details and Streaming Section */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Additional Film Details */}
          <div style={{ marginTop: "0px", maxWidth: "900px" }}>
            <p>{film.synopsis}</p>
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
              {Array.isArray(film.writer)
                ? film.writer.join(", ")
                : film.writer}
            </p>
            <p>
              <strong>Music by:</strong> {film.composer}
            </p>
            <p>
              <strong>Production Company:</strong> {film.production_company}
            </p>

            {film.o_s_t && (
              <a href={film.o_s_t} target="_blank" rel="noopener noreferrer">
                Listen to Soundtrack
              </a>
            )}
          </div>

          {/* Streaming Section */}
          {film.streaming && film.streaming.length > 0 && (
            <div
              style={{
                marginTop: "0px",
                maxWidth: "250px",
                textAlign: "right",
                marginRight: "165px",
              }}
            >
              <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
                Streaming
              </h2>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                {film.streaming.map((service, index) =>
                  service.serviceName &&
                  service.logoUrl &&
                  service.serviceUrl ? (
                    <a
                      key={index}
                      href={service.serviceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-block" }}
                    >
                      <img
                        src={service.logoUrl}
                        alt={service.serviceName}
                        style={{ height: "50px", objectFit: "contain" }}
                      />
                    </a>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilmDetailsPage;
