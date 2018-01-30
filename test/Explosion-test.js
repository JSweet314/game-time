const {expect} = require('chai');
const Explosion = require('../lib/Explosion.js');

describe('Explosion', () => {
  let explosion;

  beforeEach(() => {
    explosion = new Explosion(10, 10)
  })

  it('should be an object', () => {
    expect(explosion).to.be.an('object')
  });

  it('should have a default radius', () => {
    expect(explosion.radius).to.equal(1);
  });

  it('should have a max radius', () => {
    expect(explosion.maxRadius).to.equal(25);
  });

  it('should have x and y coordinate parameters', () => {
    expect(explosion.x).to.equal(10);
    expect(explosion.y).to.equal(10);
  });

  it('should be able to increment its radius', () => {
    expect(explosion.radius).to.equal(1);
    expect(explosion.increment).to.equal(0.25);

    explosion.incrementRadius();

    expect(explosion.radius).to.equal(1.25);
  });
});