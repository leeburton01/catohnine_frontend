import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreatorsPage() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

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
    fetch(`https://shiversbackend.adaptable.app/api/directors/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCreator(data);
      })
      .catch((error) =>
        console.error("Error fetching creator details:", error)
      );
  }, [id]);

  if (!creator) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div style={{ paddingTop: "80px", marginLeft: "165px" }}>
        {/* Name and Roles */}
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
            {creator.name}
          </h1>
          <div
            style={{
              fontSize: "18px",
              color: "#780606",
              marginRight: "165px",
            }}
          >
            {creator.roles.join(", ")}
          </div>
        </div>

        {/* Layout: Photo on the left, biography on the right */}
        <div
          style={{
            display: "flex",
            gap: "0px",
            alignItems: "flex-start",
            border: "",
            marginRight: "165px",
          }}
        >
          {/* Photo */}
          <div style={{ flex: "1", maxWidth: "320px" }}>
            <img
              src={creator.photo}
              alt={creator.name}
              style={{
                width: "70%",
                height: "auto",
                marginBottom: "0px",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Biography */}
          <div style={{ flex: "2", maxWidth: "800px", marginTop: "-18px" }}>
            <p>
              <strong></strong> {creator.biography}
            </p>
          </div>
        </div>

        {/* Known For Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0px",
          }}
        >
          <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>Known for</h2>
        </div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {creator.known_for.slice(0, 4).map((film) => (
            <div
              key={film.id}
              style={{
                flex: "1 1 23%", 
                maxWidth: "260px",
                textAlign: "center",
                marginBottom: "20px",
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden", 
              }}
            >
              <Link
                to={`/film/${film.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  style={{
                    width: "100%",
                    height: "160px",
                  }}
                />
                {/* Overlay Title and Year */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    color: "#fff",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                    fontWeight: "bold",
                    fontSize: "14px",
                    textAlign: "left",
                    textTransform: "uppercase",
                  }}
                >
                  <div>{film.title}</div>
                  <div style={{ fontSize: "12px", marginTop: "5px" }}>
                    {film.released}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreatorsPage;
