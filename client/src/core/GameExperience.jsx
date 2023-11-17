import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./UIpartials/Navigation.jsx";
import News from "../game/News.jsx";
import AuthManager from "../auth/auth-helper.js";

export default function GameExperience() {
  const auth = new AuthManager();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated()) navigate("/");
  }, []);

  return (
    <div>
      <Navigation />
      <p>Welcome to L.O.R.E</p>
      {auth.isAuthenticated() && (
        <>
          <News />
        </>
      )}
    </div>
  );
}
