const apiURL = "";

const startJourney = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  try {
    let response = await fetch(apiURL + "/api/gate/start", {
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

const getNextPhase = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  try {
    let response = await fetch(apiURL + "/api/gate/nextPhase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + sessionStorage.getItem("jwt").replaceAll('"', ""),
      },
      body: JSON.stringify({
        user: user._id,
        phase: "reroll",
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const startFight = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  try {
    let response = await fetch(apiURL + "/api/gate/startFight", {
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

const abandonFight = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  try {
    let response = await fetch(apiURL + "/api/gate/nextPhase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + sessionStorage.getItem("jwt").replaceAll('"', ""),
      },
      body: JSON.stringify({
        user: user._id,
        phase: "abandon",
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const attack = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  try {
    let response = await fetch(apiURL + "/api/gate/attack", {
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

export { startJourney, getNextPhase, startFight, abandonFight, attack };
