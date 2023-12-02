const apiURL = "http://localhost:3000";

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

export { startJourney, getNextPhase, startFight };
