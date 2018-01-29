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
    this.velocity = 1;
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
    [this.endX, this.endY] = coordArray;
    return this;
  }

  distance(startX, startY, endX, endY) {
    this.dx = endX - startX;
    this.dy = endY - startY;

    return Math.sqrt((this.dx * this.dx) + (this.dy * this.dy));
  }

  explode() {
    return new Explosion(this.x, this.y);
  }

  moveTowardsTarget() {
    let distance = this.distance(this.startX, this.startY, this.endX,
    this.endY);

    this.x += (this.dx / distance) * this.velocity;
    this.y += (this.dy / distance) * this.velocity;
  }
}