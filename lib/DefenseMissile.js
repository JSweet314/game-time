const Missile = require('./Missile.js');

module.exports = class DefenseMissile extends Missile {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.step = 10;
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