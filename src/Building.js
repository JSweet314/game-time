const GamePiece = require('./GamePiece.js');

module.exports = class Building extends GamePiece {
  constructor(x, y, width, height) {
    super(x, y);
    this.width = width;
    this.height = height;
  }

  drawBuilding(ctx, src) {
    let buildingImage = new Image();
    buildingImage.src = src;
    buildingImage.onload = () => {
      ctx.drawImage(buildingImage, this.x - 5, this.y - 10, this.width + 10, this.height + 10);
    }
    ctx.drawImage(buildingImage, this.x - 5, this.y - 10, this.width + 10, this.height + 10);
  }
}