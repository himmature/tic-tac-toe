export let gameMode = "";

function botBtnClickHandler() {
  document.getElementById("controls").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  gameMode = "bot";
}

function friendBtnClickHandler() {
  document.getElementById("controls").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  gameMode = "friend";
}

document
  .getElementById("bot-btn")
  .addEventListener("click", () => botBtnClickHandler());
document
  .getElementById("friend-btn")
  .addEventListener("click", () => friendBtnClickHandler());
