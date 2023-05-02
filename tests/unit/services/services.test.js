const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsService = require('../../../src/services/productServcies');
const connection = require('../../../src/models/connection');
const products = require('../models/moks/model.mock');

describe('Testando func de service', function () {
  afterEach(() => {
    sinon.restore();
  });

  it('Testando se a function buscarProduct retorna todos os products', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsService.buscarProdutos();

    chai.expect(result.message).to.be.deep.equal(products);
  })

  it('Testando se a func buscarPorId retorna product especifico', async function () {
    sinon.stub(connection, 'execute').resolves([[products[2]]]);

    const result = await productsService.buscarProdutosById(1);

    chai.expect(result.message).to.be.deep.equal(products[2]);
  })
  it('Testando se a func não retorna nada caso o id não exista', async function () {
    sinon.stub(connection, 'execute').resolves([[products[5]]]);

    const result = await productsService.buscarProdutosById(4);

    chai.expect(result.type).to.be.deep.equal(404);
  })
})