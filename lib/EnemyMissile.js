const Missile = require('./Missile.js');

module.exports = class EnemyMissile extends Missile {
  constructor(x, y) {
    super(x, y);
    this.baseTarget = Math.floor(Math.random() * 9);
  }

  selectTarget(buildingArrayLength) {
    this.baseTarget++
    return this.baseTarget % buildingArrayLength;
  }

  destroyBuilding(buildings, cities) {
    buildings.forEach((building, i, buildingArray) => {
      if (this.endX - (building.width / 2) === building.x) {
        building.numberOfMissiles = 0;
        buildingArray.splice(i, 1);
        cities.forEach((city, j, cityArray) => {
          if (building.x === city.x) {
            cityArray.splice(j, 1);
          }
        });
      }
    });
  }
}