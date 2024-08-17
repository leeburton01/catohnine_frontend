import React from "react";
import { useParams } from "react-router-dom";

function CreatorsPage() {
  const { type, id } = useParams();

  return (
    <div>
      <h1>Creator: {type}</h1>
      <p>
        Details for {type} with ID: {id}
      </p>
      {/* Fetch and display the creator's details based on the type (director, composer, writer) and ID */}
    </div>
  );
}

export default CreatorsPage;
