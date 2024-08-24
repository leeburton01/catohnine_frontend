import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust the path as necessary
import "../App.css";

function HomePage() {
  const [newReleases, setNewReleases] = useState([]);
  const [cronenbergs, setCronenbergs] = useState([]);
  const [arthouseHorror, setArthouseHorror] = useState([]);
  const [argento, setArgento] = useState([]);
  const [zombieFilms, setZombieFilms] = useState([]);
  const [freeToWatch, setFreeToWatch] = useState([]);
  const [sciFiFavorites, setSciFiFavorites] = useState([]);
  const [a24Films, setA24Films] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/films")
      .then((response) => response.json())
      .then((data) => {
        const films2024 = data.filter((film) => film.released === 2024);
        setNewReleases(shuffleArray(films2024).slice(0, 4));

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

        const argentoFilms = data.filter(
          (film) => film.director === "Dario Argento"
        );

        setArgento(shuffleArray(argentoFilms).slice(0, 4));

        const zombieFilmIds = [13, 36, 46, 52];
        const zombieFilms = data.filter((film) =>
          zombieFilmIds.includes(film.id)
        );

        setZombieFilms(shuffleArray(zombieFilms).slice(0, 4));

        const freeFilms = data.filter((film) =>
          film.streaming?.some(
            (service) => service.freeToWatch === "yes" && service.youtubeLink
          )
        );

        setFreeToWatch(shuffleArray(freeFilms).slice(0, 4));

        const sciFiFilms = data.filter((film) => film.genre.includes("Sci-Fi"));

        setSciFiFavorites(shuffleArray(sciFiFilms).slice(0, 4));

        const a24Films = data.filter(
          (film) =>
            film.production_company &&
            film.production_company.toLowerCase().includes("a24")
        );

        setA24Films(shuffleArray(a24Films).slice(0, 4));
      })
      .catch((error) => console.error("Error fetching films:", error));
  }, []);

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <div>
      {/* Add the Navbar component here */}
      <Navbar />

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
            <Link to={`/film/${film.id}`} key={film.id}>
              <div
                className="film-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "200px",
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
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
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
            </Link>
          ))}
        </div>
      </section>

      {/* September Homage: Dario Argento Section */}
      <section>
        <h2
          style={{
            marginLeft: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "-20px",
          }}
        >
          September Homage: Dario Argento
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
          {argento.map((film) => (
            <Link to={`/film/${film.id}`} key={film.id}>
              <div
                className="film-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "200px",
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
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
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
            </Link>
          ))}
        </div>
      </section>

      {/* Brought to us by A24 Section */}
      <section>
        <h2
          style={{
            marginLeft: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "-20px",
          }}
        >
          Brought to us by A24
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
          {a24Films.map((film) => (
            <Link to={`/film/${film.id}`} key={film.id}>
              <div
                className="film-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "200px",
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
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
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
            </Link>
          ))}
        </div>
      </section>

      {/* Free to Watch Section */}
      <section>
        <h2
          style={{
            marginLeft: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "-20px",
          }}
        >
          Free to Watch
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
          {freeToWatch.map((film) => (
            <Link to={`/film/${film.id}`} key={film.id}>
              <div
                className="film-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "200px",
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
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
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
            </Link>
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
            <Link to={`/film/${film.id}`} key={film.id}>
              <div
                className="film-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "200px",
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
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
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
            </Link>
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
            <Link to={`/film/${film.id}`} key={film.id}>
              <div
                className="film-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "200px",
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
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
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
            </Link>
          ))}
        </div>
      </section>

      {/* Zombie Films Section */}
      <section>
        <h2
          style={{
            marginLeft: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "-20px",
          }}
        >
          Zombies are not Vegan
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
          {zombieFilms.map((film) => (
            <Link to={`/film/${film.id}`} key={film.id}>
              <div
                className="film-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "200px",
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
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
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
            </Link>
          ))}
        </div>
      </section>

      {/* Sci-Fi Favorites Section */}
      <section>
        <h2
          style={{
            marginLeft: "10px",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "-20px",
          }}
        >
          Sci-Fi Favorites
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
          {sciFiFavorites.map((film) => (
            <Link to={`/film/${film.id}`} key={film.id}>
              <div
                className="film-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "200px",
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
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
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
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
