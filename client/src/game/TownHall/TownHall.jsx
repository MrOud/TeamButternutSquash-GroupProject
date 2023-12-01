import { useEffect, useState, useRef } from "react";
import "../common/common.css";
import { getPlayerGold } from "../common/common-api.js";
import { getBuildingList, makeDonation } from "./townhall-api.js";

export default function TownHall({ setCurrentPage }) {
  const [wepsmithLevel, setWepsmithLevel] = useState(0);
  const [wepsmithDonation, setWepsmithDonation] = useState(0);
  const [wepsmithNextLevel, setWepsmithNextLevel] = useState(0);

  const [armorerLevel, setArmorerLevel] = useState(0);
  const [armorerDonation, setArmorerDonation] = useState(0);
  const [armorerNextLevel, setArmorerNextLevel] = useState(0);

  const [trainingLevel, setTrainingLevel] = useState(0);
  const [trainingDonation, setTrainingDonation] = useState(0);
  const [trainingNextLevel, setTrainingNextLevel] = useState(0);

  const [goldInHand, setGoldInHand] = useState(0);
  const [shopMessage, setShopMessage] = useState(
    'The records keeper looks up at you, "How can I help you?"'
  );

  const buildingSelect = useRef();
  const donationAmount = useRef();

  function validDonation() {
    let canProceed = true;
    if (
      buildingSelect.current.value == "weaponShop" &&
      wepsmithLevel.value >= 8
    ) {
      canProceed = false;
      setShopMessage(
        'The record keeper beams proudly at the communities achievement, "The Weapon Smith\'s is currently at its maximum level"'
      );
    }

    if (
      buildingSelect.current.value == "armorShop" &&
      armorerLevel.value >= 8
    ) {
      canProceed = false;
      setShopMessage(
        'The record keeper beams proudly at the communities achievement, "The Armorer\'s is currently at its maximum level"'
      );
    }

    if (
      buildingSelect.current.value == "training" &&
      trainingLevel.value >= 8
    ) {
      canProceed = false;
      setShopMessage(
        'The record keeper beams proudly at the communities achievement, "The Training Fields are currently at the maximum level"'
      );
    }

    if (donationAmount.current.value <= 0) {
      canProceed = false;
      if (donationAmount.current.value == 0) {
        setShopMessage(
          'The record keeper seems confused, "Well you have to donate something"'
        );
      } else {
        setShopMessage(
          'The record keeper scowls at your attempt to game the system, "You\'re far from funny, I assure you"'
        );
      }
    }

    if (donationAmount.current.value > 100000) {
      canProceed = false;
      setShopMessage(
        'The record keeper seems overwhelmed, "Oh my, that is... quite generous.... however I can only accept donations up to 100,000 gold at a time"'
      );
    }
    return canProceed;
  }

  function updateBuildings(data) {
    setWepsmithLevel(data.weaponLevel);
    setWepsmithDonation(data.weaponDonation);
    setWepsmithNextLevel(data.weaponNextLevel);

    setArmorerLevel(data.armorLevel);
    setArmorerDonation(data.armorDonation);
    setArmorerNextLevel(data.armorNextLevel);

    setTrainingLevel(data.trainingLevel);
    setTrainingDonation(data.trainingDonation);
    setTrainingNextLevel(data.trainingNextLevel);
  }

  useEffect(() => {
    getBuildingList().then((data) => {
      updateBuildings(data);
    });
    getPlayerGold().then((data) => {
      setGoldInHand(data.gold);
    });
  }, []);

  return (
    <>
      <h2>Town Hall</h2>
      <p>
        The Town Hall bustles with activity as city officials work away
        diligently to improve the city. A record keeper sits at the desk waiting
        to assist the public
      </p>
      <p>{shopMessage}</p>
      <p>
        Weapon Smith Level: {wepsmithLevel} Donations: {wepsmithDonation} /{" "}
        {wepsmithNextLevel}
      </p>
      <p>
        Armorer Level: {armorerLevel} Donations: {armorerDonation} /{" "}
        {armorerNextLevel}
      </p>
      <p>
        Training Fileds Level: {trainingLevel} Donations: {trainingDonation} /{" "}
        {trainingNextLevel}
      </p>
      <p>Gold in Hand: {goldInHand}</p>

      <input type="text" ref={donationAmount} defaultValue={0}></input>
      <select ref={buildingSelect}>
        <option value={"weaponShop"}>The Weapon Smith&lsquo;s</option>
        <option value={"armorShop"}>The Armor&lsquo;s</option>
        <option value={"training"}>The Training Fields</option>
      </select>
      <button
        onClick={() => {
          if (validDonation()) {
            makeDonation(
              buildingSelect.current.value,
              donationAmount.current.value
            ).then((data) => {
              getBuildingList().then((data) => {
                updateBuildings(data);
              });
              setGoldInHand(data.gold);
              setShopMessage(
                'The record keeper smiles at you, "Thank you for your donation"'
              );
            });
          }
          donationAmount.current.value = 0;
        }}
      >
        Make Donation
      </button>
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
