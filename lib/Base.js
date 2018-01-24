const Building = require('./Building.js');
const Missile = require('./DefenseMissile.js')

class Base extends Building {
  constructor() {
    super();
    this.numberOfMissiles = 10;
  }
}

module.exports = Base;