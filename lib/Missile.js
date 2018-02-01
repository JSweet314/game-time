const GamePiece = require('./GamePiece.js');
const Explosion = require('./Explosion.js');

module.exports = class Missile extends GamePiece {
  constructor(x, y, xTarget, yTarget) {
    super(x, y);
    this.magnitude = 0;
    this.xStart = x;
    this.yStart = y;
    this.xTarget = xTarget;
    this.yTarget = yTarget;
    this.velocity = 2;
    this.xVector = 0;
    this.yVector = 0;
  }

  calculateDirectionalVectors() {
    this.xVector = this.xTarget - this.xStart;
    this.yVector = this.yTarget - this.yStart;
  }

  calculateMagnitude() {
    this.calculateDirectionalVectors();
    let xVectorSquared = this.xVector * this.xVector;
    let yVectorSquared = this.yVector * this.yVector;

    this.magnitude = Math.sqrt(xVectorSquared + yVectorSquared);
  }

  moveTowardsTarget() {
    this.calculateMagnitude();
    let xUnitVector = this.xVector / this.magnitude;
    let yUnitVector = this.yVector / this.magnitude;

    this.x += xUnitVector * this.velocity;
    this.y += yUnitVector * this.velocity;
  }

  triggerExplosion() {
    return new Explosion(this.x, this.y);
  }

  drawMissile(ctx) {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(this.xStart, this.yStart);
    ctx.lineTo(this.x, this.y)
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}