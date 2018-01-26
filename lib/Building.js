const GamePiece = require('./GamePiece.js');

module.exports = class Building extends GamePiece {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.exists = true;
  }

  getCoords() {
    return [this.x + (this.width / 2), this.y];
  }
}