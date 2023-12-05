import React, { useState } from "react";
import Navigation from "./UIpartials/Navigation";
import AuthManager from "../auth/auth-helper";
import { useNavigate } from "react-router-dom";
import "./css/forms.css";
let apiURL = "" // http://localhost:3000";

export default function SignIn() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(apiURL + "/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      //Authenticate user and store token / user data
      let auth = new AuthManager();
      auth.authenticate(data.token, () => {
          sessionStorage.setItem("user", JSON.stringify(data.user));
          sessionStorage.setItem("firstLogin", "true");
          if (data.user.player === null) {
            navigate("/create");
          } else {
            navigate("/play");
          }
        });
    } catch (err) {
      console.error("Error during signin:", err);
    }
  }

  return (
    <div>
      <Navigation />
      <div className="authForm">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
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
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
