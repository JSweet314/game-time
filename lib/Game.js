class Game {
  constructor () {
    this.score = 0;
    this.numberOfCities = 6;
    this.numberOfBases = 3;
    this.numberOfEnemyMissles = 10;
    this.isGameOver = this.numberOfCities === 0;
  }
}