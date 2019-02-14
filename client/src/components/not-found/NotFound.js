import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1 className="display-4 justify-content-center">Page Not Found</h1>
      <p>Sorry, this page does not exist</p>
      <Link to="/" className="btn btn-info">
        Go Back Home
      </Link>
    </div>
  );
}
