import { gameMode } from "./home.js";

let lastUsed = "O";
let isGameRunning = true;
const statusText = document.getElementById("statusText");
if (gameMode === "friend") {
  statusText.textContent = `Player X's turn!`;
} else {
  statusText.textContent = "You called me dumb, I'll prove you wrong!";
}
const container = document.getElementById("container");

document.getElementById("back-to-home").addEventListener("click", () => {
  reset();
  document.getElementById("controls").style.display = "block";
  document.getElementById("game-container").style.display = "none";
});

document.getElementById("reset").addEventListener("click", () => reset());

let map = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function reset() {
  isGameRunning = true;
  lastUsed = "O";
  if (gameMode === "friend") {
    statusText.textContent = `Player X's turn!`;
  } else {
    statusText.textContent = `You called me dumb, I'll prove you wrong!`;
    statusText.style.removeProperty("color");
  }
  map = ["", "", "", "", "", "", "", "", ""];
  container.childNodes.forEach((item) => {
    item.innerHTML = "";
    item.style && item.style.removeProperty("background-color");
  });
}

function botMove() {
  const statusMap = [];
  for (let i = 0; i < map.length; i++) {
    if (map[i] === "") statusMap.push(i);
  }
  const index = Math.floor(Math.random() * statusMap.length);
  console.log("statusMap", statusMap);
  console.log("index", index);

  return statusMap[index];
}

function paintCell(id) {
  const div = document.getElementById(id);
  lastUsed = lastUsed === "O" ? "X" : "O";
  div.innerHTML = lastUsed;
  map[+id] = lastUsed;
  statusText.textContent = `Player ${lastUsed === "O" ? "X" : "O"}'s turn!`;
}

function addXOrO(id) {
  if (map[+id] !== "" || !id) return;
  if (gameMode === "friend") {
    paintCell(id);
  } else {
    paintCell(id);
    checkForWins();
    checkForTies();
    if (isGameRunning) {
      const selectedCellId = botMove();
      paintCell(selectedCellId);
      statusText.textContent = `Your turn!`;
    }
  }
}

function showWinningCells(first, second, third, color) {
  document.getElementById(first).style.backgroundColor = color;
  document.getElementById(second).style.backgroundColor = color;
  document.getElementById(third).style.backgroundColor = color;
}

function checkForWins() {
  for (let i = 0; i < winningConditions.length; i++) {
    let comb = winningConditions[i];
    let first = map[+comb[0]];
    let second = map[+comb[1]];
    let third = map[+comb[2]];
    if (
      first === second &&
      second === third &&
      first !== "" &&
      second !== "" &&
      third !== ""
    ) {
      if (gameMode === "friend") {
        statusText.textContent = `Player ${lastUsed} Wins!`;
      } else {
        if (lastUsed === "X") {
          statusText.textContent = "You were right, you win!";
          statusText.style.color = "green";
          showWinningCells(+comb[0], +comb[1], +comb[2], "green");
        } else {
          statusText.textContent = "Told ya, I am smart!";
          statusText.style.color = "red";
          showWinningCells(+comb[0], +comb[1], +comb[2], "red");
        }
      }
      isGameRunning = false;
    }
  }
}

function checkForTies() {
  if (map.indexOf("") === -1) {
    if (gameMode === "friend") {
      statusText.textContent = `Game tied!`;
    } else {
      statusText.textContent = `Game tied, are you a bot as well?`;
      statusText.style.color = "brown";
    }
    isGameRunning = false;
    return;
  }
}

container.addEventListener("click", (ev) => {
  const id = ev.target.id;
  isGameRunning && addXOrO(id);
  checkForWins();
  isGameRunning && checkForTies();
});
