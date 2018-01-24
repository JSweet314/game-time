const Missile = require('./Missile.js');

class EnemyMissile extends Missile {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.baseTarget = Math.floor(Math.random() *3);
  }

  selectTarget() {
    this.baseTarget++
    return this.baseTarget % 3;
  }
}

module.exports = EnemyMissile;