import { useEffect, useState } from "react";
import { getNextPhase, startFight } from "./gate-api.js";
import { checkForJourney } from "../common/common-api.js";
export default function Journey({ setBattlePhase }) {
  const [curRound, setCurRound] = useState(0);
  const [curHard, setCurHard] = useState(0);
  const [curReward, setCurReward] = useState(0);

  useEffect(() => {
    checkForJourney().then((data) => {
      const journey = data.journey;
      setCurRound(journey.round);
      setCurHard(journey.hard);
      setCurReward(journey.reward);
    });
  }, []);

  return (
    <div>
      <h2>Current Journey</h2>
      <p>Round: {curRound}</p>
      <p>Hardness: {(curHard * 100).toFixed(2)}%</p>
      <p>Reward: {(curReward * 100).toFixed(2)}%</p>

      <button
        onClick={() => {
          getNextPhase();
        }}
      >
        Re-Roll
      </button>
      <button
        onClick={() => {
          startFight().then((data) => {
            console.log(data);
          });
        }}
      >
        Fight
      </button>
    </div>
  );
}
