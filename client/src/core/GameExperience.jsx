import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./UIpartials/Navigation.jsx";
import News from "../game/News/News.jsx";
import TownSquare from "../game/TownSquare/TownSquare.jsx";
import TownHall from "../game/TownHall/TownHall.jsx";
import WeaponSmith from "../game/WeaponSmith/WeaponSmith.jsx";
import Armorer from "../game/Armorer/Armorer.jsx";
import TrainingField from "../game/TrainingField/TrainingField.jsx";
import Bank from "../game/Bank/Bank.jsx";
import Gate from "../game/Gate/Gate.jsx";
import AuthManager from "../auth/auth-helper.js";

export default function GameExperience() {
  const auth = new AuthManager();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState("News");

  useEffect(() => {
    if (!auth.isAuthenticated()) navigate("/");
  }, []);

  return (
    <div>
      <Navigation />
      {auth.isAuthenticated() && (
        <>
          {console.log("Current page: " + currentPage)}
          {currentPage === "News" && <News setCurrentPage={setCurrentPage} />}
          {currentPage === "Town" && (
            <TownSquare setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "TownHall" && (
            <TownHall setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "WepSmith" && (
            <WeaponSmith setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "Armorer" && (
            <Armorer setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "TrainingFields" && (
            <TrainingField setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "Bank" && <Bank setCurrentPage={setCurrentPage} />}
          {currentPage === "Gate" && <Gate setCurrentPage={setCurrentPage} />}
        </>
      )}
    </div>
  );
}
