const Building = require('./Building.js');
const Missile = require('./DefenseMissile.js')

class Base extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.numberOfMissiles = 10;
  }
}

module.exports = Base;