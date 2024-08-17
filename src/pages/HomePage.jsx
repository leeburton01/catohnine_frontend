import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function HomePage() {
  const [newReleases, setNewReleases] = useState([]);
  const [cronenbergs, setCronenbergs] = useState([]);
  const [arthouseHorror, setArthouseHorror] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/films")
      .then((response) => response.json())
      .then((data) => {
        const films2024 = data.filter((film) => film.released === 2024);
        setNewReleases(shuffleArray(films2024).slice(0, 4)); // Set to 4 films

        const cronenbergFilms = data.filter((film) => {
          const isCronenbergDirector =
            film.director &&
            (film.director.includes("David Cronenberg") ||
              film.director.includes("Brandon Cronenberg"));

          const isCronenbergWriter = Array.isArray(film.writer)
            ? film.writer.some(
                (writer) =>
                  writer.includes("David Cronenberg") ||
                  writer.includes("Brandon Cronenberg")
              )
            : typeof film.writer === "string"
            ? film.writer.includes("David Cronenberg") ||
              film.writer.includes("Brandon Cronenberg")
            : false;

          return isCronenbergDirector || isCronenbergWriter;
        });

        setCronenbergs(shuffleArray(cronenbergFilms).slice(0, 4));

        const arthouseHorrorFilms = data.filter((film) => {
          const arthouseHorrorIds = [2, 4, 5, 26, 27, 32, 37, 40, 41, 44];
          return arthouseHorrorIds.includes(film.id);
        });

        setArthouseHorror(shuffleArray(arthouseHorrorFilms).slice(0, 4));
      })
      .catch((error) => console.error("Error fetching films:", error));
  }, []);

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "black", fontSize: "24px" }}
          >
            Logo
          </Link>
        </div>
        <div>
          <Link
            to="/films"
            style={{
              marginRight: "20px",
              textDecoration: "none",
              color: "blue",
            }}
          >
            Search
          </Link>
          <Link
            to="/add-film"
            style={{ textDecoration: "none", color: "blue" }}
          >
            Contribute
          </Link>
        </div>
      </nav>

      {/* New Releases Section */}
      <section>
        <h2
          style={{
            marginLeft: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "-20px",
          }}
        >
          In Theaters
        </h2>
        <div
          className="film-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            padding: "10px",
          }}
        >
          {newReleases.map((film) => (
            <div
              key={film.id}
              className="film-card"
              style={{
                position: "relative",
                overflow: "hidden",
                height: "220px",
              }}
            >
              <img
                src={film.thumbnail}
                alt={film.title}
                style={{
                  width: "100%",
                  height: "100%",
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
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    margin: "0",
                    textTransform: "uppercase",
                  }}
                >
                  {film.title}
                </h3>
                <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                  {film.released}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Cronenbergs Section */}
      <section>
        <h2
          style={{
            marginLeft: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "-20px",
          }}
        >
          The Cronenbergs
        </h2>
        <div
          className="film-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            padding: "10px",
          }}
        >
          {cronenbergs.map((film) => (
            <div
              key={film.id}
              className="film-card"
              style={{
                position: "relative",
                overflow: "hidden",
                height: "220px",
              }}
            >
              <img
                src={film.thumbnail}
                alt={film.title}
                style={{
                  width: "100%",
                  height: "100%",
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
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    margin: "0",
                    textTransform: "uppercase",
                  }}
                >
                  {film.title}
                </h3>
                <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                  {film.released}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Arthouse Horror Section */}
      <section>
        <h2
          style={{
            marginLeft: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "-20px",
          }}
        >
          Arthouse Horror
        </h2>
        <div
          className="film-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            padding: "10px",
          }}
        >
          {arthouseHorror.map((film) => (
            <div
              key={film.id}
              className="film-card"
              style={{
                position: "relative",
                overflow: "hidden",
                height: "220px",
              }}
            >
              <img
                src={film.thumbnail}
                alt={film.title}
                style={{
                  width: "100%",
                  height: "100%",
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
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    margin: "0",
                    textTransform: "uppercase",
                  }}
                >
                  {film.title}
                </h3>
                <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                  {film.released}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
