const { expect } = require('chai');
const GamePiece = require('../lib/GamePiece.js');
const Explosion = require('../lib/Explosion.js');
const Missile = require('../lib/Missile.js');

describe('Missile', () => {
  let missile;

  beforeEach(() => {
    missile = new Missile(25, 450);
  })

  it('should be an object', () => {
    expect(missile).to.be.an('object');
  })

  it('should extend GamePiece', () => {
    expect(missile).to.be.an.instanceOf(GamePiece);
  });

  it('should have a velocity', () => {
    expect(missile.velocity).to.equal(1);
  });

  it('should know where it started', () => {
    expect(missile).to.have.property('startX', missile.x);
    expect(missile).to.have.property('startY', missile.y);
  })

  it('should have target (x, y) coordinates', () => {
    expect(missile).to.have.property('targetX');
    expect(missile).to.have.property('targetY');
  });
});