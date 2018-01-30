const Building = require('./Building.js');

module.exports = class City extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    // this.numberOfMissiles = 0;
  }
}