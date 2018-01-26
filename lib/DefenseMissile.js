const Missile = require('./Missile.js');

module.exports = class DefenseMissile extends Missile {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  detectCollision(enemyMissiles) {
    while (this.radius < 20) {
      this.radius += 1;
    }
    enemyMissiles.forEach(enemyMissile => {
      let distance = this.distance(this.x, this.y, enemyMissile.x,
        enemyMissile.y);

      if (distance <= this.radius + enemyMissile.radius) {
        enemyMissile.destroyed = true;
      }
    });
  }
}