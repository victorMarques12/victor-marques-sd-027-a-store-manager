const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const salesModel = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');
const products = require('./moks/sales.moks')


const { expect } = chai;

describe('model sales test', function () {

  afterEach(() => {
    sinon.restore()
  });

  it('testando func da salesModel  buscar product', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await salesModel.findAll();
  
  
    chai.expect(result[0].date).to.be.deep.equal(products[0].date);
  });
  it('Testando se a func findById se retorna product especifico', async function () {
    sinon.stub(connection, 'execute').resolves([[products[2]]]);

    const result = await salesModel.findById(1);

    chai.expect(result.quantity).to.be.deep.equal([products[2]].quantity);
  })
});