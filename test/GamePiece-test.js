const { expect } = require('chai');
const GamePiece = require('../src/GamePiece.js');

describe('GamePiece', () => {
  let gamePiece;

  beforeEach(() => {
    gamePiece = new GamePiece(10, 10);
  });

  it('should be an object', () => {
    expect(gamePiece).to.be.an('object');
  });

  it('should have x and y coordinate parameters', () => {
    expect(gamePiece.x).to.equal(10);
    expect(gamePiece.y).to.equal(10);
  });
});
