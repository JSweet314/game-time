const EnemyMissile = require('./EnemyMissile.js');
const Base = require('./Base.js');
const City = require('./City.js');

module.exports = class Game {
  constructor() {
    this.score = 0;
    this.wave = 1;
    this.numberOfCities = 6;
    this.numberOfBases = 3;
    this.numberOfEnemyMissiles = 10;
    this.enemyMissiles = [];
    this.bases = [];
    this.firingBases = [];
    this.cities = [];
    this.buildings = [];
    this.explosions = [];
    this.paused = false;
    this.gameOver = false;
  }

  createEnemyMissiles() {
    for (let i = 0; i < this.numberOfEnemyMissiles; i++) {
      let x = Math.random() * 500;
      let y = -Math.random() * 500;
      let enemyMissile = new EnemyMissile(x, y);

      enemyMissile.randomlySelectTarget(this.buildings);
      this.enemyMissiles.push(enemyMissile);
    }
  }

  createCities() {
    let city1 = new City(75, 475, 25, 25);
    let city2 = new City(125, 475, 25, 25);
    let city3 = new City(175, 475, 25, 25);
    let city4 = new City(300, 475, 25, 25);
    let city5 = new City(350, 475, 25, 25);
    let city6 = new City(400, 475, 25, 25);

    this.cities.push(city1, city2, city3, city4, city5,
      city6);
    return this;
  }

  createBases() {
    let leftBase = new Base(0, 450, 50, 50);
    let midBase = new Base(225, 450, 50, 50);
    let rightBase = new Base(450, 450, 50, 50);

    this.bases.push(leftBase, midBase, rightBase)
    this.buildings = [...this.bases, ...this.cities]
    return this;
  }

  determineClosestFiringBase(endX, endY) {
    let leftBase, midBase, rightBase;
    // endX <= 500 / 3 && leftBase.numberOfMissiles > 0 // left click, left base has missiles
    // endX <= 500 / 3 && midBase.numberOfMissiles > 0 // left click, mid base has missiles, left none
    // endX <= 500 / 3 && rightBase.numberOfMissiles > 0 // left click, right base has missiles, left and mid none

    // endX > 500 / 3 && endX < 1000 / 3 && midBase.numberOfMissiles > 0 // mid click, mid base has missiles
    // endX <= 250 && leftBase.numberOfMissiles > 0 // left-half click, left has missiles
    // endX > 250 && rightBase.numberOfMissiles > 0 // right-half click, right hase missiles

    // endX >= 1000 / 3 && rightBase.numberOfMissiles > 0 // right click, right has missiles
    // endX >= 1000 / 3 && midBase.numberOfMissiles > 0 // right click, mid has missiles
    // endX >= 1000 / 3 && leftBase.numberOfMissiles > 0 // right click, left has missiles


    [leftBase, midBase, rightBase] = this.bases;
    if (endY < 420) {
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
      && leftBase.numberOfMissiles === 0) {
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
      } else {
        return null;
      }
    }
  }

  updateReturnFire(ctx) {
    if (this.firingBases.length > 0) {
      this.firingBases.forEach(firingBase => {
        firingBase.defenseMissiles.forEach(
          (defenseMissile, index, defenseMissileArray) => {
            defenseMissile.moveTowardsTarget();
            defenseMissile.drawMissile(ctx);
            if (defenseMissile.y <= defenseMissile.yTarget) {
              defenseMissileArray.splice(index, 1);
              this.explosions.push(defenseMissile.triggerExplosion());
            }
          }
        );
      });
    }
  }

  updateBuildings(ctx) {
    this.buildings.forEach(building => building.draw(ctx));
  }

  updateEnemyMissiles(ctx) {
    this.enemyMissiles.forEach((enemyMissile, index) => {
      enemyMissile.moveTowardsTarget();
      if (enemyMissile.y >= enemyMissile.yTarget) {
        this.enemyMissiles.splice(index, 1);
        this.explosions.push(enemyMissile.triggerExplosion());
        enemyMissile.destroyBuilding(this.buildings);
      }
      enemyMissile.drawMissile(ctx);
    });
  }

  updateExplosions(ctx) {
    this.explosions.forEach((explosion, i, explosionsArray) => {
      this.enemyMissiles.forEach((enemyMissile, j, enemyMissileArray) => {
        let dx = enemyMissile.x - explosion.x;
        let dy = enemyMissile.y - explosion.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < explosion.radius) {
          enemyMissileArray.splice(j, 1);
          this.score += 10;
          this.explosions.push(enemyMissile.triggerExplosion());
        }
      });
      explosion.drawExplosion(ctx);
      explosion.updateRadius();
      if (explosion.radius < 1) {
        explosionsArray.splice(i, 1);
      }
    });
  }

  determineGameState(gameUI, startScreen, pauseScreen, endgameScreen, wave) {
    if (this.enemyMissiles.length === 0 && this.cities.length === 0) {
      this.gameOver = true;
      gameUI.style.display = 'flex';
      startScreen.style.display = 'none';
      pauseScreen.style.display = 'none';
      endgameScreen.style.display = 'block';

    } else if (this.enemyMissiles.length === 0) {
      this.paused = true;
      wave.innerText = this.wave;
      gameUI.style.display = 'flex';
      startScreen.style.display = 'none';
      endgameScreen.style.display = 'none';
      pauseScreen.style.display = 'block';
    }
  }

  updateScore(score) {
    score.innerText = this.score;
  }

  increaseEnemyMissiles() {
    this.numberOfEnemyMissiles += 5;
  }

  resetBases() {
    this.bases = [];
  }

  resetGameState() {
    this.numberOfEnemyMissiles = 10;
    this.buildings = [];
    this.cities = [];
    this.bases = [];
    this.wave = 1;
  }
}
