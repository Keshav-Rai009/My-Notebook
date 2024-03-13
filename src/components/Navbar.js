import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = (props) => {
  const navigate = useNavigate();
  const logoutUser = (e) => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav
      className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/mynotes">
                My Notes
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
            {localStorage.getItem("token") ? (
              <Link
                className="btn btn-primary mx-2"
                to="/login"
                role="button"
                onClick={logoutUser}
              >
                Logout
              </Link>
            ) : (
              <div className="d-flex">
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link className="btn btn-primary" to="/signup" role="button">
                  Signup
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

Navbar.propType = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string,
};

Navbar.defaultProps = {
  title: "title",
  about: "About",
};

export default Navbar;
