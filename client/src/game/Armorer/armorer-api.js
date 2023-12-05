let apiURL = "http://localhost:3000";
const list = async () => {
  try {
    let response = await fetch(apiURL + "/api/shops/armor", {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const buyArmor = async (item) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const response = await fetch(apiURL + "/api/shops/armor", {
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
  const data = await response.json();
  return data;
};

export { list, buyArmor };
