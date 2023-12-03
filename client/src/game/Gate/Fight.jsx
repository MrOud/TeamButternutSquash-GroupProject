import { useEffect, useState } from "react";
import { checkForJourney, getProfile } from "../common/common-api";
import { attack } from "./gate-api";

export default function Fight({ setCurrentPage }) {
  const [monLevel, setMonLevel] = useState(0);
  const [monHp, setMonHp] = useState(0);
  const [monCurHp, setMonCurHp] = useState(0);
  const [monBaseDmg, setMonBaseDmg] = useState(0);
  const [monBaseDef, setMonBaseDef] = useState(0);

  const [playerName, setPlayerName] = useState("");
  const [playerHp, setPlayerHp] = useState(0);
  const [playerCurHp, setPlayerCurHp] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(0);
  const [playerDmg, setPlayerDmg] = useState(0);
  const [playerDef, setPlayerDef] = useState(0);
  const [playerWep, setPlayerWep] = useState("");
  const [playerArm, setPlayerArm] = useState("");

  const [phase, setPhase] = useState("fight");
  const [round, setRound] = useState(0);
  const [message, setMessage] = useState("You look at your opponent");

  function nextRound(data) {
    console.log("next round", data);
    setMessage(data.message);
    setPlayerCurHp(data.player.stats.curHitpoints);
    setMonCurHp(data.journey.monster.monsterCurHp);
    setRound(round + 1);
  }

  function victory(data) {
    console.log("win", data);
    setMessage(data.message);
    setPlayerCurHp(data.player.stats.curHitpoints);
    setMonCurHp(0);
    setRound(round + 1);
  }

  function defeat(data) {
    console.log("lose", data);
    setMessage(data.message);
    setPlayerCurHp(0);
    setRound(round + 1);
  }

  useEffect(() => {
    checkForJourney().then((data) => {
      const monster = data.journey.monster;
      setMonLevel(monster.monsterLvl);
      setMonHp(monster.monsterHp);
      setMonCurHp(monster.monsterCurHp);
      setMonBaseDmg(monster.baseDmg);
      setMonBaseDef(monster.baseArmor);
    });

    getProfile().then((data) => {
      setPlayerName(data.name);
      setPlayerHp(data.stats.hitpoints);
      setPlayerCurHp(data.stats.curHitpoints);
      setPlayerLevel(data.stats.level);
      setPlayerDmg(data.stats.baseDamage + data.dmgBonus);
      setPlayerDef(data.stats.baseArmor + data.defBonus);
      setPlayerWep(data.weapon);
      setPlayerArm(data.armor);
    });
  }, []);
  return (
    <>
      <p>You in a fight! Round {round}</p>
      <div>
        <h3>{playerName}</h3>
        <p>
          Level: {playerLevel} - {playerCurHp} / {playerHp} hp{" "}
        </p>
        <p>
          {playerWep} [{playerDmg} attack] - {playerArm} [{playerDef} defence]
        </p>
      </div>
      <div>
        <h3>You opponent</h3>
        <p>
          Level: {monLevel} - {monCurHp} / {monHp} hp{" "}
        </p>
        <p>
          {monBaseDmg} attack - {monBaseDef} defence
        </p>
      </div>
      <div>
        <p>{message}</p>
      </div>
      {phase == "fight" && (
        <>
          <button
            onClick={() =>
              attack().then((data) => {
                if (data.status == "fight") {
                  setPhase("fight");
                  nextRound(data);
                } else if (data.status == "victory") {
                  setPhase("victory");
                  victory(data);
                } else if (data.status == "lose") {
                  setPhase("lose");
                  defeat(data);
                }
              })
            }
          >
            Attack!
          </button>
        </>
      )}
      {phase == "victory" && (
        <>
          <button
            onClick={() => {
              setCurrentPage("News");
            }}
          >
            Return to Town a hero
          </button>
        </>
      )}
      {phase == "lose" && (
        <>
          <button
            onClick={() => {
              setCurrentPage("News");
            }}
          >
            Return to Town to recover
          </button>
        </>
      )}
    </>
  );
}
