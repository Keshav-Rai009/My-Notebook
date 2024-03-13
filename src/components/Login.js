import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const HOST = "http://localhost:5000";

export default function Login() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${HOST}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": true,
          "Access-Control-Allow-Methods": "POST",
        },
        body: JSON.stringify(cred),
      });
      const res = await response.json();
      if (!res.success) alert("Invalid credentials");
      else {
        localStorage.setItem("token", res.jwtToken);
        navigate("/");
      }
    } catch (error) {
      alert("Invalid credentials" + error);
    }
  };

  const onChange = (event) => {
    setCred({ ...cred, [event.target.id]: event.target.value });
  };

  return (
    <div className="container">
      <h1 className="mt-5">Login to myNotebook</h1>
      <form className="mt-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
        <button type="submit" className="btn btn-primary" onClick={loginUser}>
          Submit
        </button>
      </form>
    </div>
  );
}
