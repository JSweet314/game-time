const Missile = require('./Missile.js');

module.exports = class EnemyMissile extends Missile {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.baseTarget = Math.floor(Math.random() * 9);
    this.step = 10;
  }

  selectTarget() {
    this.baseTarget++
    return this.baseTarget % 9;
  }

  destroyBuilding(buildings) {
    if (this.percentXY >= 1) {
      buildings.forEach(building => {
        if (this.endX - (building.width / 2) === building.x) {
          building.destroyed = true;
          this.destroyed = true;
        }
      });
    }
  }
}