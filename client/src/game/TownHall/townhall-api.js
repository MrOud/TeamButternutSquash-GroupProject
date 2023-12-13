const apiURL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';

const getBuildingList = async () => {
  try {
    let response = await fetch(apiURL + "/api/townhall", {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const makeDonation = async (building, amount) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await fetch(apiURL + "/api/townhall", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + sessionStorage.getItem("jwt").replaceAll('"', ""),
    },
    body: JSON.stringify({
      building: building,
      amount: amount,
      user: user._id,
    }),
  });
  const data = await response.json();
  return data;
};

export { getBuildingList, makeDonation };
