const Missile = require('./Missile.js');

module.exports = class DefenseMissile extends Missile {
  constructor(x, y) {
    super(x, y);
    this.step = 5;
  }

  detectCollision(enemyMissiles) {
    enemyMissiles.forEach(enemyMissile => {
      let distance = this.distance(this.x, this.y, enemyMissile.x,
        enemyMissile.y);

      if (distance <= this.radius + enemyMissile.radius) {
        enemyMissile.destroyed = true;
      }
    });
  }
}