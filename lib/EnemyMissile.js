const Missile = require('./Missile.js');

module.exports = class EnemyMissile extends Missile {
  constructor(x, y) {
    super(x, y);
    this.baseTarget = Math.floor(Math.random() * 9);
    this.step = 1;
  }

  selectTarget() {
    this.baseTarget++
    return this.baseTarget % 9;
  }

  destroyBuilding(buildings) {
    buildings.forEach((building, index) => {
      if (this.endX - (building.width / 2) === building.x) {
        buildings.splice(index, 1)
      }
    });
  }
}