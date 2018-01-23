class City extends GamePieces {
  constructor (x, y, width, height) {
    super(x, y, width, height);
    this.exists = true;
  }
}

module.exports = City;