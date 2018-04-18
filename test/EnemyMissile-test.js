const {expect} = require('chai');
const Missile = require('../src/Missile.js')
const Game = require('../src/Game.js');
const EnemyMissile = require('../src/EnemyMissile.js');

describe('EnemyMissile', () => {
  let missile, game;

  beforeEach(()=> {
    let x = Math.random() * 500;
    let y = -Math.random() * 500;

    missile = new EnemyMissile(x, y);
    game = new Game();
    game.createBuildings();
  });

  it('should be an object', () => {
    expect(missile).to.be.an('object');
  });

  it('should extend Missile', () => {
    expect(missile).to.be.an.instanceOf(Missile);
  });

  it('should store an index value corresponding to an array of buildings', () => {
    expect(missile).to.have.a.property('targetIndex', 0);
  });

  it('should randomly select a target from an array of buildings and set its target coordinates', () => {
    expect(missile.targetIndex).to.equal(0);

    missile.randomlySelectTarget(game.buildings);

    expect(missile.targetIndex).to.be.within(0, 8);

    game.buildings.splice(2,1);

    missile.randomlySelectTarget(game.buildings);

    expect(missile.targetIndex).to.be.within(0, 7);

    let target = game.buildings[missile.targetIndex]

    expect(missile.xTarget).to.equal(target.x + target.width / 2);
    expect(missile.yTarget).to.equal(target.y);
  });

  it('should be able to destroy its target', () => {
    missile.randomlySelectTarget(game.buildings);
    let target = game.buildings[missile.targetIndex];

    expect(missile.y).to.be.below(target.y);

    missile.destroyBuilding(game.buildings);

    expect(game.buildings.length).to.equal(9);

    missile.y = missile.yTarget;
    missile.destroyBuilding(game.buildings);

    expect(game.buildings.length).to.equal(8);
  });
});