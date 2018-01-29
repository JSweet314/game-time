const { expect } = require('chai');
const GamePiece = require('../lib/GamePiece.js');

describe('GamePiece', () => {
  let gamePiece;

  beforeEach(() => {
    gamePiece = new GamePiece(10, 10, 10, 10);
  });

  it('should be an object', () => {
    expect(gamePiece).to.be.an('object');
  });

  // it('should have an x and y coordinate', () => {
  //   expect
  // });
});