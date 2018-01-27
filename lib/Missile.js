const GamePiece = require('./GamePiece.js');
const Explosion = require('./Explosion.js');

module.exports = class Missile extends GamePiece {
  constructor(x, y) {
    super(x, y);
    this.startX = x;
    this.startY = y;
    this.endX = 0;
    this.endY = 0;
    this.dx = 0;
    this.dy = 0;
    this.percentXY = 0;
  }

  drawMissile(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.strokeStyle = 'white';
    ctx.lineTo(this.x, this.y)
    ctx.stroke();
    ctx.closePath();
  }

  getTargetCoords(coordArray) {
    [this.endX, this.endY] = coordArray

    return this;
  }

  distance(startX, startY, endX, endY) {
    this.dx = endX - startX;
    this.dy = endY - startY;

    return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }

  explode() {
    this.destroyed = true;
    let explosion = new Explosion(this.x, this.y);
    return explosion;
  }

  moveTowardsTarget() {
    let distance = this.distance(this.startX, this.startY, this.endX,
      this.endY);

    if (this.percentXY <= 1) {
      this.percentXY += this.step / distance;
      this.x = this.startX + this.dx * this.percentXY;
      this.y = this.startY + this.dy * this.percentXY;
    }
  }
}