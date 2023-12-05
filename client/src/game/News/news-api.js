let apiURL = "" // http://localhost:3000";
const list = async () => {
  try {
    let response = await fetch(apiURL + "/api/news", {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { list };
