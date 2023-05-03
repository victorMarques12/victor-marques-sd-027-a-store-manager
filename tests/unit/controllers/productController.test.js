const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsService = require('../../../src/services/productService');
const productsController = require('../../../src/controllers/productController')
// const { connection } = require('../../../src/models/connection');
const products = require('../models/moks/models.moks');

chai.use(sinonChai);

describe('Testando func do model de controllers', function () {
  const req = {};
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Testando se a func buscarProductos retorna todos os products', async function () {
    sinon.stub(productsService, 'buscarProdutos').resolves({ message: products });

    await productsController.listaProduct(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWithExactly(products);
  })

  it('Testando se a func buscarProdutosById retorna um erro com id inexistente', async function () {
    req.params = { id: 5 };

    sinon.stub(productsService, 'buscarProdutosById').resolves({ type: 404, message: 'Product not found' });

    await productsController.getProdutoId(req, res);

    chai.expect(res.status).to.have.been.calledWith(404);
    chai.expect(res.json).to.have.been.calledWithExactly({ message: 'Product not found' });
  })

  it('Testando se a func buscarId retorna product especifico', async function () {
    req.params = { id: 1 };

    sinon.stub(productsService, 'buscarProdutosById').resolves({ message: products[2] });

    await productsController.getProdutoId(req, res);

    chai.expect(res.status).to.have.been.calledWith(200);
    chai.expect(res.json).to.have.been.calledWithExactly(products[2]);
  })
})