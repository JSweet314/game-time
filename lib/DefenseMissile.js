const Missile = require('./Missile.js');

class DefenseMissile extends Missile {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  detectCollision(enemyMissile) {
    if (this.percentX > .999){
      while (this.radius < 20) {
        this.radius += .000001;
      }
      let distance = this.distance(enemyMissile.x, enemyMissile.y);

      if (distance - enemyMissile.radius < this.radius) {
        // console.log(this + ' collided with ' + enemyMissile)
        enemyMissile.live = false
      }
    }
  }
}


module.exports = DefenseMissile;