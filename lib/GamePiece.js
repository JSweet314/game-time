module.exports = class GamePiece {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.destroyed = false;
  }

  draw(ctx) {
    ctx.fillStyle = 'Chartreuse';
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  clear(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height)
  }
}
