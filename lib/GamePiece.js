class GamePiece {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.orange = true;
  }

  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  drawCircle(ctx) {
    ctx.fillStyle = 'chartreuse'
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI, true);
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

  clear(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height)
  }

}

module.exports = GamePiece;