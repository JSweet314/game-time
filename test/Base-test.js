const { expect } = require('chai');
const Building = require('../lib/Building.js');
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

});