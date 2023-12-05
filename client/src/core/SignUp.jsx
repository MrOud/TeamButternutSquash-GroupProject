import React, { useState } from "react";
import Navigation from "./UIpartials/Navigation";
import { useNavigate } from "react-router-dom";
import "./css/forms.css";
let apiURL = "" // http://localhost:3000";

export default function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(apiURL + "/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      navigate("/signin");
    } catch (err) {
      console.error("Error during signup:", err);
    }
  }

  return (
    <div>
      <Navigation />
      <div className="authForm">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="ex. Ryan Firestarter"
            required={true}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="ex. ryan@startedthefire.dm"
            required={true}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="ex. ********"
            required={true}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
