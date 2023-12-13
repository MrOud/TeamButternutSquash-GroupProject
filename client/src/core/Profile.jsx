import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./UIpartials/Navigation";
import { getProfile } from "../game/common/common-api.js";
import "./css/profile.css";
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
      <div className="statsPage">
        <div className="title">
          <h1>{playerName}</h1>
        </div>
        <div className="primaryStats">
          <h2>Primary Stats</h2>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/4419/4419256.png" alt="strength" height="50px"/>
            <p>Strength: {str}</p>
          </div>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/763/763812.png" alt="dexterity" height="50px"/>
            <p>Dexterity: {dex}</p>
          </div>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/1491/1491416.png" alt="intelligence" height="50px"/>
            <p>Intelligence: {int}</p>
          </div>
          <h2>Equipment</h2>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/2466/2466937.png" alt="weapon" height="50px"/>
            <p>Weapon: {wep} (+{wepBonus})</p>
          </div>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/286/286627.png" alt="armor" height="50px"/>
            <p>Armor: {arm} (+{armBonus})</p>
          </div>
        </div>
        <div className="baseStats">
          <h2>General</h2>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/6778/6778935.png" alt="level" height="50px"/>
            <p>Level: {playerLevel}</p>
          </div>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/5542/5542205.png" alt="xp" height="50px"/>
            <p>{playerExp} / {playerNextLevel}</p>
          </div>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/4133/4133462.png" alt="gold" height="50px"/>
            <p>Gold: {goldInHand}</p>
          </div>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/924/924879.png" alt="bank" height="50px"/>
            <p>Bank: {goldAccount}</p>
          </div>
        </div>
        <div className="secondaryStats">
          <h2>Secondary Stats</h2>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/10508/10508125.png" alt="HP" height="50px"/>
            <p>Hitpoints: {curHp} / {hp}</p>
          </div>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/2511/2511629.png" alt="Stamina" height="50px"/>
            <p>Stamina: {curStam} / {stam}</p>
          </div>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/10484/10484259.png" alt="Skillpoints" height="50px"/>
            <p>Skillpoints: {curSkillpoints} / {skillpoints}</p>
          </div>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/9742/9742923.png" alt="Base Attack" height="50px"/>
            <p>Base Attack: {baseDmg}</p>
          </div>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/8193/8193190.png" alt="Base Defence" height="50px"/>
            <p>Base Defence: {baseDef}</p>
          </div>
          <div className="stat">
            <img src="https://cdn-icons-png.flaticon.com/128/781/781410.png" alt="Luck" height="50px"/>
            <p>Luck: {luck}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
