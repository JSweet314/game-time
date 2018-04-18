const Missile = require('./Missile.js')
const EnemyMissile = require('./EnemyMissile.js');
const Base = require('./Base.js');
const Building = require('./Building.js');

module.exports = class Game {
  constructor(ctx) {
    this.bases = []
    this.buildings = [];
    this.ctx = ctx;
    this.enemyMissiles = [];
    this.explosions = [];
    this.gameOver = false;
    this.maxEnemyHeight = -500;
    this.numberOfBases = 3;
    this.numberOfCities = 6;
    this.numberOfEnemyMissiles = 10;
    this.paused = false;
    this.returnFire = [];
    this.score = 0;
    this.baseImage = "lib/images/Tower.png";
    this.cityImage = "lib/images/House.png"
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

  drawBuildings(src) {
    this.ctx.save();
    this.ctx.fillStyle = '#2C651E';
    this.ctx.fillRect(0, 470, 500, 30);
    this.ctx.restore();
      this.buildings.forEach(building => {
        if (building instanceof Base) {
          building.drawBuilding(this.ctx, this.baseImage);
        } else {
          building.drawBuilding(this.ctx, this.cityImage)
        }
      });
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
    this.enemyMissiles.forEach((enemyMissile, index) => {
      enemyMissile.moveTowardsTarget();
      if (enemyMissile.y >= enemyMissile.yTarget + 5) {
        enemyMissile.destroyBuilding(this.buildings);
        this.enemyMissiles.splice(index, 1);
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
    this.explosions.forEach((explosion, index)  => {
      explosion.updateRadius();
      if (explosion.radius < 1) {
        this.explosions.splice(index, 1);
      }
    });
  }

  detectCollisions() {
    this.explosions.forEach((explosion) => {
      this.seekAndDestroy(explosion);
    });
  }

  seekAndDestroy(explosion) {
    this.enemyMissiles.forEach((enemyMissile, index) => {
      let dx = enemyMissile.x - explosion.x;
      let dy = enemyMissile.y - explosion.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < explosion.radius) {
        this.enemyMissiles.splice(index, 1);
        this.explosions.push(enemyMissile.triggerExplosion());
        if (enemyMissile.y <= 420) {
          this.score += 10;
        }
      }
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
      this.returnFire.push(new Missile(x, y, xTarget, yTarget));
    }
  }

  updateUserMissiles() {
    this.returnFire.forEach((missile, index) => {
      missile.moveTowardsTarget();
      if (missile.y <= missile.yTarget) {
        this.explosions.push(missile.triggerExplosion());
        this.returnFire.splice(index, 1);
      }
    });
  }

  drawUserMissiles(ctx) {
    this.returnFire.forEach(missile => {
      missile.drawMissile(ctx);
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

  determineGameState() {
    let noBuildings = this.buildings.length === 0;
    let noEnemyMissiles = this.enemyMissiles.length === 0;
    let noExplosions = this.explosions.length === 0;
    let onlyBasesRemain = this.buildings.every(building => {
      return building instanceof Base;
    });
    let allCitiesDestroyed = onlyBasesRemain || noBuildings;

    if (onlyBasesRemain || allCitiesDestroyed) {
      this.enemyMissiles.forEach(missile => {
        missile.velocity = 20;
      });
    }
    this.enemyHasDestroyedBases()
    if (noEnemyMissiles && noExplosions && allCitiesDestroyed ) {
      this.gameOver = true;
    } else if (noEnemyMissiles && noExplosions) {
      this.paused = true;
      this.wave++;
      this.increaseEnemyMissiles();
      this.prepareBasesForNextWave();
      this.createEnemyMissiles();
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

  prepareBasesForNextWave() {
    this.bases.forEach(base => {
      let baseInBuildingsArray = this.buildings.includes(base);

      base.numberOfMissiles = 10;
      if (!baseInBuildingsArray) {
        this.buildings.push(base);
      }
    });
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

  procedure() {
    this.updateEnemyMissiles();

    this.updateUserMissiles()

    this.updateExplosions();

    this.detectCollisions();

    this.drawBuildings();

    this.drawEnemyMissiles(this.ctx);

    this.drawUserMissiles(this.ctx);

    this.drawExplosions(this.ctx);

    this.determineGameState();
  }
}