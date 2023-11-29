import React, {useEffect, useState} from "react";
import Navigation from "./UIpartials/Navigation";
import "./css/forms.css";
import AuthManager from "../auth/auth-helper";
import { useNavigate } from "react-router-dom";

export default function CreateChar() {
  const navigate = useNavigate();
  const auth = new AuthManager();

  useEffect(() => {
    if (!auth.isAuthenticated()) navigate("/");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("user").player !== null) navigate("/play");
  }, []);

  const [player, setPlayer] = useState({
    user_id: "",
    name: "",
    stats: {
      strength: 0,
      dexterity: 0,
      intelligence: 0,
    }
  });

  const [points, setPoints] = useState(10);

  function handleChange(e) {
    if (e.target.name === "strength") {
      setPlayer({
        ...player,
        stats: {
          ...player.stats,
          strength: e.target.value,
        }
      });
      if (10 - e.target.value - player.stats.dexterity - player.stats.intelligence < 0) {
        setPoints(0);
        setPlayer({
          ...player,
          stats: {
            ...player.stats,
            dexterity: 10 - player.stats.strength - player.stats.intelligence,
          }

        })
      } else {
        setPoints(10 - e.target.value - player.stats.dexterity - player.stats.intelligence);
      }
    } else if (e.target.name === "dexterity") {
      setPlayer({
        ...player,
        stats: {
          ...player.stats,
          dexterity: e.target.value,
        }
      });
      if (10 - e.target.value - player.stats.strength - player.stats.intelligence < 0) {
        setPoints(0);
        setPlayer({
          ...player,
          stats: {
            ...player.stats,
            strength: 10 - player.stats.dexterity - player.stats.intelligence,
          }
        })
      } else {
        setPoints(10 - e.target.value - player.stats.strength - player.stats.intelligence);
      }
    } else if (e.target.name === "intelligence") {
      setPlayer({
        ...player,
        stats: {
          ...player.stats,
          intelligence: e.target.value,
        }
      });
      if (10 - e.target.value - player.stats.strength - player.stats.dexterity < 0) {
        setPoints(0);
        setPlayer({
          ...player,
          stats: {
            ...player.stats,
            strength: 10 - player.stats.dexterity - player.stats.intelligence,
          }
        })
      } else {
        setPoints(10 - e.target.value - player.stats.strength - player.stats.dexterity);
      }
    } else {
      setPlayer({...player, [e.target.name]: e.target.value});
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      player.user_id = JSON.parse(sessionStorage.getItem("user"))._id;
      const response = await fetch("http://localhost:3000/api/player", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify(player)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      navigate("/play");
    } catch (err) {
      console.error("Error during character creation:", err);
    }
  }

  return (
    <div>
      <Navigation/>
      <div className="authForm">
        <form onSubmit={handleSubmit}>
          <h1>Character Creation</h1>
          <label htmlFor="name">Player Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={player.name}
            onChange={handleChange}
            placeholder="ex. Ryan Firestarter"
            min="3"
            required={true}
          />
          <p id="skillPoints">Remaining skill points: {points}</p>
          <div className="stats-container">
            <div className="stat">
              <label htmlFor="strength">Strength</label>
              <input
                id="strength"
                type="number"
                name="strength"
                value={player.stats.strength}
                onChange={handleChange}
                min="0"
                max="5"
                required={true}
              />
            </div>
            <div className="stat">
              <label htmlFor="dexterity">Dexterity</label>
              <input
                id="dexterity"
                type="number"
                name="dexterity"
                value={player.stats.dexterity}
                onChange={handleChange}
                min="0"
                max="5"
                required={true}
              />
            </div>
            <div className="stat">
              <label htmlFor="intelligence">Intelligence</label>
              <input
                id="intelligence"
                type="number"
                name="intelligence"
                value={player.stats.intelligence}
                onChange={handleChange}
                min="0"
                max="5"
                required={true}
              />
            </div>
          </div>
          <button type="submit" disabled={points !== 0 || player.name === ""}>Create Character</button>
        </form>
      </div>
    </div>
  );
}