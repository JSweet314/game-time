const { expect } = require('chai');
const Building = require('../src/Building.js');
const GamePiece = require('../src/GamePiece.js');

describe('Building', () => {
  let building;

  beforeEach(() => {
    building = new Building(0, 450, 50, 50);
  })

  it('should be an object', () => {
    expect(building).to.be.an('object');
  })

  it('should extend GamePiece', () => {
    expect(building).to.be.an.instanceOf(GamePiece);
  });

  it('should take a height and width', () => {
    expect(building).to.have.a.property('height', 50);
    expect(building).to.have.a.property('width', 50);
  });

  it('should be able to draw itself', () => {
    expect(building).to.have.a.property('drawBuilding');
  });
});