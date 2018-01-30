const EnemyMissile = require('./EnemyMissile.js');
const Base = require('./Base.js');
const Building = require('./Building.js');

module.exports = class Game {
  constructor() {
    this.score = 0;
    this.wave = 1;
    this.numberOfCities = 6;
    this.numberOfBases = 3;
    this.numberOfEnemyMissiles = 10;
    this.enemyMissiles = [];
    this.maxEnemyHeight = -500;
    this.bases = [];
    this.firingBases = [];
    this.cities = [];
    this.buildings = [];
    this.explosions = [];
    this.paused = false;
    this.gameOver = false;
  }

  createCities() {
    this.cities.push(
      new Building(75, 475, 25, 25),
      new Building(125, 475, 25, 25),
      new Building(175, 475, 25, 25),
      new Building(300, 475, 25, 25),
      new Building(350, 475, 25, 25),
      new Building(400, 475, 25, 25)
    );
    return this;
  }

  createBases() {
    this.bases.push(
      new Base(0, 450, 50, 50),
      new Base(225, 450, 50, 50),
      new Base(450, 450, 50, 50)
    );
    return this;
  }

  storeAllBuildings() {
    this.buildings = [...this.bases, ...this.cities]
  }

  createEnemyMissiles() {
    for (let i = 0; i < this.numberOfEnemyMissiles; i++) {
      let x = Math.random() * 500;
      let y = Math.random() * this.maxEnemyHeight;

      this.enemyMissiles[i] = new EnemyMissile(x, y);
      this.enemyMissiles[i].randomlySelectTarget(this.buildings);
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
    this.buildings.forEach(building => building.drawBuilding(ctx));
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

  determineClosestFiringBase(endX, endY) {
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = this.bases;
    // **************** POSSIBLE SCENARIOS **************** //
    // xTarget <= 500 / 3 && leftBase.numberOfMissiles > 0
    // left click, left base has missiles
    // xTarget <= 500 / 3 && midBase.numberOfMissiles > 0
    // left click, mid base has missiles, left none
    // xTarget <= 500 / 3 && rightBase.numberOfMissiles > 0
    // left click, right base has missiles, left and mid none

    // xTarget > 500 / 3 && xTarget < 1000 / 3 && midBase.numberOfMissiles > 0
    // mid click, mid base has missiles
    // xTarget <= 250 && leftBase.numberOfMissiles > 0
    // left-half click, left has missiles
    // xTarget > 250 && rightBase.numberOfMissiles > 0
    // right-half click, right hase missiles

    // xTarget >= 1000 / 3 && rightBase.numberOfMissiles > 0
    // right click, right has missiles
    // xTarget >= 1000 / 3 && midBase.numberOfMissiles > 0
    // right click, mid has missiles
    // xTarget >= 1000 / 3 && leftBase.numberOfMissiles > 0
    // right click, left has missiles

    // **************** FIRST PASS **************** //
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
      } else {
        return null;
      }
    }
    // **************** REFACTOR w/ SWITCH **************** //
    // if (yTarget < 420) {
    //   switch (xTarget) {
    //     case xTarget <= 500 / 3:
    //       if (leftBase.numberOfMissiles > 0) {
    //         return leftBase.x
    //       } else if (midBase.numberOfMissiles > 0) {
    //         return midBase.x;
    //       } else if (rightBase.numberOfMissiles > 0) {
    //         return rightBase.x;
    //       }
    //       break;
    //     case xTarget >= 1000 / 3:
    //       if (rightBase.numberOfMissiles > 0) {
    //         return rightBase.x;
    //       } else if (midBase.numberOfMissiles > 0) {
    //         return midBase.x;
    //       } else if (leftBase.numberOfMissiles > 0) {
    //         return leftBase.x;
    //       }
    //       break;
    //     case xTarget > 500 / 3 && xTarget < 1000 / 3:
    //       if (midBase.numberOfMissiles > 0) {
    //         return midBase.x;
    //       }
    //       switch(xTarget) {
    //         case xTarget <= 250:
    //           if (leftBase.numberOfMissiles > 0) {
    //             return leftBase.x;
    //           } else if (rightBase.numberOfMissiles > 0) {
    //             return rightBase.x
    //           }
    //           break;
    //         case xTarget > 250:
    //           if (rightBase.numberOfMissiles > 0) {
    //             return rightBase.x;
    //           } else if (leftBase.numberOfMissiles > 0) {
    //             return leftBase.x
    //           }
    //           break;
    //       }
    //       break;
    //       }
    //   }
    // }
  }
}