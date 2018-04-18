const {expect} = require('chai');
const GamePiece = require('../src/GamePiece.js');
const Explosion = require('../src/Explosion.js');

describe('Explosion', () => {
  let explosion;

  beforeEach(() => {
    explosion = new Explosion(10, 10)
  })

  it('should be an object', () => {
    expect(explosion).to.be.an('object')
  });

  it('should extend GamePiece', () => {
    expect(explosion).to.be.an.instanceOf(GamePiece);
  });

  it('should have a default radius', () => {
    expect(explosion.radius).to.equal(1);
  });

  it('should have a max radius', () => {
    expect(explosion.maxRadius).to.equal(25);
  });

  it('should be able to increment its radius up to its max', () => {
    expect(explosion.radius).to.equal(1);
    expect(explosion.increment).to.equal(0.25);

    explosion.updateRadius();

    expect(explosion.radius).to.equal(1.25);
  });

  it('should implode after reaching its max radius', () => {
    expect(explosion.radius).to.equal(1);
    expect(explosion.increment).to.equal(0.25);

    explosion.radius = explosion.maxRadius;
    explosion.updateRadius();

    expect(explosion.increment).to.equal(-0.25);
  });

  it('should be able to draw itself (a circle)', () => {
    expect(explosion).to.have.property('drawExplosion');
  })
});