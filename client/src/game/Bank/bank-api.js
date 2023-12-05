const apiURL = "";

const getBalance = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  try {
    let response = await fetch(apiURL + "/api/bank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + sessionStorage.getItem("jwt").replaceAll('"', ""),
      },
      body: JSON.stringify({
        user: user._id,
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const makeDeposit = async (amount) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  try {
    let response = await fetch(apiURL + "/api/bank/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + sessionStorage.getItem("jwt").replaceAll('"', ""),
      },
      body: JSON.stringify({
        user: user._id,
        action: "deposit",
        amount: amount,
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const makeWithdrawl = async (amount) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  try {
    let response = await fetch(apiURL + "/api/bank/transact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + sessionStorage.getItem("jwt").replaceAll('"', ""),
      },
      body: JSON.stringify({
        user: user._id,
        action: "withdrawl",
        amount: amount,
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { getBalance, makeDeposit, makeWithdrawl };
