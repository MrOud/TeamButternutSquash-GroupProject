import "../common/common.css";
import { useEffect, useState } from "react";
import Navigation from "../../core/UIpartials/Navigation";
import { getProfile } from "../common/common-api";
import { levelUp, buyStat } from "./training-api";



export default function TrainingField({ setCurrentPage }) {
  const [playerName, setPlayerName] = useState("");
  const [playerLevel, setPlayerLevel] = useState(0);
  const [playerExp, setPlayerExp] = useState(0);
  const [playerNextLevel, setPlayerNextLevel] = useState(0);
  const [goldInHand, setGoldInHand] = useState(0);
  

  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [int, setInt] = useState(0);
  const [hp, setHp] = useState(0);
  const [curHp, setCurHp] = useState(0);
  const [stam, setStam] = useState(0);
  const [curStam, setCurStam] = useState(0);
  const [shopMessage, setShopMessage] = useState("");

useEffect(() => {
  getProfile().then((data) => {
    setPlayerName(data.name);
    setPlayerLevel(data.stats.level);
    setPlayerExp(data.stats.experience)
    setPlayerNextLevel(
     Math.ceil(
         5000 * (data.stats.level * Math.sqrt(Math.pow(data.stats.level, 3)))
      )
    );
    setGoldInHand(data.gold);
    setStr(data.stats.strength);
    setDex(data.stats.dexterity);
    setInt(data.stats.intelligence);
    setStam(data.stats.stamina);
    setCurStam(data.stats.curStamina);
    setHp(data.stats.hitpoints);
    setCurHp(data.stats.curHitpoints);
  }) 
},[])
  async function updateScreen (){
    getProfile().then((data) => {
      setPlayerName(data.name);
      setPlayerLevel(data.stats.level);
      setPlayerExp(data.stats.experience)
      setPlayerNextLevel(
       Math.ceil(
           5000 * (data.stats.level * Math.sqrt(Math.pow(data.stats.level, 3)))
        )
      );
      setGoldInHand(data.gold);
      setStr(data.stats.strength);
      setDex(data.stats.dexterity);
      setInt(data.stats.intelligence);
      setStam(data.stats.stamina);
      setCurStam(data.stats.curStamina);
      setHp(data.stats.hitpoints);
      setCurHp(data.stats.curHitpoints);
  })}


  return (
    <>
      <h2>The Training Fields</h2>
      <p>Welcome to the training field, {playerName}. This is your chance to gain your experience and improve your skills, Gear up level up and let your training begin here -Welcome to a world where the pursuit of excellence is not just a goal but a way of gaming life. May your skills be sharp and victories legendary!</p>
      <p>{shopMessage}</p>

      <div className="experience">
      <p>
        Experience: {playerExp} / Next Level {playerNextLevel}
      </p>
      <button 
      onClick={() => {
        levelUp().then((data)  => {
          console.log("Level UP")
          console.log(data)
          if(data.status == "Success") {
            setShopMessage("Congratulations You Leveled Up!")
          } else if (data.status == "Failure") {
            setShopMessage ("You are not ready yet!")
          }

          
        })
      }
      }> LEVEL UP </button>

      <p>
        Gold: {goldInHand}
      </p>
    
      </div>

      <div className="statbox">
      <div className="statrow">
      <p>Strength: {str}</p>
      <button onClick={() => {buyStat('str').then((data) => {updateScreen()})}}>Buy Strength </button>
      <p>Cost of upgrade  {playerLevel * str * 50} Exp & {playerLevel * str * 500} gold</p>
      </div>
      <div className="statrow">
      <p>Dexterity: {dex}</p>
      <button onClick={() => {buyStat('dex').then((data) => {updateScreen()})}}>Buy Dexterity </button>
      <p>Cost of upgrade {playerLevel * dex * 50} Exp & {playerLevel * dex * 500} gold</p>
      </div>
      <div className="statrow">
      <p>Intelligence: {int}</p>
      <button onClick={() => {buyStat('int').then((data) => {updateScreen()})}}> Buy Inteligence</button>
      <p>Cost of upgrade {playerLevel * int * 50} Exp & {playerLevel * int * 500} gold</p>

      </div>
      
      </div>


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
