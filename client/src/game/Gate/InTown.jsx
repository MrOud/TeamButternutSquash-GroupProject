import { useEffect, useState } from "react";
import { getProfile } from "../common/common-api";
import { startJourney } from "./gate-api.js";

export default function InTown({ setCurrentPage }) {
  const [hp, setHp] = useState(0);
  const [curHp, setCurHp] = useState(0);

  const [stam, setStam] = useState(0);
  const [curStam, setCurStam] = useState(0);

  const [baseDmg, setBaseDmg] = useState(0);
  const [baseDef, setBaseDef] = useState(0);

  const [wep, setWep] = useState("");
  const [wepBonus, setWepBonus] = useState(0);

  const [arm, setArm] = useState("");
  const [armBonus, setArmBonus] = useState(0);

  useEffect(() => {
    //Get player Data
    getProfile().then((data) => {
      setHp(data.stats.hitpoints);
      setCurHp(data.stats.curHitpoints);

      setStam(data.stats.stamina);
      setCurStam(data.stats.curStamina);

      setWep(data.weapon);
      setWepBonus(data.dmgBonus);
      setArm(data.armor);
      setArmBonus(data.defBonus);
      setBaseDmg(data.stats.baseDamage);
      setBaseDef(data.stats.baseArmor);
    });
  }, []);
  return (
    <>
      <h2>The Gates</h2>
      <p>
        From here expeditions are launched to search for gold, glory, and
        discovery!
      </p>
      <div>
        <p>
          Current hitpoints: {curHp} / {hp}
        </p>
        <p>
          Current Stamina: {curStam} / {stam}
        </p>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>Base</td>
              <td>Bonus</td>
              <td>Total</td>
            </tr>
            <tr>
              <td>{wep}</td>
              <td>{baseDmg}</td>
              <td>{wepBonus}</td>
              <td>{wepBonus + baseDmg}</td>
            </tr>
            <tr>
              <td>{arm}</td>
              <td>{baseDef}</td>
              <td>{armBonus}</td>
              <td>{armBonus + baseDef}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3
        onClick={() => {
          startJourney().then(() => {
            setCurrentPage("News");
          });
        }}
      >
        Start an Adventure
      </h3>
      <p
        className="gameLink"
        onClick={() => {
          setCurrentPage("Town");
        }}
      >
        Back to Town
      </p>
    </>
  );
}
