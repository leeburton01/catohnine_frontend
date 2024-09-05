import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FilmDetailsPage() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [directors, setDirectors] = useState([]);
  const [similarFilms, setSimilarFilms] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");

      if (navbar) {
        if (window.scrollY > window.innerHeight - 800) {
          navbar.style.opacity = 0;
        } else {
          navbar.style.opacity = 1;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchFilmAndDirectors = async () => {
      try {
        const filmResponse = await fetch(
          `https://shiversbackend.adaptable.app/films/${id}`
        );
        if (!filmResponse.ok) {
          throw new Error(`Film fetch failed: ${filmResponse.status}`);
        }
        const filmData = await filmResponse.json();
        setFilm(filmData);

        const directorsResponse = await fetch(
          `http://localhost:8000/api/directors`
        );
        if (!directorsResponse.ok) {
          throw new Error(
            `Directors fetch failed: ${directorsResponse.status}`
          );
        }
        const directorsData = await directorsResponse.json();
        setDirectors(directorsData);

        // Fetch similar films based on genre
        if (filmData.genre && filmData.genre.length > 0) {
          const similarFilmsResponse = await fetch(
            `http://localhost:8000/api/films?genre=${filmData.genre[0]}`
          );
          if (!similarFilmsResponse.ok) {
            throw new Error(
              `Similar films fetch failed: ${similarFilmsResponse.status}`
            );
          }
          const similarFilmsData = await similarFilmsResponse.json();
          const filteredFilms = similarFilmsData.filter(
            (f) => f.id !== filmData.id
          );
          const shuffled = filteredFilms.sort(() => 0.5 - Math.random());
          setSimilarFilms(shuffled.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching film or directors:", error);
        setFilm({ title: "Film not found" });
      }
    };

    fetchFilmAndDirectors();
  }, [id]);

  
  const renderRole = (role) => {
    if (Array.isArray(role)) {
      
      return role.map((item, index) => (
        <React.Fragment key={index}>
          {renderRole(item)}
          {index < role.length - 1 && ", "}
        </React.Fragment>
      ));
    } else if (typeof role === "object" && role !== null) {
      
      const director = directors.find((d) => d.name === role.name);
      if (director) {
        return (
          <Link
            key={director.id}
            style={{ color: "black", textDecoration: "none" }} // No underline
            to={`/creator/${director.id}`}
          >
            {director.name}
          </Link>
        );
      }
      return role.name || "N/A";
    } else {
      
      const director = directors.find((d) => d.name === role);
      if (director) {
        return (
          <Link
            key={director.id}
            style={{ color: "black", textDecoration: "none" }} // No underline
            to={`/creator/${director.id}`}
          >
            {director.name}
          </Link>
        );
      }
      return role || "N/A";
    }
  };

  if (!film) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />

      <div style={{ paddingTop: "80px", marginLeft: "165px" }}>
        {/* Film Title, Genre, and Poster */}
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

        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              marginTop: "0px",
              maxWidth: "540px",
              marginLeft: "85px",
              fontSize: "16px",
            }}
          >
            <p>{film.synopsis}</p>
            <p>
              <strong>{film.duration}'</strong>
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <a
              href={film.metacritic}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: "0px",
                maxWidth: "120px",
                textAlign: "center",
                marginRight: "10px",
                padding: "10px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              <h2
                style={{
                  fontSize: "16px",
                  marginBottom: "10px",
                  marginTop: "3px",
                  color: "#000",
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
            </a>
            {film.streaming && film.streaming.length > 0 && (
              <div
                style={{
                  marginTop: "0px",
                  maxWidth: "250px",
                  textAlign: "right",
                  marginRight: "260px",
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
            {film.ost && film.ost.length > 0 && (
              <div
                style={{
                  marginTop: "0px",
                  maxWidth: "120px",
                  textAlign: "center",
                  marginLeft: "-250px",
                  marginRight: "230px",
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
            <div>
              <strong>Director:</strong>
            </div>
            <div>{renderRole(film.director)}</div>

            <div>
              <strong>Writer(s):</strong>
            </div>
            <div>{renderRole(film.writer)}</div>

            <div>
              <strong>Composer(s):</strong>
            </div>
            <div>{renderRole(film.composer)}</div>

            <div>
              <strong>Producer(s):</strong>
            </div>
            <div>{renderRole(film.producers)}</div>

            <div>
              <strong>Cinematographer:</strong>
            </div>
            <div>{renderRole(film.cinematographer)}</div>

            <div>
              <strong>Editor:</strong>
            </div>
            <div>{renderRole(film.editor)}</div>

            <div>
              <strong>Casting Director:</strong>
            </div>
            <div>{renderRole(film.casting_director)}</div>

            <div>
              <strong>Production Designer:</strong>
            </div>
            <div>{renderRole(film.production_designer)}</div>

            <div>
              <strong>Production Company:</strong>
            </div>
            <div>{renderRole(film.production_company)}</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            marginLeft: "85px",
          }}
        >
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
