const Missile = require('./Missile.js');

class EnemyMissile extends Missile {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.destroyed = false;
    this.baseTarget = Math.floor(Math.random() * 9);
  }

  selectTarget() {
    this.baseTarget++
    return this.baseTarget % 9;
  }
}

module.exports = EnemyMissile;