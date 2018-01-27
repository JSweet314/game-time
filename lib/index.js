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
      if (enemyMissile.percentXY >= 1) {
        game.explosions.push(enemyMissile.explode());
        enemyMissile.destroyBuilding(game.buildings);
        enemyMissile.percentXY = 0;
      }
      enemyMissile.drawMissile(ctx);
    }
  });

  if (game.firingBases.length > 0) {
    game.firingBases.forEach(firingBase => {
      firingBase.defenseMissiles.forEach(defenseMissile => {
        if (defenseMissile.destroyed === false) {
          defenseMissile.moveTowardsTarget();
          defenseMissile.drawMissile(ctx);
          if (defenseMissile.percentXY >= 1) {
            defenseMissile.detectCollision(game.enemyMissiles)
            game.explosions.push(defenseMissile.explode());
            defenseMissile.percentXY = 0;
          }
        }
      });
    });
  }

  game.buildings.forEach(building => {
    if (!building.destroyed) {
      building.draw(ctx)
    }
  });

  game.explosions.forEach(explosion => {
    if (explosion.radius < explosion.maxRadius) {
      ctx.beginPath();
      ctx.arc(explosion.x, explosion.y, explosion.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = 'red';
      ctx.closePath();
      ctx.fill();
      explosion.radius += 0.25;
    }
  });

  requestAnimationFrame(animate);
}

animate();
