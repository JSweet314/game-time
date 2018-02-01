const Missile = require('./Missile.js');

module.exports = class EnemyMissile extends Missile {
  constructor(x, y, xTarget, yTarget) {
    super(x, y, xTarget, yTarget);
    this.targetIndex = 0
    this.velocity = 0.5;
  }

  randomlySelectTarget(buildingsArray) {
    this.targetIndex = Math.floor(Math.random() * buildingsArray.length);
    let target = buildingsArray[this.targetIndex];

    [this.xTarget, this.yTarget] = [target.x + target.width / 2, target.y];
  }

  destroyBuilding(buildingsArray) {
    if (this.y >= this.yTarget) {
      buildingsArray.forEach((building, index, buildingsArray) => {
        if (building.x + building.width / 2 === this.xTarget) {
          building.numberOfMissiles = 0;
          buildingsArray.splice(index, 1);
        }
      });
    }
  }
}