const Missile = require('./Missile.js');

class DefenseMissile extends Missile {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.live = true;
  }

  detectCollision(enemyMissile) {
    if (this.percentX > .999){
      while (this.radius < 20) {
        this.radius++;
      }
    }
  }
}


module.exports = DefenseMissile;