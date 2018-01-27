require('./style.css')
const Game = require('./Game.js');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let game = new Game ();

game.createBuildings().createEnemyMissiles();

canvas.addEventListener('click', (e) => {
  let firingBase = game.bases.find(base =>
    base.x === game.determineClosestFiringBase(e.offsetX, e.offsetY));

  if (firingBase) {
    firingBase.createDefenseMissile(e.offsetX, e.offsetY);
    game.firingBases.push(firingBase);
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.updateEnemyMissiles(ctx);

  game.updateReturnFire(ctx);

  game.updateBuildings(ctx);

  game.updateExplosions(ctx);

  if (!game.paused) {
    requestAnimationFrame(animate);
  }
}

animate();
