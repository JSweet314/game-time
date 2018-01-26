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
    this.percentX = 0;
    this.percentY = 0;
    this.step = 1;
    this.radius = 2;
  }

  drawCircle(ctx) {
    ctx.fillStyle = 'chartreuse'
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = 'red';
    if (this.orange) {
      ctx.fillStyle = 'white';
      this.orange = false;
    } else {
      ctx.fillStyle = 'red';
      this.orange = true;
    }
    ctx.fill();
    ctx.restore();
  }

  getTargetCoords(coordArray) {
    this.endX = coordArray[0];
    this.endY = coordArray[1];

    return this;
  }

  moveTowardsTarget() {
    this.dx = this.endX - this.startX;
    this.dy = this.endY - this.startY;

    let distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

    if (this.percentX < 1) {
      this.percentX += this.step / distance;
      this.percentY += this.step / distance;
      this.x = this.startX + this.dx * this.percentX;
      this.y = this.startY + this.dy * this.percentY;
    }
  }
}

module.exports = Missile;
