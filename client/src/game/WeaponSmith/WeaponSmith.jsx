import { useState, useEffect } from "react";
import { list, buyWeapon } from "./weapons-api.js";
import "../commonStyles/common.css";

export default function WeaponSmith({ setCurrentPage }) {
  const [weaponList, setWeaponList] = useState([]);
  const [shopMessage, setShopMessage] = useState("Welcome to my shop");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setWeaponList(data.weaponList);
      }
    });
  }, []);

  async function makePurchase(wep) {
    const result = await buyWeapon(wep);
    if (result.message == "PurchaseDown") {
      setShopMessage("That would leave you worse off, friend.");
    } else if (result.message == "PurchaseDenied") {
      setShopMessage(
        "I'm not running a charity! Come back when you have the gold."
      );
    } else {
      setShopMessage("Thank you for the purchase!");
    }
  }

  return (
    <>
      <h2>The Weapon Smith</h2>
      <p>{shopMessage}</p>
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>Price:</td>
            <td>Attack Increase:</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {weaponList.map((wep, i) => {
            return (
              <tr key={i}>
                <td key={"a" + i}>{weaponList[i].name}</td>
                <td key={"b" + i}>{weaponList[i].price}</td>
                <td key={"c" + i}>{weaponList[i].dmgMod}</td>
                <td key={"d" + i}>
                  <p
                    onClick={() => {
                      makePurchase(weaponList[i]._id);
                    }}
                  >
                    Buy!
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
