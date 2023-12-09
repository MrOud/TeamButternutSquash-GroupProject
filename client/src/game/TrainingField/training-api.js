const apiURL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';

const levelUp = async () => {
    console.log ("click level up")

    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
      let response = await fetch(apiURL + "/api/training/levelup", {
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
} 



export{levelUp}