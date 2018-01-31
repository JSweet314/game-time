const { expect } = require('chai');
const EnemyMissile = require('../lib/EnemyMissile.js');
const Base = require('../lib/Base.js');
const Explosion = require('../lib/Explosion.js')
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

  it('should have missiles move towards their target', () => {
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

  it('should no longer have enemy missiles that have reached their target', () => {
    game.createBuildings();
    game.createEnemyMissiles();
    let testMissile = game.enemyMissiles[0];

    expect(game.enemyMissiles.length).to.equal(10);

    testMissile.y = testMissile.yTarget;
    game.updateEnemyMissiles();

    expect(game.enemyMissiles.length).to.equal(9);
  });

  it('should lose a building if an enemy missile reaches its target', () => {
    game.createBuildings();
    game.createEnemyMissiles();
    let testMissile = game.enemyMissiles[0];

    expect(game.buildings.length).to.equal(9);

    testMissile.y = testMissile.yTarget;
    game.updateEnemyMissiles();

    expect(game.buildings.length).to.equal(8);
  });

  it('should have a new explosion when an enemy missile reaches its target', () => {
    game.createBuildings();
    game.createEnemyMissiles();
    let testMissile = game.enemyMissiles[0];

    expect(game.explosions.length).to.equal(0);

    testMissile.y = testMissile.yTarget;
    game.updateEnemyMissiles();

    expect(game.explosions.length).to.equal(1);
    expect(game.explosions[0]).to.be.an.instanceOf(Explosion);
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

  it('should be able to update explosion radii', () => {
    game.createBuildings();
    game.createEnemyMissiles();
    let testMissile = game.enemyMissiles[0];

    testMissile.y = testMissile.yTarget;
    game.updateEnemyMissiles();

    expect(game.explosions[0].radius).to.equal(1);

    game.updateExplosions();

    expect(game.explosions[0].radius).to.equal(1.25);
  });

  it('should forget an explosion that has imploded', () => {
    game.createBuildings();
    game.createEnemyMissiles();
    let testMissile = game.enemyMissiles[0];

    testMissile.y = testMissile.yTarget;
    game.updateEnemyMissiles();

    expect(game.explosions.length).to.equal(1);

    game.explosions[0].radius = 0.5;
    game.updateExplosions();

    expect(game.explosions.length).to.equal(0);
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

  it('should fire from the middle base on a left third click if the left is out of ammo and the middle is not.', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    leftBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(25, 400);

    expect(result).to.equal(midBase);
  });

  it('should fire from the right base on a left third click if the left and middle are out of ammo.', () => {
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

  it('should fire from the middle base on a right third click if the right is out of ammo.', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    rightBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(400, 400);

    expect(result).to.equal(midBase);
  });

  it('should fire from the left base on a right third click if the right and middle are out of ammo.', () => {
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

  it('should fire from the right base if the right half is clicked and the middle is out of ammo', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    midBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(251, 400);

    expect(result).to.equal(rightBase);
  });

  it('should fire from the left base if the left half is clicked and the middle is out of ammo', () => {
    let result, expectedResult;

    game.createBuildings();
    game.createEnemyMissiles();
    let leftBase, midBase, rightBase;

    [leftBase, midBase, rightBase] = game.bases;

    midBase.numberOfMissiles = 0;

    result = game.determineClosestFiringBase(250, 400);

    expect(result).to.equal(leftBase);
  });

  it('should fire from the left base if the right half is clicked and the middle and right are out of ammo', () => {
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

  it('should fire from the right base if the left half is clicked and the middle and left are out of ammo', () => {
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

  it('should be able to update the score displayed to the user', () => {
    expect(game).to.have.a.property('updateScore');
  });
});