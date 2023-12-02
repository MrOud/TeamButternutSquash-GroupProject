import { useEffect, useState } from "react";
import "../common/common.css";
import InTown from "./InTown";
import Journey from "./Journey";
import { checkForJourney } from "../common/common-api.js";

export default function Gate({ setCurrentPage }) {
  const [battlePhase, setBattlePhase] = useState("InTown");

  useEffect(() => {}, []);
  checkForJourney().then((data) => {
    console.log(data);
    if (!data.result) {
      setBattlePhase("InTown");
    } else {
      setBattlePhase("Journey");
    }
  });
  return (
    <>
      {console.log(battlePhase)}
      {battlePhase == "InTown" && (
        <InTown
          setBattlePhase={setBattlePhase}
          setCurrentPage={setCurrentPage}
        />
      )}
      {battlePhase == "Journey" && <Journey setBattlePhase={setBattlePhase} />}
    </>
  );
}
