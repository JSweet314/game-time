const Missile = require('./Missile.js');

module.exports = class DefenseMissile extends Missile {
  constructor(x, y) {
    super(x, y);
    this.step = 2;
  }
}