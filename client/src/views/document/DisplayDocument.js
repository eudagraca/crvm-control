import React, { useState } from "react";
import { useParams } from "react-router-dom";

const DisplayDocument = () => {
  const {uri} = useParams()
  return (
    <div>
      <iframe
        src={"http://localhost:9000/documents/" + encodeURIComponent(uri)}
        title="Documento Primavera"
        style={{ width: "100%", height: "800px" }}
        onLoad={() => console.log("PDF loaded")}
      />
    </div>
  );
};

export default DisplayDocument;
