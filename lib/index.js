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
const score = document.querySelector('.game-stats__score');
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let game = new Game();

game.createBuildings();
game.drawBuildings(ctx);

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
  game.resetGameState();
  game.createBuildings();
  endgameScreen.style.display = 'none';
  startScreen.style.display = 'block';
  canvas.addEventListener('click', returnFire);
});

function returnFire(e) {
  let audioTest = game.bases.some(base => {
    return base.numberOfMissiles > 0;
  });

  if (audioTest && e.offsetY < 420) {
    let launchAudio = new Audio('lib/audio/missile-launch.wav');

    launchAudio.play();
  }
  game.createReturnFire(e.offsetX, e.offsetY);
}

function displayPauseScreen() {
  wave.innerText = game.wave - 1;
  gameUI.style.display = 'flex';
  pauseScreen.style.display = 'block';
}

function displayEndGameScreen() {
  gameUI.style.display = 'flex';
  endgameScreen.style.display = 'block';
}

function updateScore() {
  score.innerText = game.score;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.updateEnemyMissiles();

  game.updateUserMissiles()

  game.updateExplosions();

  game.detectCollisions();

  game.drawBuildings(ctx);

  game.drawEnemyMissiles(ctx);

  game.drawUserMissiles(ctx);

  game.drawExplosions(ctx);

  game.determineGameState();

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
