const apiURL = "http://localhost:3000";

const getPlayerGold = async (building, amount) => {
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

export { getPlayerGold };
