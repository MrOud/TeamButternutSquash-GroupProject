import { useState, useEffect } from "react";
import { list } from "./weapons-api.js";
import "../commonStyles/common.css";

export default function WeaponSmith({ setCurrentPage }) {
  const [weaponList, setWeaponList] = useState([]);

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

  async function buyWeapon(item) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const response = await fetch("http://localhost:3000/api/shops/weapon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + sessionStorage.getItem("jwt").replaceAll('"', ""),
      },
      body: JSON.stringify({
        purchase: item,
        user: user._id,
      }),
    });
    const data = await response;
    console.log(data);
  }

  return (
    <>
      <h2>The Weapon Smith</h2>
      <p>Here you can purchase weapons</p>
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
                      buyWeapon(weaponList[i]._id);
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
