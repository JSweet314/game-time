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
    this.firingBases = [];
    this.cities = [];
    this.buildings = [];
    this.explosions = [];
    this.paused = false;
  }

  createEnemyMissiles() {
    for (let i = 0; i < this.numberOfEnemyMissiles; i++) {
      let x = Math.random() * 500;
      let y = -Math.random() * 500;
      let enemyMissile = new EnemyMissile(x, y, 10, 10);
      let buildingTarget = enemyMissile.selectTarget();

      enemyMissile.getTargetCoords(
        this.buildings[buildingTarget].returnCoords()
      );
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

  determineClosestFiringBase(endX, endY) {
    let leftBase, midBase, rightBase;

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
  }

  drawReturnFire(ctx) {
    if (this.firingBases.length > 0) {
      this.firingBases.forEach(firingBase => {
        firingBase.defenseMissiles.forEach(defenseMissile => {
          if (defenseMissile.destroyed === false) {
            defenseMissile.moveTowardsTarget();
            defenseMissile.drawMissile(ctx);
            if (defenseMissile.percentXY >= 1) {
              defenseMissile.detectCollision(this.enemyMissiles)
              this.explosions.push(defenseMissile.explode());
              defenseMissile.percentXY = 0;
            }
          }
        });
      });
    }
  }

  drawBuildings(ctx) {
    this.buildings.forEach(building => {
      if (!building.destroyed) {
        building.draw(ctx)
      }
    });
  }

  drawEnemyMissiles(ctx) {
    this.enemyMissiles.forEach(enemyMissile => {
      if (enemyMissile.destroyed === false) {
        enemyMissile.moveTowardsTarget();
        if (enemyMissile.percentXY >= 1) {
          this.explosions.push(enemyMissile.explode());
          enemyMissile.destroyBuilding(this.buildings);
          enemyMissile.percentXY = 0;
        }
        enemyMissile.drawMissile(ctx);
      }
    });
  }

  drawExplosions(ctx) {
    this.explosions.forEach(explosion => {
      if (explosion.radius < explosion.maxRadius) {
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = 'red';
        ctx.closePath();
        ctx.fill();
        explosion.radius += 0.25;
      }
    });
  }
}
