import { useEffect, useState } from "react";
import "../commonStyles/common.css";
import { getBuildingList, makeDonation } from "./townhall-api.js";

export default function TownHall({ setCurrentPage }) {
  const [blacksmithLevel, setBlacksmithLevel] = useState(0);
  const [blacksmithDonation, setBlacksmithDonation] = useState(0);

  const [armorerLevel, setArmorerLevel] = useState(0);
  const [armorerDonation, setArmorerDonation] = useState(0);

  const [trainingLevel, setTrainingLevel] = useState(0);
  const [trainingDonation, setTrainingDonation] = useState(0);

  const [goldInHand, setGoldInHand] = useState(0);

  useEffect(() => {}, []);
  getBuildingList().then((data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].name == "The Weapon Smith's") {
        setBlacksmithLevel(data[i].level);
        setBlacksmithDonation(data[i].donations);
      } else if (data[i].name == "The Armorer's") {
        setArmorerLevel(data[i].level);
        setArmorerDonation(data[i].donations);
      } else if (data[i].name == "The Training Fields") {
        setTrainingLevel(data[i].level);
        setTrainingDonation(data[i].donations);
      }
    }
  });

  return (
    <>
      <h2>Town Hall</h2>
      <p>Here you can donate to improve building levels</p>
      <p>
        BlackSmith Level: {blacksmithLevel} Donations: {blacksmithDonation}
      </p>
      <p>
        Armorer Level: {armorerLevel} Donations: {armorerDonation}
      </p>
      <p>
        Training Fileds Level: {trainingLevel} Donations: {trainingDonation}
      </p>
      <p>Gold in Hand: {goldInHand}</p>
      <button
        onClick={() => {
          makeDonation("weapon", "700").then((data) => {
            setGoldInHand(data.gold);
          });
        }}
      >
        Test Donation
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
