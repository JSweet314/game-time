const Building = require('./Building.js');
const Missile = require('./Missile.js')

module.exports = class Base extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.numberOfMissiles = 10;
  }
}