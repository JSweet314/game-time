const Missile = require('./Missile.js');

module.exports = class EnemyMissile extends Missile {
  constructor(x, y, xTarget, yTarget) {
    super(x, y, xTarget, yTarget);
    this.targetIndex = 0
  }

  randomlySelectTarget(buildingArray) {
    this.targetIndex = Math.floor(Math.random() * buildingArray.length);
    let target = buildingArray[this.targetIndex];
    [this.xTarget, this.yTarget] = [target.x + target.width / 2, target.y];
  }

  destroyBuilding(buildings) {
    if (this.y >= this.yTarget) {
      // buildings[this.targetIndex].numberOfMissiles = 0;
      buildings.splice(this.targetIndex, 1);
    }
  }
}