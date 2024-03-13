import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const HOST = "http://localhost:5000";

export default function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${HOST}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": true,
          "Access-Control-Allow-Methods": "POST",
        },
        body: JSON.stringify(userDetails),
      });
      const res = await response.json();
      if (!res.success) alert("Sign up failed");
      else {
        localStorage.setItem("token", res.jwtToken);
        navigate("/");
      }
    } catch (error) {
      alert("Invalid credentials" + error);
    }
  };

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-3">Sign up to myNotebook</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={signUp}>
          Submit
        </button>
      </form>
    </div>
  );
}
