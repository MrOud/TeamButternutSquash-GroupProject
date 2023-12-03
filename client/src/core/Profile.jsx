import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./UIpartials/Navigation";
import { getProfile } from "../game/common/common-api.js";
import "../game/common/common.css";
import AuthManager from "../auth/auth-helper";

export default function Profile() {
  //Check for authentication
  const auth = new AuthManager();
  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState("");

  const [playerLevel, setPlayerLevel] = useState(0);
  const [playerExp, setPlayerExp] = useState(0);
  const [playerNextLevel, setPlayerNextLevel] = useState(0);

  const [wep, setWep] = useState("");
  const [wepBonus, setWepBonus] = useState(0);

  const [arm, setArm] = useState("");
  const [armBonus, setArmBonus] = useState(0);

  const [goldInHand, setGoldInHand] = useState(0);
  const [goldAccount, setGoldAccount] = useState(0);

  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [int, setInt] = useState(0);

  const [hp, setHp] = useState(0);
  const [curHp, setCurHp] = useState(0);

  const [stam, setStam] = useState(0);
  const [curStam, setCurStam] = useState(0);

  const [skillpoints, setSkillpoints] = useState(0);
  const [curSkillpoints, setCurSkillpoints] = useState(0);

  const [baseDmg, setBaseDmg] = useState(0);
  const [baseDef, setBaseDef] = useState(0);

  const [luck, setLuck] = useState(0);

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate("/");
      return;
    }

    getProfile().then((data) => {
      //Name
      setPlayerName(data.name);
      //Exp
      setPlayerLevel(data.stats.level);
      setPlayerExp(data.stats.experience);
      setPlayerNextLevel(
        Math.ceil(
          5000 * (data.stats.level * Math.sqrt(Math.pow(data.stats.level, 3)))
        )
      );
      //Wealth
      setGoldInHand(data.gold);
      setGoldAccount(data.accountBalance);

      //Equipment
      setWep(data.weapon);
      setWepBonus(data.dmgBonus);
      setArm(data.armor);
      setArmBonus(data.defBonus);
      //Stats
      setStr(data.stats.strength);
      setDex(data.stats.dexterity);
      setInt(data.stats.intelligence);

      //Secondary Stats
      setHp(data.stats.hitpoints);
      setCurHp(data.stats.curHitpoints);

      setStam(data.stats.stamina);
      setCurStam(data.stats.curStamina);

      setSkillpoints(data.stats.skillPoints);
      setCurSkillpoints(data.stats.curSkillPoints);

      setBaseDmg(data.stats.baseDamage);
      setBaseDef(data.stats.baseArmor);

      setLuck(data.stats.luck);
    });
  }, []);

  return (
    <div>
      <Navigation />
      <p>Your profile</p>
      <h2>{playerName}</h2>
      <div className="merp">
        <p>
          Level: {playerLevel} - Experience: {playerExp} of {playerNextLevel}
        </p>
        <p>
          Gold: {goldInHand} - Bank Balance: {goldAccount}
        </p>
        <p>
          Current Weapon: {wep} (+{wepBonus})
        </p>
        <p>
          Current Armor: {arm} (+{armBonus})
        </p>
      </div>
      <div>
        <div>
          <h3>Primary Stats</h3>
          <p>Strength - {str}</p>
          <p>Dexterity - {dex}</p>
          <p>Intelligence - {int}</p>
        </div>
        <div>
          <h3>Secondary Stats</h3>
          <p>
            Hitpoints - {curHp} / {hp}
          </p>
          <p>
            Stamina - {curStam} / {stam}
          </p>
          <p>
            Skillpoints - {curSkillpoints} / {skillpoints}
          </p>
          <p>Base Attack - {baseDmg}</p>
          <p>Base Defence - {baseDef}</p>
          <p>Luck - {luck} </p>
        </div>
      </div>
    </div>
  );
}
