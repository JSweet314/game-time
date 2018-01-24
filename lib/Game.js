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
    let building1 = new City(75, 475, 25, 25);
    let building2 = new City(125, 475, 25, 25);
    let building3 = new City(175, 475, 25, 25);
    let building4 = new City(300, 475, 25, 25);
    let building5 = new City(350, 475, 25, 25);
    let building6 = new City(400, 475, 25, 25);
    let building7 = new Base(0, 450, 50, 50);
    let building8 = new Base(225, 450, 50, 50);
    let building9 = new Base(450, 450, 50, 50);

    this.buildings.push(building1, building2, building3, building4, building5, building6, building7, building8, building9);

    return this;
  }
}

module.exports = Game;