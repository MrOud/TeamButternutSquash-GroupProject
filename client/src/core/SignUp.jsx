import React, { useState } from "react";
import Navigation from "./UIpartials/Navigation";
import "./css/signUp.css";
import "./css/forms.css";

export default function SignUp() {
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
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log(data);
    } catch (err) {
      console.error("Error during signup:", err);
    }
  }

  return (
    <div >
      <Navigation />
      <div className="signUp">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="ex. Ryan Firestarter"
            required={true}
          />
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
