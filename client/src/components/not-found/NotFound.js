import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="profile__page__not__found">
      <h1 className="heading-secondary--main">Page Not Found</h1>
      <p>Sorry, this page does not exist</p>
      <Link to="/profiles" className="btn btn--form">
        Go Back To Profiles
      </Link>
    </div>
  );
}
