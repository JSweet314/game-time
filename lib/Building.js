const GamePiece = require('./GamePiece.js');

module.exports = class Building extends GamePiece {
  constructor(x, y, width, height) {
    super(x, y);
    this.width = width;
    this.height = height;
  }

  drawBuilding(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}