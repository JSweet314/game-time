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
      let defenseMissile = new Missile(this.x + (this.width / 2),this.y, xTarget, yTarget); // changed to accomodate improved missile constructor **** KEEP ****

      this.defenseMissiles.push(defenseMissile);
      this.numberOfMissiles--;
    }
    return this;
  }
}