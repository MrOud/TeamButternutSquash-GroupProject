import { useEffect, useState } from "react";
import { getNextPhase, startFight, abandonFight } from "./gate-api.js";
import { checkForJourney } from "../common/common-api.js";
export default function Journey({ setCurrentPage }) {
  const [curRound, setCurRound] = useState(0);
  const [curHard, setCurHard] = useState(0);
  const [curReward, setCurReward] = useState(0);
  const [curStam, setCurStam] = useState(0);
  const [stam, setStam] = useState(0);

  useEffect(() => {
    checkForJourney().then((data) => {
      const journey = data.journey;
      setCurRound(journey.round);
      setCurHard(journey.hard);
      setCurReward(journey.reward);
      setCurStam(data.curStam);
      setStam(data.stam);
    });
  }, []);

  return (
    <>
      <div>
        <h2>Current Journey</h2>
        <p>Re-rolls remaining: {3 - curRound}</p>
        <p>Hardness: {(curHard * 100).toFixed(2)}%</p>
        <p>Reward: {(curReward * 100).toFixed(2)}%</p>

        <p>Each re-roll costs 1 stamina</p>
        <p>
          Stamina: {curStam}/{stam}
        </p>

        <button
          onClick={() => {
            getNextPhase().then((data) => {
              const journey = data.journey;
              setCurRound(journey.round);
              setCurHard(journey.hard);
              setCurReward(journey.reward);
            });
          }}
        >
          Re-Roll
        </button>
        <button
          onClick={() => {
            startFight().then(() => {
              setCurrentPage("News");
            });
          }}
        >
          Fight
        </button>
        <button
          onClick={() => {
            abandonFight().then(() => {
              setCurrentPage("News");
            });
          }}
        >
          Return to Town
        </button>
      </div>
    </>
  );
}
