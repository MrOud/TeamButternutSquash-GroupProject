import { useState, useEffect } from "react";
import { list, buyArmor } from "./armorer-api.js";
import "../commonStyles/common.css";

export default function Armorer({ setCurrentPage }) {
  const [armorList, setArmorList] = useState([]);
  const [shopMessage, setShopMessage] = useState("Welcome to my shop");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setArmorList(data.armorList);
      }
    });
  }, []);

  async function makePurchase(wep) {
    const result = await buyArmor(wep);
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
      <h2>The Armored Armadillo</h2>
      <p>{shopMessage}</p>
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>Price:</td>
            <td>Defence Increase:</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {armorList.map((arm, i) => {
            return (
              <tr key={i}>
                <td key={"a" + i}>{armorList[i].name}</td>
                <td key={"b" + i}>{armorList[i].price}</td>
                <td key={"c" + i}>{armorList[i].dmgMod}</td>
                <td key={"d" + i}>
                  <p
                    onClick={() => {
                      makePurchase(armorList[i]._id);
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
