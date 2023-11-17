import React, { useState } from "react";
import Navigation from "./UIpartials/Navigation";
import "./css/forms.css";

export default function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      window.location.replace("/play");
    } catch (err) {
      console.error("Error during signup:", err);
    }
  }

  return (
    <div >
      <Navigation />
      <div className="authForm">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="ex. ryan@startedthefire.dm"
            required={true}
          />
          <label htmlFor="password">Password</label>
          <input
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
