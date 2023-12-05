const apiURL = "http://localhost:3000";

const getPlayerGold = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await fetch(apiURL + "/api/player/getGold", {
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
  const data = await response.json();
  return data;
};

const getProfile = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  try {
    let response = await fetch(apiURL + "/api/player/getProfile", {
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

const checkForJourney = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  try {
    let response = await fetch(apiURL + "/api/gate/journey", {
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

export { getPlayerGold, getProfile, checkForJourney };
