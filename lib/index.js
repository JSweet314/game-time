require('./style.css')
const Game = require('./Game.js');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let game = new Game ();
let firingBase;

game.createBuildings().createEnemyMissiles();

canvas.addEventListener('click', (e) => {
  firingBase = game.bases.find(base =>
    base.x === game.determineClosestFiringBase(e.offsetX, e.offsetY));
  if (firingBase) {
    firingBase.createDefenseMissile(e.offsetX, e.offsetY);
  }
  game.firingBases.push(firingBase);
});

function animate() {
  game.enemyMissiles.forEach(enemyMissile => {
    enemyMissile.moveTowardsTarget();
    enemyMissile.drawCircle(ctx);
  });
  if (game.firingBases.length > 0) {
    game.firingBases.forEach(firingBase => {
      if (firingBase) {
        firingBase.defenseMissiles.forEach(defenseMissile => {
          defenseMissile.moveTowardsTarget();
          defenseMissile.drawCircle(ctx);
          defenseMissile.detectCollision();
        });
      }
    });
  }
  game.buildings.forEach(building => building.draw(ctx));

  requestAnimationFrame(animate);
}

animate();
