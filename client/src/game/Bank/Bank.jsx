import { useEffect, useState, useRef } from "react";
import "../common/common.css";
import { getBalance, makeDeposit, makeWithdrawl } from "./bank-api";
import "./Bank.css";

export default function Bank({ setCurrentPage }) {
  const [balance, setBalance] = useState(0);
  const [goldOnHand, setGoldOnHand] = useState(0);
  const [buildingDesc, setBuildingDesc] = useState(
    "The inside of the bank is modest. A guard waits beside a large stone door which probably guards a small fortune. A teller sits at the only table in the small room; A ledger, quill, and ink well between you and the teller."
  );
  const [shopMessage, setShopMessage] = useState(
    'The teller looks up and smiles "Welcome, how can I help you?"'
  );

  useEffect(() => {
    getBalance().then((data) => {
      setBalance(data.goldAccount);
      setGoldOnHand(data.goldOnHand);
    });
  }, []);

  const transactInput = useRef();

  return (
    <>
      <div className="bankBackground">
        <div className="textCircle">
          <h2>The Bank</h2>
          <p>{buildingDesc}</p>
          <p>{shopMessage}</p>
          <p>You have:</p>
          <ul>
            <li>{goldOnHand} in hand</li>
            <li>{balance} in your account</li>
          </ul>

          <input
            className="textInput"
            type="text"
            ref={transactInput}
            defaultValue="0"
          />
          <button
            className="button"
            onClick={() => {
              if (transactInput.current.value > 0)
                makeDeposit(transactInput.current.value).then((data) => {
                  setBalance(data.goldAccount);
                  setGoldOnHand(data.goldOnHand);
                  setShopMessage(data.shopMessage);
                });
              if (transactInput.current.value < 0) {
                setShopMessage("The teller seems quite unamused");
              }
              transactInput.current.value = 0;
            }}
          >
            Deposit
          </button>
          <button
            className="button"
            onClick={() => {
              if (transactInput.current.value > 0)
                makeWithdrawl(transactInput.current.value).then((data) => {
                  setBalance(data.goldAccount);
                  setGoldOnHand(data.goldOnHand);
                  setShopMessage(data.shopMessage);
                });
              if (transactInput.current.value < 0) {
                setShopMessage("The teller seems quite unamused");
              }
              transactInput.current.value = 0;
            }}
          >
            Withdraw
          </button>
        </div>
        <p className="backToTownLink" onClick={() => setCurrentPage("Town")}>
          Back to Town
        </p>
      </div>
    </>
  );
}
