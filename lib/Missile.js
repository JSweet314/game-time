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
    this.live = false;
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

  distance(endX, endY) {
    this.dx = endX - this.startX;
    this.dy = endY - this.startY;

    return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }

  moveTowardsTarget() {
    let distance = this.distance(this.endX, this.endY);

    if (this.percentX < 1) {
      this.percentX += this.step / distance;
      this.percentY += this.step / distance;
      this.x = this.startX + this.dx * this.percentX;
      this.y = this.startY + this.dy * this.percentY;
    }
  }
}

module.exports = Missile;
