const apiURL = "http://localhost:3000";
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

export { getProfile };
