const Building = require('./Building.js');
const Missile = require('./Missile.js')

module.exports = class Base extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.numberOfMissiles = 10;
    this.defenseMissiles = [];
  }

  createDefenseMissile(xTarget, yTarget) {
    if (this.numberOfMissiles) {
      let x = this.x + this.width / 2;
      let y = this.y;
      let defenseMissile = new Missile(x, y, xTarget, yTarget);

      this.defenseMissiles.push(defenseMissile);
      this.numberOfMissiles--;
    }
    return this;
  }
}