const EnemyMissile = require('./EnemyMissile.js');
const Base = require('./Base.js');
const City = require('./City.js');

module.exports = class Game {
  constructor() {
    this.score = 0;
    this.numberOfCities = 6;
    this.numberOfBases = 3;
    this.numberOfEnemyMissiles = 10;
    this.enemyMissiles = [];
    this.isGameOver = this.numberOfCities === 0;
    this.bases = [];
    this.firingBases = []
    this.cities = [];
    this.buildings = []
  }

  createEnemyMissiles() {
    for (let i = 0; i < this.numberOfEnemyMissiles; i++) {
      let x = Math.random() * 500;
      let y = -Math.random() * 500;
      let enemyMissile = new EnemyMissile(x, y, 10, 10);
      let buildingTarget = enemyMissile.selectTarget();
      let buildings = [...this.bases, ...this.cities];

      enemyMissile.getTargetCoords(buildings[buildingTarget].getCoords());
      this.enemyMissiles.push(enemyMissile);
    }
  }

  createBuildings() {
    let leftBase = new Base(0, 450, 50, 50);
    let city1 = new City(75, 475, 25, 25);
    let city2 = new City(125, 475, 25, 25);
    let city3 = new City(175, 475, 25, 25);
    let midBase = new Base(225, 450, 50, 50);
    let city4 = new City(300, 475, 25, 25);
    let city5 = new City(350, 475, 25, 25);
    let city6 = new City(400, 475, 25, 25);
    let rightBase = new Base(450, 450, 50, 50);

    this.cities.push(city1, city2, city3, city4, city5,
      city6);
    this.bases.push(leftBase, midBase, rightBase)
    this.buildings = [...this.bases, ...this.cities]
    return this;
  }

  determineClosestFiringBase(endX) {
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = this.bases;
    if (endX < 500 / 3
    && leftBase.numberOfMissiles > 0) {
      return leftBase.x;
    } else if (endX < 500 / 3
    && midBase.numberOfMissiles > 0) {
      return midBase.x;
    } else if (endX < 500 / 3
    && rightBase.numberOfMissiles > 0) {
      return rightBase.x;
    } else if (endX > 500 / 3
    && endX < 1000 / 3
    && midBase.numberOfMissiles > 0) {
      return midBase.x;
    } else if (endX < 250
    && midBase.numberOfMissiles === 0
    && leftBase.numberOfMissiles > 0) {
      return leftBase.x;
    } else if (endX < 250
    && midBase.numberOfMissiles === 0
    && rightBase.numberOfMissiles === 0) {
      return rightBase.x;
    } else if (endX > 250
    && midBase.numberOfMissiles === 0
    && rightBase.numberOfMissiles > 0) {
      return rightBase.x;
    } else if (endX > 250
    && midBase.numberOfMissiles === 0
    && leftBase.numberOfMissiles > 0) {
      return leftBase.x;
    } else if (endX > 1000 / 3
    && rightBase.numberOfMissiles > 0) {
      return rightBase.x;
    } else if (endX > 1000 / 3
    && rightBase.numberOfMissiles === 0
    && midBase.numberOfMissiles > 0) {
      return midBase.x;
    } else if (endX > 1000 / 3
    && rightBase.numberOfMissiles === 0
    && leftBase.numberOfMissiles > 0) {
      return leftBase.x;
    }
  }
}
