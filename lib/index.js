const Game = require('./Game.js');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let game = new Game ();
game.createEnemyMissiles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.enemyMissiles.forEach(enemyMissile => enemyMissile.draw(ctx));
  game.enemyMissiles.forEach(enemyMissile => {
    if(enemyMissile.y < canvas.height - enemyMissile.height) {
      enemyMissile.y += .5;
    }
  });
  requestAnimationFrame(animate);
}

animate();