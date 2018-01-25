const Missile = require('./Missile.js');

class DefenseMissile extends Missile {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.live = true;
  }
}

module.exports = DefenseMissile;