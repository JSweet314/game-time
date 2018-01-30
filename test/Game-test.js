const { expect } = require('chai');
const EnemyMissile = require('../lib/EnemyMissile.js');
const Base = require('../lib/Base.js');
const Building = require('../lib/Building.js');

const Game = require('../lib/Game.js');

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  it('should be an object', () => {
    expect(game).to.be.an('object');
  });

  it('should track the score and the level (wave)', () => {
    expect(game).to.have.a.property('score', 0);
    expect(game).to.have.a.property('wave', 1);
  });

  it('should start out with 6 cities and 3 bases', () => {
    expect(game).to.have.a.property('numberOfCities', 6);
    expect(game).to.have.a.property('numberOfBases', 3);
  });

  it('should be able to store its buildings in the appropriate arrays', () => {
    expect(game.cities).to.deep.equal([]);
    expect(game.bases).to.deep.equal([]);
    expect(game.buildings).to.deep.equal([]);
  });

  it('should instantiate the bases and cities it needs', () => {
    game.createCities();
    game.createBases();
    game.storeAllBuildings();

    expect(game.cities.length).to.equal(6);
    expect(game.bases.length).to.equal(3);
    expect(game.buildings.length).to.equal(9);

    expect(game.cities[0]).to.be.an.instanceOf(Building);
    expect(game.bases[0]).to.be.an.instanceOf(Base);
    expect(game.buildings[0]).to.be.an.instanceOf(Building);
  })

  it('should track the number of enemy missiles, starting with 10', () => {
    expect(game).to.have.a.property('numberOfEnemyMissiles', 10);
  });

  it('should be able to create enemy missiles with building targets', ()=> {
    expect(game.enemyMissiles).to.deep.equal([]);

    game.createCities().createBases().storeAllBuildings();
    game.createEnemyMissiles();

    expect(game.enemyMissiles.length).to.equal(game.numberOfEnemyMissiles);
  });

  it('should create enemy missiles randomly above the canvas', () => {
    let canvasWidth = 500;

    game.createCities().createBases().storeAllBuildings();
    game.createEnemyMissiles();

    expect(game).to.have.a.property('maxEnemyHeight', -500);

    expect(game.enemyMissiles[0].x).to.be.within(0, 500);
    expect(game.enemyMissiles[0].y).to.be.within(game.maxEnemyHeight, 0);
  });


})