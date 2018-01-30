const { expect } = require('chai');
const Building = require('../lib/Building.js');
const Missile = require('../lib/Missile.js');
const Base = require('../lib/Base.js');


describe('Base', () => {
  let base;

  beforeEach(() => {
    base = new Base(25, 450, 50, 50);
  })

  it('should be an object', () => {
    expect(base).to.be.an('object');
  })

  it('should extend Building', () => {
    expect(base).to.be.an.instanceOf(Building);
  });

  it('should be able to able to fire its missiles', () => {
    expect(base.numberOfMissiles).to.equal(10);
    expect(base.defenseMissiles.length).to.equal(0);

    base.createDefenseMissile();

    expect(base.numberOfMissiles).to.equal(9);
    expect(base.defenseMissiles.length).to.equal(1);
    expect(base.defenseMissiles[0]).to.be.an.instanceOf(Missile);
  });

  it('should fire missiles from the center of the top of itself', () => {
    base.createDefenseMissile();
    let defenseMissile = base.defenseMissiles[0];

    expect(defenseMissile.x).to.equal(base.x + base.width / 2);
    expect(defenseMissile.y).to.equal(base.y);
  });

  it('should be able to pass target coordinates to its missiles', () => {
    base.createDefenseMissile(250, 300);
    let defenseMissile = base.defenseMissiles[0];

    expect(defenseMissile.xTarget).to.equal(250);
    expect(defenseMissile.yTarget).to.equal(300);
  });

  it('should not be able to fire if it is out of missiles', () => {
    expect(base.numberOfMissiles).to.equal(10);
    base.createDefenseMissile(250, 300);

    expect(base.defenseMissiles.length).to.equal(1);

    base.numberOfMissiles = 0;
    base.createDefenseMissile(250, 300);

    expect(base.defenseMissiles.length).to.equal(1);
    expect(base.numberOfMissiles).to.equal(0);
  });

  it
});