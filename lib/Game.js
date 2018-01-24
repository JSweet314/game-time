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
    this.enemyMissiles = []; // once the animation function was added, it was clear to me again why we needed the array. Without it, our code was continuing to randomy generate coordinates for the enemyMissiles and gave them a strobe effect. See animate() in index.js for usage.
    this.isGameOver = this.numberOfCities === 0;
  }

  createEnemyMissiles() {
    for (let i = 0; i < this.numberOfEnemyMissiles; i++) {
      let x = Math.random()*500;
      let y = -Math.random()*500;
      let enemyMissile = new EnemyMissile (x, y, 10, 10);
      this.enemyMissiles.push(enemyMissile);
    }
  }

}

module.exports = Game;