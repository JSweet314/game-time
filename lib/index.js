require('./style.css')
const Game = require('./Game.js');
const gameUI = document.querySelector('.game-ui')
const startScreen = document.querySelector('.start-screen');
const startBtn = document.querySelector('.start-screen__btn');
const pauseScreen = document.querySelector('.pause-screen');
const advanceBtn = document.querySelector('.pause-screen__btn');
const endgameScreen = document.querySelector('.endgame-screen');
const endgameBtn = document.querySelector('.endgame-screen__btn');
const wave = document.querySelector('.wave');
const initials = document.querySelector('.initials');
const score = document.querySelector('.game-stats__score');
const highScoreText = document.querySelector('.high-score')
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let game = new Game(ctx);

window.onload = () => {
  let highScore = localStorage.getItem('high-score');

  highScoreText.innerText = highScore || 0;
  game.createBuildings();
  game.drawBuildings();
}

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  gameUI.style.display = 'none';
  game.createEnemyMissiles();
  canvas.addEventListener('click', returnFire);
  animate();
});

advanceBtn.addEventListener('click', () => {
  pauseScreen.style.display = 'none';
  gameUI.style.display = 'none';
  game.paused = false;
  canvas.addEventListener('click', returnFire);
  animate();
});

endgameBtn.addEventListener('click', () => {
  if (game.score > parseInt(highScoreText.innerText.slice(4))) {
    highScoreText.innerText = initials.value + ' ' + game.score;
    localStorage.setItem("high-score", highScoreText.innerText);
    initials.style.display = 'none';
  }
  game.resetGameState();
  game.createBuildings();
  game.drawBuildings();
  endgameScreen.style.display = 'none';
  startScreen.style.display = 'block';
  canvas.addEventListener('click', returnFire);
});

function returnFire(event) {
  let audioTest = game.bases.some(base => {
    return base.numberOfMissiles > 0;
  });

  if (audioTest && event.offsetY < 420) {
    let launchAudio = new Audio('lib/audio/missile-launch.wav');

    launchAudio.play();
  }
  game.createReturnFire(event.offsetX, event.offsetY);
}

function displayPauseScreen() {
  wave.innerText = game.wave - 1;
  gameUI.style.display = 'flex';
  pauseScreen.style.display = 'block';
}

function displayEndGameScreen() {
  gameUI.style.display = 'flex';
  endgameScreen.style.display = 'block';
  if (game.score > parseInt(highScoreText.innerText.slice(4))) {
    initials.style.display = 'block';
  }
}

function updateScore() {
  score.innerText = game.score;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.procedure();

  updateScore();

  if (game.paused) {
    displayPauseScreen();
  } else if (game.gameOver) {
    displayEndGameScreen();
  }

  if (!game.paused && !game.gameOver) {
    requestAnimationFrame(animate);
  } else {
    canvas.removeEventListener('click', returnFire);
  }
}
















































const skynet = document.querySelector('.skynet');
skynet.addEventListener('blur', () => {
  if (skynet.value === 'armageddon') {
    game.numberOfEnemyMissiles = 500;
    game.maxEnemyHeight = -1000;
    game.createEnemyMissiles();
  }

  console.log('initials')

  if (skynet.value === 'darpa') {
    game.buildings.forEach(building => {
      if (building.numberOfMissiles) {
        building.numberOfMissiles = 50;
        console.log(building.numberOfMissiles);
      };
    });
  }
  skynet.value = '';
});

window.addEventListener('keypress', () => {
  if (event.keyCode === 97 || event.keyCode === 100) {
    skynet.focus();
  }
});