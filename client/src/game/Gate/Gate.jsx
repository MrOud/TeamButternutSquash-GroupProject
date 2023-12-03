import { useEffect, useState } from "react";
import "../common/common.css";
import InTown from "./InTown";
import Journey from "./Journey";
import Fight from "./Fight.jsx";
import { checkForJourney } from "../common/common-api.js";

export default function Gate({ setCurrentPage }) {
  const [battlePhase, setBattlePhase] = useState("InTown");

  useEffect(() => {}, []);
  checkForJourney().then((data) => {
    if (!data.result) {
      setBattlePhase("InTown");
    } else {
      if (data.journey.round == 4) {
        setBattlePhase("Fight");
      } else {
        setBattlePhase("Journey");
      }
    }
  });
  return (
    <>
      {battlePhase == "InTown" && <InTown setCurrentPage={setCurrentPage} />}
      {battlePhase == "Journey" && <Journey setCurrentPage={setCurrentPage} />}
      {battlePhase == "Fight" && <Fight setCurrentPage={setCurrentPage} />}
    </>
  );
}
