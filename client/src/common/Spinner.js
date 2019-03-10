import React from "react";
import spinner from "../img/loading.gif";

export default function Spinner() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <img
        src={spinner}
        alt="Loding..."
        style={{
          width: "80px",
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      />
    </div>
  );
}
