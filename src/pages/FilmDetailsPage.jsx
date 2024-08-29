import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function FilmDetailsPage() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [director, setDirector] = useState({ name: null, id: null });
  const [similarFilms, setSimilarFilms] = useState([]);

  useEffect(() => {
    // Scroll to the top when the film ID changes
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");

      if (window.scrollY > window.innerHeight - 800) {
        navbar.style.opacity = 0;
      } else {
        navbar.style.opacity = 1;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        console.log("Film data:", data); // Log the film data
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
                setDirector({
                  name: matchedDirector.name,
                  id: matchedDirector.id,
                });
              } else {
                setDirector({ name: data.director, id: null });
              }
            })
            .catch((error) => {
              setDirector({ name: data.director, id: null });
            });
        } else {
          setDirector({ name: "Director not available", id: null });
        }

        // Fetch similar films
        if (data.genre && data.genre.length > 0) {
          fetch(`http://localhost:8000/api/films?genre=${data.genre[0]}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Similar films fetch failed: ${response.status}`
                );
              }
              return response.json();
            })
            .then((films) => {
              // Shuffle and select 4 random films, excluding the current film
              const filteredFilms = films.filter((f) => f.id !== data.id);
              const shuffled = filteredFilms.sort(() => 0.5 - Math.random());
              setSimilarFilms(shuffled.slice(0, 4));
            })
            .catch((error) => {
              console.error("Error fetching similar films:", error);
            });
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

      <div style={{ paddingTop: "80px", marginLeft: "165px" }}>
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
            <span style={{ fontSize: "20px", marginLeft: "10px" }}>
              ({film.released})
            </span>
          </h1>
          <div style={{ fontSize: "18px", marginRight: "165px" }}>
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

        {/* Container for Additional Film Details, Metascore, Streaming, and O.S.T Section */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Additional Film Details */}
          <div
            style={{
              marginTop: "0px",
              maxWidth: "540px",
              marginLeft: "85px",
              fontSize: "16px",
            }}
          >
            <p>{film.synopsis} </p>
            <p>
              <strong>{film.duration}'</strong>
            </p>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            {/* Metascore Section */}
            <div
              style={{
                marginTop: "0px",
                maxWidth: "120px",
                textAlign: "center",
                marginRight: "0px",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  marginBottom: "10px",
                  marginTop: "3px",
                }}
              >
                METASCORE
              </h2>
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "#780606",
                  padding: "5px",
                  border: "solid",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                }}
              >
                {film.metascore}
              </div>
            </div>
            {/* Streaming Section */}
            {film.streaming && film.streaming.length > 0 && (
              <div
                style={{
                  marginTop: "0px",
                  maxWidth: "250px",
                  textAlign: "right",
                  marginRight: "250px",
                }}
              >
                <h2 style={{ fontSize: "16px", marginBottom: "10px" }}>
                  STREAMING
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
                          style={{ height: "55px", objectFit: "contain" }}
                        />
                      </a>
                    ) : null
                  )}
                </div>

                {/* IN THEATERS Box for 2024 films */}
                {film.released === 2024 && (
                  <div
                    style={{
                      marginTop: "0px",
                      padding: "10px",
                      backgroundColor: "black",
                      color: "white",
                      textAlign: "center",
                      borderRadius: "5px",
                      marginLeft: "px",
                      height: "35px",
                      maxWidth: "80px",
                    }}
                  >
                    IN THEATERS
                  </div>
                )}
              </div>
            )}
            {/* O.S.T Section */}
            {film.ost && film.ost.length > 0 && (
              <div
                style={{
                  marginTop: "0px",
                  maxWidth: "120px",
                  textAlign: "center",
                  marginLeft: "-250px",
                  marginRight: "210px",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <h2
                  style={{
                    fontSize: "16px",
                    marginBottom: "10px",
                    marginTop: "3px",
                  }}
                >
                  O.S.T
                </h2>
                {film.ost.map((service, index) => (
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
                      style={{ height: "55px", objectFit: "contain" }}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Role-Name Section */}
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "8px",
            border: "3px solid #ccc",
            marginLeft: "85px",
            maxWidth: "900px",
            lineHeight: "180%",
            fontSize: "16px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
            <strong>Director:</strong>{" "}
            {director?.id ? (
              <Link to={`/creator/${director.id}`}>{director.name}</Link>
            ) : (
              director?.name || "N/A"
            )}
            <strong>Writer(s):</strong>{" "}
            {Array.isArray(film.writer)
              ? film.writer.join(", ")
              : film.writer || "N/A"}
            <strong>Composer:</strong>{" "}
            {Array.isArray(film.composer)
              ? film.composer.join(", ")
              : film.composer || "N/A"}
            <strong>Producer(s):</strong>{" "}
            {Array.isArray(film.producers)
              ? film.producers.join(", ")
              : film.producers || "N/A"}
            <strong>Cinematographer:</strong> {film.cinematographer || "N/A"}
            <strong>Editor:</strong> {film.editor || "N/A"}
            <strong>Casting Director:</strong> {film.casting_director || "N/A"}
            <strong>Production Designer:</strong>{" "}
            {film.production_designer || "N/A"}
            <strong>Production Company:</strong>{" "}
            {film.production_company || "N/A"}
          </div>
        </div>

        {/* Cast and Box Office Sections */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            marginLeft: "85px",
          }}
        >
          {/* Cast Section */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              borderRadius: "8px",
              border: "3px solid #ccc",
              maxWidth: "418px",
              lineHeight: "150%",
              fontSize: "16px",
            }}
          >
            <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Cast</h2>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr" }}>
              {film.cast.map((actor, index) => (
                <React.Fragment key={index}>
                  <strong>{actor.name}</strong>
                  <span style={{ marginLeft: "20px" }}>{actor.role}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Box Office Section */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              borderRadius: "8px",
              border: "3px solid #ccc",
              maxWidth: "418px",
              textAlign: "right",
              fontSize: "16px",
            }}
          >
            <h2 style={{ fontSize: "18px", marginBottom: "0px" }}>
              Box Office
            </h2>
            <div>
              <p>
                <strong>Budget:</strong> {film.box_office.budget}
              </p>
              <p>
                <strong>Opening Weekend:</strong>{" "}
                {film.box_office.opening_weekend}
              </p>
              <p>
                <strong>Gross (US & Canada):</strong>{" "}
                {film.box_office.gross_us_canada}
              </p>
              <p>
                <strong>Gross (World):</strong> {film.box_office.gross_world}
              </p>
              <p>
                <strong>Release Date:</strong> {film.release_date}
              </p>
              <p style={{ lineHeight: "100%" }}>
                <strong>Awards:</strong>
                {film.awards.other_wins} win
                {film.awards.other_wins > 1 ? "s" : ""} &{" "}
                {film.awards.other_nominations} nomination
                {film.awards.other_nominations > 1 ? "s" : ""}.
              </p>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        <section>
          <h2
            style={{
              marginLeft: "0px",
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "-20px",
            }}
          >
            You Might Also Like:
          </h2>
          <div
            className="film-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              marginLeft: "-30px",
              marginRight: "100px",
              gap: "0px",
              padding: "10px",
            }}
          >
            {similarFilms.map((similarFilm) => (
              <Link to={`/film/${similarFilm.id}`} key={similarFilm.id}>
                <div
                  className="film-card"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    height: "150px",
                    maxWidth: "250px",
                  }}
                >
                  <img
                    src={similarFilm.thumbnail}
                    alt={similarFilm.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      gap: "0px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    className="film-info"
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.0)",
                      color: "white",
                      padding: "10px",
                      boxSizing: "border-box",
                      textAlign: "left",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "14px",
                        margin: "0",
                        textTransform: "uppercase",
                      }}
                    >
                      {similarFilm.title}
                    </h3>
                    <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                      {similarFilm.released}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FilmDetailsPage;
