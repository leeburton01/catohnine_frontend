import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CreatorsPage() {
  const { id } = useParams(); 
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    
    fetch(`http://localhost:8000/api/directors/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched creator data:", data); 
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
    <div style={{ padding: "20px" }}>
      <h1>{creator.name}</h1>
      <p>
        <strong>Roles:</strong> {creator.roles.join(", ")}
      </p>
      <p>
        <strong>Biography:</strong> {creator.biography}
      </p>
      <p>
        <strong>Known for:</strong>
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {creator.known_for.map((film) => (
          <div key={film.id} style={{ width: "150px", textAlign: "center" }}>
            <Link to={`/film/${film.id}`}>
              <img
                src={film.thumbnail}
                alt={film.title}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
              <p style={{ margin: "10px 0 0 0" }}>{film.title}</p>
              <p style={{ margin: "5px 0 0 0", color: "gray" }}>
                {film.released}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <img
        src={creator.photo}
        alt={creator.name}
        style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }}
      />
    </div>
  );
}

export default CreatorsPage;
