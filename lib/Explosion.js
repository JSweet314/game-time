const GamePiece = require('./GamePiece.js');

module.exports = class Explosion extends GamePiece {
  constructor(x, y) {
    super(x, y);
    this.radius = 1;
    this.maxRadius = 25;
  }

  // detectEnemyMissile(enemyMissiles) {
  //   enemyMissiles.forEach(enemyMissile => {
  //     let distance = enemyMissile.distance(this.x, this.y, enemyMissile.x, enemyMissile.y)
  //     if (distance < this.radius) {
  //       let chainExplosion = enemyMissile.explode();

  //       return chainExplosion;
  //     } 
  //   });
  //   return null;
  // }

}