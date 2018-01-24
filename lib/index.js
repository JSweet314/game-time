require('./style.css')
const Game = require('./Game.js');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let game = new Game ();

game.createBuildings().createEnemyMissiles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.enemyMissiles.forEach(enemyMissile => {
    if (enemyMissile.y < 450 - enemyMissile.height) {
      enemyMissile.moveTowardsTarget();
    }
    enemyMissile.draw(ctx);
  });
  game.buildings.forEach(building => building.draw(ctx));

  requestAnimationFrame(animate);
}

animate();
