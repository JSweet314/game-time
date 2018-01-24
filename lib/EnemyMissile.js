const Missile = require('./Missile.js');

class EnemyMissile extends Missile {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.target = Math.floor(Math.random()*8)+1;
  }
}

module.exports = EnemyMissile;