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
let game = new Game ();

game.createBuildings();
game.drawBuildings(ctx);

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  startScreen.style.display = 'none';
  gameUI.style.display = 'none';
  game.createEnemyMissiles();
  canvas.addEventListener('click', returnFire);
  animate();
});

advanceBtn.addEventListener('click', (e) => {
  e.preventDefault();
  pauseScreen.style.display = 'none';
  gameUI.style.display = 'none';
  game.paused = false;
  canvas.addEventListener('click', returnFire);
  animate();
});

endgameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  game.resetGameState();
  game.createBuildings();
  endgameScreen.style.display = 'none';
  startScreen.style.display = 'block';
  canvas.addEventListener('click', returnFire);
});

function returnFire(e) {
  let firingBase = game.buildings.find(base =>
    base === game.determineClosestFiringBase(e.offsetX, e.offsetY));

  if (firingBase) {
    firingBase.createDefenseMissile(e.offsetX, e.offsetY);
    game.firingBases.push(firingBase);
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.updateEnemyMissiles();

  game.updateReturnFire(ctx);

  game.updateExplosions();

  game.detectCollisions();

  game.drawBuildings(ctx);

  game.drawEnemyMissiles(ctx);

  game.drawReturnFire(ctx);

  game.drawExplosions(ctx);

  game.updateScore(score);

  game.determineGameState(
    gameUI,
    startScreen,
    pauseScreen,
    endgameScreen,
    wave
  );

  if (!game.paused && !game.gameOver) {
    requestAnimationFrame(animate);
  } else {
    canvas.removeEventListener('click', returnFire);
  }
}
