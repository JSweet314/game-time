const GamePiece = require('./GamePiece.js');

module.exports = class Explosion extends GamePiece {
  constructor(x, y) {
    super(x, y);
    this.radius = 1;
    this.maxRadius = 25;
    this.increment = 0.5;
  }

  incrementRadius() {
    this.radius += this.increment;
  }
}