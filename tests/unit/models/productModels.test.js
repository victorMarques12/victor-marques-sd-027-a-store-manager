const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const productModel = require('../../../src/models/productModel');
const connection = require('../../../src/models/connection');
const products = require('./moks/models.moks')


const { expect } = chai;

describe('model product test', function () {

  afterEach(() => {
    sinon.restore()
  });

  it('testando func da model  buscar product', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productModel.findAll();
    chai.expect(result).to.be.deep.equal(products);
  });
  it('Testando se a func findById se retorna product especifico', async function () {
    sinon.stub(connection, 'execute').resolves([[products[2]]]);

    const result = await productModel.findById(1);

    chai.expect(result).to.be.deep.equal(products[2]);
  })
});