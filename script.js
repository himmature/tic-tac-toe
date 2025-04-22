let lastUsed = 'O';
let isGameRunning = true;
const statusText = document.getElementById('statusText');
statusText.textContent = `Player X's turn!`;
const container = document.getElementById('container');

document.getElementById('reset').addEventListener('click', () => {
  isGameRunning = true;
  lastUsed = 'O';
  statusText.textContent = `Player X's turn!`;
  map = ['', '', '', '', '', '', '', '', ''];
  container.childNodes.forEach((item) => {
    item.innerHTML = '';
    item.style && item.style.removeProperty('background-color');
  });
});

let map = ['', '', '', '', '', '', '', '', ''];
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

function addXOrO(id) {
  if (map[+id] !== '' || !id) return;
  const div = document.getElementById(id);
  lastUsed = lastUsed === 'O' ? 'X' : 'O';
  div.innerHTML = lastUsed;
  map[+id] = lastUsed;
  statusText.textContent = `Player ${lastUsed === 'O' ? 'X' : 'O'}'s turn!`;
}

function showWinningCells(first, second, third) {
  document.getElementById(first).style.backgroundColor = 'green';
  document.getElementById(second).style.backgroundColor = 'green';
  document.getElementById(third).style.backgroundColor = 'green';
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
      first !== '' &&
      second !== '' &&
      third !== ''
    ) {
      statusText.textContent = `Player ${lastUsed} Wins!`;
      statusText.style.color = 'green';
      showWinningCells(+comb[0], +comb[1], +comb[2]);
      isGameRunning = false;
    }
  }
}

function checkForTies() {
  if (map.indexOf('') === -1) {
    statusText.textContent = `Game tied!`;
    isGameRunning = false;
    return;
  }
}

container.addEventListener('click', (ev) => {
  const id = event.target.id;
  isGameRunning && addXOrO(id);
  checkForWins();
  isGameRunning && checkForTies();
});
