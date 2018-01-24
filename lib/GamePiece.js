class GamePiece {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  clear(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height)
  }

}

module.exports = GamePiece;