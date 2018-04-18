const GamePiece = require('./GamePiece.js');

module.exports = class Explosion extends GamePiece {
  constructor(x, y) {
    super(x, y);
    this.radius = 1;
    this.maxRadius = 25;
    this.increment = 0.25;
  }

  updateRadius() {
    this.radius += this.increment;
    if (this.radius >= this.maxRadius) {
      this.increment = -this.increment;
    }
  }

  drawExplosion(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.restore();
  }
}