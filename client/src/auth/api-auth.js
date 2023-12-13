let apiURL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';

const signin = async (user) => {
  try {
    let response = await fetch(apiURL + "/auth/signin/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const signout = async () => {
  try {
    let response = await fetch(apiURL + "/auth/signout/", { method: "GET" });
    console.log(await response.json());
  } catch (err) {
    console.log(err);
  }
};
export { signin, signout };
