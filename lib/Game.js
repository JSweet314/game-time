const Missile = require('./Missile.js')
const EnemyMissile = require('./EnemyMissile.js');
const Base = require('./Base.js');
const Building = require('./Building.js');

module.exports = class Game {
  constructor(launchAudio, explosionAudio) {
    this.bases = []
    this.buildings = [];
    this.enemyMissiles = [];
    this.explosionAudio = explosionAudio;
    this.explosions = [];
    this.gameOver = false;
    this.launchAudio = launchAudio;
    this.maxEnemyHeight = -500;
    this.numberOfBases = 3;
    this.numberOfCities = 6;
    this.numberOfEnemyMissiles = 10;
    this.paused = false;
    this.returnFire = [];
    this.score = 0;
    this.wave = 1;
  }

  createBuildings() {
    this.bases.push(
      new Base(0, 450, 50, 50),
      new Base(225, 450, 50, 50),
      new Base(450, 450, 50, 50)
    );

    this.buildings.push(
      new Building(75, 475, 25, 25),
      new Building(125, 475, 25, 25),
      new Building(175, 475, 25, 25),
      new Building(300, 475, 25, 25),
      new Building(350, 475, 25, 25),
      new Building(400, 475, 25, 25),
      ...this.bases
    );
  }

  drawBuildings(ctx) {
    this.buildings.forEach(building => building.drawBuilding(ctx));
  }

  createEnemyMissiles() {
    for (let i = 0; i < this.numberOfEnemyMissiles; i++) {
      let x = Math.random() * 500;
      let y = Math.random() * this.maxEnemyHeight;

      this.enemyMissiles[i] = new EnemyMissile(x, y);
      this.enemyMissiles[i].randomlySelectTarget(this.buildings);
    }
  }

  updateEnemyMissiles() {
    this.enemyMissiles.forEach((enemyMissile, index, enemyMissilesArray) => {
      enemyMissile.moveTowardsTarget();
      if (enemyMissile.y >= enemyMissile.yTarget) {
        enemyMissile.destroyBuilding(this.buildings);
        enemyMissilesArray.splice(index, 1);
        this.explosionAudio.play();
        this.explosions.push(enemyMissile.triggerExplosion());
      }
    });
  }

  drawEnemyMissiles(ctx) {
    this.enemyMissiles.forEach(enemyMissile => {
      enemyMissile.drawMissile(ctx);
    });
  }

  increaseEnemyMissiles() {
    this.numberOfEnemyMissiles += 5;
    this.maxEnemyHeight -= 100;
  }

  updateExplosions() {
    this.explosions.forEach((explosion, index, explosionsArray)  => {
      explosion.updateRadius();
      if (explosion.radius < 1) {
        explosionsArray.splice(index, 1);
      }
    });
  }

  detectCollisions() {
    this.explosions.forEach((explosion, i, explosionsArray) => {
      this.enemyMissiles.forEach((enemyMissile, j, enemyMissileArray) => {
        let dx = enemyMissile.x - explosion.x;
        let dy = enemyMissile.y - explosion.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < explosion.radius) {
          enemyMissileArray.splice(j, 1);
          this.explosionAudio.play();
          explosionsArray.push(enemyMissile.triggerExplosion());
          if (enemyMissile.y <= 420) {
            this.score += 10;
          }
        }
      });
    });
  }

  drawExplosions(ctx) {
    this.explosions.forEach(explosion  => {
      explosion.drawExplosion(ctx);
    });
  }

  createReturnFire(xTarget, yTarget) {
    let firingBase = this.buildings.find(base =>
      base === this.determineClosestFiringBase(xTarget, yTarget));

    if (firingBase) {
      let x = firingBase.x + firingBase.width / 2;
      let y = firingBase.y;

      firingBase.numberOfMissiles--;
      this.launchAudio.play();
      this.returnFire.push(new Missile(x, y, xTarget, yTarget));
    }
  }

  updateUserMissiles() {
    this.returnFire.forEach((missile, index, returnFireArray) => {
      missile.moveTowardsTarget();
      if (missile.y <= missile.yTarget) {
        this.explosionAudio.play();
        this.explosions.push(missile.triggerExplosion());
        returnFireArray.splice(index, 1);
      }
    });
  }

  drawUserMissiles(ctx) {
    this.returnFire.forEach(missile => {
      missile.drawMissile(ctx)
    });
  }

  determineClosestFiringBase(xTarget, yTarget) {
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = this.bases;

    let leftAmmo = leftBase.numberOfMissiles;
    let midAmmo = midBase.numberOfMissiles;
    let rightAmmo = rightBase.numberOfMissiles;

    if (yTarget < 420) {
      if (leftAmmo === 0 && midAmmo === 0 && rightAmmo === 0) {
        return null;
      } else if (xTarget <= 500 / 3 && leftAmmo > 0) {
        return leftBase;
      } else if (xTarget <= 500 / 3 && midAmmo > 0) {
        return midBase;
      } else if (xTarget <= 500 / 3) {
        return rightBase;
      } else if (xTarget >= 1000 / 3 && rightAmmo > 0) {
        return rightBase;
      } else if (xTarget >= 1000 / 3 && midAmmo > 0) {
        return midBase;
      } else if (xTarget >= 1000 / 3) {
        return leftBase;
      } else if (xTarget > 500 / 3 && xTarget < 1000 / 3 && midAmmo > 0) {
        return midBase;
      } else if (xTarget <= 250 && leftAmmo > 0) {
        return leftBase;
      } else if (xTarget <= 250) {
        return rightBase;
      } else if (xTarget > 250 && rightAmmo > 0) {
        return rightBase;
      } else if (xTarget > 250) {
        return leftBase;
      } else {
        return null;
      }
    }
  }

  determineGameState(gameUI, startScreen, pauseScreen, endgameScreen, wave) {
    let onlyBasesRemain = this.buildings.every(building => {
      return building instanceof Base;
    });

    if (onlyBasesRemain) {
      this.enemyMissiles.forEach(missile => {
        missile.velocity = 20;
      });
    }
    this.enemyHasDestroyedBases()
    if (
      this.enemyMissiles.length === 0
      && (onlyBasesRemain || this.buildings.length === 0)
      && this.explosions.length === 0
    ) {
      this.gameOver = true;
      this.displayEndGameScreen(gameUI, endgameScreen);
    } else if (
      this.enemyMissiles.length === 0
      && this.explosions.length === 0
    ) {
      this.paused = true;
      this.wave++;
      this.increaseEnemyMissiles();
      this.prepareBasesForNextWave();
      this.createEnemyMissiles();
      this.displayPauseScreen(gameUI, pauseScreen, wave);
    }
  }

  enemyHasDestroyedBases() {
    let noBasesRemaining = this.buildings.every(buildings => {
      return !(buildings instanceof Base);
    })

    if (noBasesRemaining) {
      this.enemyMissiles.forEach(missile => {
        missile.velocity = 20;
      });
    }
  }

  displayPauseScreen(gameUI, pauseScreen, wave) {
    wave.innerText = this.wave - 1;
    gameUI.style.display = 'flex';
    pauseScreen.style.display = 'block';
  }

  displayEndGameScreen(gameUI, endgameScreen) {
    gameUI.style.display = 'flex';
    endgameScreen.style.display = 'block';
  }

  prepareBasesForNextWave() {
    this.bases.forEach(base => {
      let baseInBuildingsArray = this.buildings.includes(base);

      base.numberOfMissiles = 10;
      if (!baseInBuildingsArray) {
        this.buildings.push(base);
      }
    });
  }

  updateScore(score) {
    score.innerText = this.score;
  }

  resetGameState() {
    this.numberOfEnemyMissiles = 10;
    this.maxEnemyHeight = -500;
    this.buildings = [];
    this.bases = [];
    this.wave = 1;
    this.score = 0;
    this.gameOver = false;
  }
}