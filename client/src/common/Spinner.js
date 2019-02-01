import React from "react";
import spinner from "../img/loading.gif";

export default function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loding..."
        style={{ width: "80px", margin: "auto", display: "block" }}
      />
    </div>
  );
}
