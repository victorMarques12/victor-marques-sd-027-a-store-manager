const productsModel = require('../models/productModel');

const buscarProdutos = async () => {
  const allProdutos = await productsModel.findAll();
  return { type: null, message: allProdutos };
};

const buscarProdutosById = async (id) => {
  const result = await productsModel.findById(id);
  if (!result) {
    return {
      type: 404,
      message: 'Product not found',
    };
  }
  return { message: result };
};
const remove = async (id) => {
  const productExiste = await buscarProdutosById(id);
  if (productExiste.type) return productExiste;
  const result = await productsModel.remove(id);
  return { message: result };
};

const update = async (id, name) => {
  const productExiste = await buscarProdutosById(id);
  if (productExiste.type) return productExiste;
  const result = await productsModel.update(id, name);
  return { message: result };
};

const criarProduto = async (name) => {
  const produtoAdd = await productsModel.inserirProduct(name);
  const { message } = await buscarProdutosById(produtoAdd);
  return { type: null, message };
};

module.exports = {
  buscarProdutosById,
  buscarProdutos,
  criarProduto,
  update,
  remove,
};
