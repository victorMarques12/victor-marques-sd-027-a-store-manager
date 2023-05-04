const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel')
/* const connection = require('../../../src/models/connection'); */
const products = require('../models/moks/models.moks');

describe('Testando func de service', function () {
  afterEach(() => {
    sinon.restore();
  });

  it('Testando se a function salesService retorna todos os products', async function () {
    sinon.stub(salesModel, 'findAll').resolves(products);

    const result = await salesService.buscarSales();

    chai.expect(result.message).to.be.deep.equal(products);
  })

  it('Testando se a func buscarSalesById retorna product especifico', async function () {
    sinon.stub(salesModel, 'findById').resolves([[products[0]]]);

    const result = await salesService.buscarSalesById(1);

    chai.expect(result.message[0][0]).to.be.deep.equal(products[0]);
  })
  it('Testando se a func não retorna nada caso o id não exista', async function () {
    sinon.stub(salesModel, 'findById').resolves([products[5]]);

    const result = await salesService.buscarSalesById(4);

    chai.expect(result.type).to.be.deep.equal(404);
  })
})