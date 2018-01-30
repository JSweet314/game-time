const {expect} = require('chai');
const EnemyMissile = require('../lib/EnemyMissile');

describe('EnemyMissile', () => {
  let missile;

  beforeEach(()=> {
    missile = new EnemyMissile();
  });

  it('should be an object', () => {
    expect(missile).to.be.an('object');
  })


});