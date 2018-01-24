const EnemyMissile = require('./EnemyMissile.js');
const DefenseMissile = require('./DefenseMissile.js');
const Base = require('./Base.js');
const City = require('./City.js');

class Game {
  constructor () {
    this.score = 0;
    this.numberOfCities = 6;
    this.numberOfBases = 3;
    this.numberOfEnemyMissiles = 10;
    this.isGameOver = this.numberOfCities === 0;
  }

  createEnemyMissiles(ctx) {
    for (let i = 0; i < this.numberOfEnemyMissiles; i++) {
      let x = Math.random()*500;
      let y = Math.random()*100;
      let enemyMissile = new EnemyMissile (x, y, 10, 10);
      enemyMissile.draw(ctx);
    }
  }

}

module.exports = Game;