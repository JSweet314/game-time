const { assert, expect } = require('chai');
const Game = require('../lib/Game.js');
const GamePiece = require('../lib/GamePiece.js');


describe('GamePiece', () => {
  let gamePiece;

  beforeEach(() => {
    gamePiece = new GamePiece(10, 10, 10, 10);
  });

  it('should be an object', () => {
    expect(gamePiece).to.be.an('object');
  });

  it('should have an x and y coordinate', () => {
    expect
  });
});

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  it('should be a class object', () => {
    expect(game).to.be.a('object');
  });

  it('should have a score, bases, cities, & track No. of enemy missiles', () => {
    expect(game.score).to.equal(0);
    expect(game.numberOfCities).to.equal(6);
    expect(game.numberOfBases).to.equal(3);
    expect(game.numberOfEnemyMissiles).to.equal(10);
  });

  it('should be able to store enemy missiles, bases, cites, buildings', () => {
    expect(game.enemyMissiles).to.be.an('array');
    expect(game.cities).to.be.an('array');
    expect(game.bases).to.be.an('array');
  });

  it('should be able to create starting buildings', () => {
    expect(game.buildings.length).to.equal(0);
    expect(game.cities.length).to.equal(0);
    expect(game.bases.length).to.equal(0);

    game.createBuildings();

    expect(game.buildings.length).to.equal(9);
    expect(game.cities.length).to.equal(6);
    expect(game.bases.length).to.equal(3);
  });

  it('should be able to create enemy missiles with ', () => {
    game.createBuildings().createEnemyMissiles();
    expect(game.enemyMissiles.length).to.equal(game.numberOfEnemyMissiles);
  });
})