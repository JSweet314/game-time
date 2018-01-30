require('./style.css')
const Game = require('./Game.js');
const gameUI = document.querySelector('.game-ui')
const startScreen = document.querySelector('.start-screen');
const startBtn = document.querySelector('.start-screen__btn');
const pauseScreen = document.querySelector('.pause-screen');
const pauseBtn = document.querySelector('.pause-screen__btn');
const endgameScreen = document.querySelector('.endgame-screen');
const endgameBtn = document.querySelector('.endgame-screen__btn');
const wave = document.querySelector('.wave');
const score = document.querySelector('.game-stats__score');
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let game = new Game ();

game.createCities().createBases().createEnemyMissiles();

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  gameUI.style.display = "none";
  canvas.addEventListener('click', clickMissile);
  animate();
});

pauseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('game paused ' + game.cities)
  gameUI.style.display = 'none';
  game.wave++;
  game.increaseEnemyMissiles();
  game.resetBases();
  game.createBases().createEnemyMissiles();
  game.paused = false;
  canvas.addEventListener('click', clickMissile);
  animate();
});

endgameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  gameUI.style.display = 'none';
  game.resetGameState();
  game.createCities().createBases().createEnemyMissiles();
  canvas.addEventListener('click', clickMissile);
  animate();
});

function clickMissile(e) {
  let firingBase = game.buildings.find(base =>
    base.x === game.determineClosestFiringBase(e.offsetX, e.offsetY));

  if (firingBase) {


    firingBase.createDefenseMissile(e.offsetX, e.offsetY);
    game.firingBases.push(firingBase);
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

// clear
// update
// draw

  game.updateEnemyMissiles(ctx);

  game.updateReturnFire(ctx);

  game.updateBuildings(ctx);

  game.updateExplosions(ctx);

  game.updateScore(score);

  game.determineGameState(gameUI, startScreen, pauseScreen, endgameScreen, wave);

  if (!game.paused || !game.gameOver) {
    requestAnimationFrame(animate);
  } else {
    canvas.removeEventListener('click', clickMissile, false);
  }
}
