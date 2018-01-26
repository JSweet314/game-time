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
  game.enemyMissiles.forEach(enemyMissile => {
    if (enemyMissile.destroyed === false) {
      enemyMissile.moveTowardsTarget();
      enemyMissile.destroyBuilding(game.buildings);
      enemyMissile.drawMissile(ctx);
    }
  });

  if (game.firingBases.length > 0) {
    game.firingBases.forEach(firingBase => {
      firingBase.defenseMissiles.forEach(defenseMissile => {
        defenseMissile.moveTowardsTarget();
        defenseMissile.drawMissile(ctx);
        if (defenseMissile.percentXY >= 1) {
          defenseMissile.detectCollision(game.enemyMissiles)
        }
      });
    });
  }

  game.buildings.forEach(building => {
    if (!building.destroyed) {
      building.draw(ctx)
    }
  });

  requestAnimationFrame(animate);
}

animate();
