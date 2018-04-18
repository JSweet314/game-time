const { expect } = require('chai');
const Missile = require('../src/Missile.js');
const EnemyMissile = require('../src/EnemyMissile.js');
const Base = require('../src/Base.js');
const Explosion = require('../src/Explosion.js')
const Building = require('../src/Building.js');
const Game = require('../src/Game.js');

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
    expect(game.bases).to.deep.equal([]);
    expect(game.buildings).to.deep.equal([]);
  });

  it('should instantiate the bases and cities it needs', () => {
    game.createBuildings();

    expect(game.buildings.length).to.equal(9);
    expect(game.bases.length).to.equal(3);

    expect(game.buildings[0]).to.be.an.instanceOf(Building);
    expect(game.buildings[game.buildings.length -1]).to.be.an.instanceOf(Base);
    expect(game.buildings[game.buildings.length -4]).to.not.be.an.instanceOf(Base);
  })

  it('should track the number of enemy missiles, starting with 10', () => {
    expect(game).to.have.a.property('numberOfEnemyMissiles', 10);
  });

  it('should be able to create enemy missiles with building targets', ()=> {
    expect(game.enemyMissiles).to.deep.equal([]);

    game.createBuildings();
    game.createEnemyMissiles();

    expect(game.enemyMissiles.length).to.equal(game.numberOfEnemyMissiles);
  });

  it('should create enemy missiles randomly above the canvas', () => {
    let canvasWidth = 500;

    game.createBuildings();
    game.createEnemyMissiles();

    expect(game).to.have.a.property('maxEnemyHeight', -500);

    expect(game.enemyMissiles[0].x).to.be.within(0, canvasWidth);
    expect(game.enemyMissiles[0].y).to.be.within(game.maxEnemyHeight, 0);
  });

  it('should have enemy missiles move towards their target', () => {
    game.createBuildings();
    game.createEnemyMissiles();

    game.enemyMissiles.forEach(enemyMissile => {
      expect(enemyMissile.x).to.equal(enemyMissile.xStart);
    });

    game.updateEnemyMissiles();

    game.enemyMissiles.forEach(enemyMissile => {
      expect(enemyMissile.x).to.not.equal(enemyMissile.xStart);
    });
  });

  it('should be able to draw its enemy missiles', () => {
    expect(game).to.have.a.property('drawEnemyMissiles');
  });

  it('should be able to increase the number of enemy missiles between waves', () => {
    expect(game.numberOfEnemyMissiles).to.equal(10);

    game.increaseEnemyMissiles();

    expect(game.numberOfEnemyMissiles).to.equal(15);
    expect(game.maxEnemyHeight).to.equal(-600);
  });

  it('should detect collisions between explosions and enemy fire', () => {
    game.explosions.push(new Explosion(250, 250));
    game.enemyMissiles.push(new EnemyMissile(250, 250, 300, 300));

    expect(game.explosions.length).to.equal(1);
    expect(game.enemyMissiles.length).to.equal(1);

    game.detectCollisions();

    expect(game.enemyMissiles.length).to.equal(0);
    expect(game.explosions.length).to.equal(2);
    expect(game.score).to.equal(10);
  });

  it('should not increase the score if the explosion is not safely above the buildings', () => {
    game.explosions.push(new Explosion(250, 450));
    game.enemyMissiles.push(new EnemyMissile(250, 450));

    expect(game.score).to.equal(0);

    game.detectCollisions();

    expect(game.score).to.equal(0);

    game.enemyMissiles.push(new EnemyMissile(250, 420, 300, 300))
    game.explosions[0].y = 420;

    game.detectCollisions();

    expect(game.score).to.equal(10);
  });

  it('should be able to reset itself', () => {
    game.createBuildings();
    game.createEnemyMissiles();
    game.updateEnemyMissiles();
    game.updateExplosions();
    game.wave = 2;
    game.numberOfEnemyMissiles = 15;

    expect(game.buildings.length).to.equal(9);
    expect(game.wave).to.equal(2);
    expect(game.numberOfEnemyMissiles).to.equal(15);

    game.resetGameState();

    expect(game.buildings.length).to.equal(0);
    expect(game.wave).to.equal(1);
    expect(game.numberOfEnemyMissiles).to.equal(10);
  });

  it('should not allow a user to fire if they are out of missiles', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    leftBase.numberOfMissiles = 0;
    midBase.numberOfMissiles = 0;
    rightBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(25, 400);

    expect(result).to.equal(null);
  });

  it('should be able to fire from the closest base to the point of click', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    result = game.determineClosestFiringBase(25, 400);

    expect(result).to.equal(leftBase);

    result = game.determineClosestFiringBase(170, 400);

    expect(result).to.equal(midBase);

    result = game.determineClosestFiringBase(400, 400);

    expect(result).to.equal(rightBase);
  });

  it('should fire from the middle base on a left third click if the left base is out of ammo and the middle is not.', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    leftBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(25, 400);

    expect(result).to.equal(midBase);
  });

  it('should fire from the right base on a left third click if the left and middle base are out of ammo.', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    leftBase.numberOfMissiles = 0;
    midBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(25, 400);

    expect(result).to.equal(rightBase);
  });

  it('should fire from the middle base on a right third click if the right base is out of ammo.', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    rightBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(400, 400);

    expect(result).to.equal(midBase);
  });

  it('should fire from the left base on a right third click if the right and middle base are out of ammo.', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    rightBase.numberOfMissiles = 0;
    midBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(400, 400);

    expect(result).to.equal(leftBase);
  });

  it('should fire from the right base if the right half is clicked and the middle base is out of ammo', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    midBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(251, 400);

    expect(result).to.equal(rightBase);
  });

  it('should fire from the left base if the left half is clicked and the middle base is out of ammo', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    midBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(250, 400);

    expect(result).to.equal(leftBase);
  });

  it('should fire from the left base if the right half is clicked and the middle and right base are out of ammo', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    midBase.numberOfMissiles = 0;
    rightBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(251, 400);

    expect(result).to.equal(leftBase);
  });

  it('should fire from the right base if the left half is clicked and the middle and left base are out of ammo', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    midBase.numberOfMissiles = 0;
    leftBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(250, 400);

    expect(result).to.equal(rightBase);
  });

  it('should be able to fire a missile from the appropriate base when the user clicks', () => {
    game.createBuildings();
    game.createReturnFire(50, 50);

    expect(game.returnFire.length).to.equal(1);
    expect(game.returnFire[0]).to.be.an.instanceOf(Missile);
  });

  it('should be able to update the position of user fired missiles', () => {
    game.createBuildings();
    game.createReturnFire(50, 50);
    let testMissile = game.returnFire[0];

    expect(testMissile.x).to.equal(testMissile.xStart);

    game.updateUserMissiles();

    expect(testMissile.x).to.not.equal(testMissile.xStart);
  });

  it('should be able to have user missiles draw themselves', () => {
    expect(game).to.have.a.property('drawUserMissiles');
  });

  it('should end the game after a wave if only bases remain', () => {
    game.createBuildings();
    game.createEnemyMissiles();
    game.determineGameState();
    expect(game.gameOver).to.equal(false);

    game.buildings = [];
    game.enemyMissiles = [];
    game.buildings.splice(0, 6);
    game.determineGameState();

    expect(game.gameOver).to.be.true;
  });

  it('should pause between waves if cities remain', () => {
    game.createBuildings();
    game.createEnemyMissiles();
    game.determineGameState();
    expect(game.paused).to.equal(false);

    game.enemyMissiles = [];
    game.determineGameState();

    expect(game.paused).to.be.true;
  });

  it('should move to the next wave if not game over', () => {
    game.createBuildings();
    game.createEnemyMissiles();
    game.determineGameState();
    expect(game.wave).to.equal(1);

    game.enemyMissiles = [];
    game.determineGameState();

    expect(game.wave).to.equal(2);
  });

  it('should increase enemy missiles with each wave', () => {
    game.createBuildings();
    game.createEnemyMissiles();
    game.determineGameState();
    expect(game.numberOfEnemyMissiles).to.equal(10);

    game.enemyMissiles = [];
    game.determineGameState();

    expect(game.numberOfEnemyMissiles).to.equal(15);
  });

  it('should replenish all bases if moving to the next wave', () => {
    game.createBuildings();
    game.createEnemyMissiles();

    game.buildings.splice(6, 3);
    game.determineGameState();

    expect(game.buildings.length).to.equal(6);

    game.enemyMissiles = [];
    game.determineGameState();

    game.bases.forEach(base => {
      expect(base.numberOfMissiles).to.equal(10);
    });
    expect(game.buildings[6].numberOfMissiles).to.equal(10);
    expect(game.buildings[7].numberOfMissiles).to.equal(10);
    expect(game.buildings[8].numberOfMissiles).to.equal(10);
    expect(game.buildings.length).to.equal(9);
    expect(game.wave).to.equal(2);
  });

  it('should create new enemy missiles for the next wave', () => {
    game.createBuildings();
    game.createEnemyMissiles();

    game.enemyMissiles = [];
    game.determineGameState();

    expect(game.enemyMissiles.length).to.equal(15);
  });

  it('should end the game if all cities are destroyed', () => {
    game.createBuildings();
    game.createEnemyMissiles();

    game.enemyMissiles = [];
    game.buildings.splice(0, 6);
    game.determineGameState();

    expect(game.gameOver).to.be.true;
  });
});