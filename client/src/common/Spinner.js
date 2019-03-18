import React from "react";
import spinner from "../img/loading.gif";

export default function Spinner() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <img
        src={spinner}
        alt="Loding..."
        style={{
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignSelf: "center"
        }}
      />
    </div>
  );
}
