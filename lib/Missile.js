const GamePiece = require('./GamePiece.js');

class Missile extends GamePiece {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.startX = x;
    this.startY = y;
    this.endX = 0;
    this.endY = 0;
    this.dx = 0;
    this.dy = 0;
    this.percentXY = 0;
    this.step = 1;
    this.radius = 5;
    this.maxRadius = 20
  }

  drawCircle(ctx) {
    ctx.fillStyle = 'chartreuse'
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();
  }

  getTargetCoords(coordArray) {
    // this.endX = coordArray[0];
    // this.endY = coordArray[1];
    [this.endX, this.endY] = coordArray

    return this;
  }

  distance(startX, startY, endX, endY) {
    this.dx = endX - startX;
    this.dy = endY - startY;

    return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }

  moveTowardsTarget() {
    let distance = this.distance(this.startX, this.startY, this.endX, this.endY);

    if (this.percentXY <= 1) {
      this.percentXY += this.step / distance;
      this.x = this.startX + this.dx * this.percentXY;
      this.y = this.startY + this.dy * this.percentXY;
    }
  }
}

module.exports = Missile;
