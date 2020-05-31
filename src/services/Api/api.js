import moment from "moment";
class Api {
  settings = () => {
    return fetch(
      "https://starnavi-frontend-test-task.herokuapp.com/game-settings"
    );
  };
  winners = () => {
    return fetch("https://starnavi-frontend-test-task.herokuapp.com/winners");
  };
  winnersSend = (user) => {
    return fetch("https://starnavi-frontend-test-task.herokuapp.com/winners", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        winner: user,
        date: moment().format("HH:mm; D MMMM YYYY"),
      }),
    });
  };
}

export default Api;
