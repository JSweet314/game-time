const Game = require('./Game.js');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let game = new Game ();

game.createEnemyMissiles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.enemyMissiles.forEach(enemyMissile => {
    enemyMissile.moveTowardsTarget();
    enemyMissile.draw(ctx)
  });

  requestAnimationFrame(animate);
}

animate();
