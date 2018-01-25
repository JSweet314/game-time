const Building = require('./Building.js');
const DefenseMissile = require('./DefenseMissile.js')

class Base extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.numberOfMissiles = 10;
    this.defenseMissiles = [];
  }

  createDefenseMissile(endX, endY) {
    if (this.numberOfMissiles) {
      let defenseMissile = new DefenseMissile(this.x + (this.width / 2),
        this.y, 10, 10);

      defenseMissile.endX = endX;
      defenseMissile.endY = endY;
      this.defenseMissiles.push(defenseMissile);
      this.numberOfMissiles--;
    }
    return this;
  }
}

module.exports = Base;