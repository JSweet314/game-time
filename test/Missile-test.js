const { expect } = require('chai');
const GamePiece = require('../src/GamePiece.js');
const Explosion = require('../src/Explosion.js');
const Missile = require('../src/Missile.js');

describe('Missile', () => {
  let missile;

  beforeEach(() => {
    missile = new Missile(25, 450, 250, 250);
  })

  it('should be an object', () => {
    expect(missile).to.be.an('object');
  })

  it('should extend GamePiece', () => {
    expect(missile).to.be.an.instanceOf(GamePiece);
  });

  it('should have a velocity', () => {
    expect(missile.velocity).to.equal(2);
  });

  it('should know where it started', () => {
    expect(missile).to.have.property('xStart', missile.x);
    expect(missile).to.have.property('yStart', missile.y);
  })

  it('should have target (x, y) coordinates', () => {
    expect(missile).to.have.property('xTarget', 250);
    expect(missile).to.have.property('yTarget', 250);
  });

  it('should be able to set x,y vector components, a number', () => {
    expect(missile).to.have.property('xVector', 0);
    expect(missile).to.have.property('yVector', 0);

    missile.calculateDirectionalVectors();

    expect(missile.xVector).to.equal(missile.xTarget - missile.xStart);
    expect(missile.yVector).to.equal(missile.yTarget - missile.yStart);
  });

  it('should calculate the magnitude of its vector', () => {
    missile.calculateDirectionalVectors();
    let dx = missile.xVector;
    let dy = missile.yVector;

    expect(missile).to.have.property('magnitude', 0);

    missile.calculateMagnitude();

    expect(missile.magnitude).to.equal(Math.sqrt(dx * dx + dy * dy));
  });

  it('should be able to move towards its target', () => {
    missile.calculateDirectionalVectors();
    missile.calculateMagnitude();

    expect(missile.x).to.equal(missile.xStart);
    expect(missile.y).to.equal(missile.yStart);

    missile.moveTowardsTarget();

    expect(missile.x).to.not.equal(missile.xStart);
    expect(missile.y).to.not.equal(missile.yStart);
  });

  it('should be able to explode', () => {
    let explosion = missile.triggerExplosion();

    expect(explosion).to.be.an.instanceOf(Explosion);
  });

  it('should be able to draw itself to the canvas (a line)', () => {
    expect(missile).to.have.a.property('drawMissile');
  })
});