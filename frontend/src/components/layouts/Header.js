import React from "react";
import { Link } from "react-router-dom";

/** In the header we make use of the UserContext to be able to display the user name
 * additionally here we place the auth options (log in, register login --> change dynamically depending if user is logged in or not)*/

export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div class="container">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
      </div>
      <div class="container">
        <Link to="/history" className="navbar-brand">
          History
        </Link>
      </div>
      <div className="collapse navbar-collapse"></div>
    </nav>
  );
}
