const EnemyMissile = require('./EnemyMissile.js');
const Base = require('./Base.js');
const City = require('./City.js');

class Game {
  constructor() {
    this.score = 0;
    this.numberOfCities = 6;
    this.numberOfBases = 3;
    this.numberOfEnemyMissiles = 10;
    this.enemyMissiles = [];
    this.isGameOver = this.numberOfCities === 0;
    this.buildings = [];
  }

  createEnemyMissiles() {
    for (let i = 0; i < this.numberOfEnemyMissiles; i++) {
      let x = Math.random() * 500;
      let y = -Math.random() * 500;
      let enemyMissile = new EnemyMissile (x, y, 10, 10);
      let buildingTarget = enemyMissile.selectTarget();

      enemyMissile.getTargetCoords(this.buildings[buildingTarget].getCoords());
      this.enemyMissiles.push(enemyMissile);
    }
  }

  createBuildings() {
    let base1 = new Base(0, 450, 50, 50);
    let base2 = new Base(225, 450, 50, 50);
    let base3 = new Base(450, 450, 50, 50);

    this.buildings.push(base1);
    this.buildings.push(base2);
    this.buildings.push(base3);
    return this;
  }
}

module.exports = Game;