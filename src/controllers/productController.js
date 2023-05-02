const productServices = require('../services/productService');

const listaProduct = async (_req, res) => {
  // constante para procurar "encontrar" o produto
  const { type, message } = await productServices.buscarProdutos();
  // condição para a mensagem de erro
  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const getProdutoId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productServices.buscarProdutosById(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};
const remove = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productServices.remove(id);
  if (type) return res.status(404).json({ message });

  res.status(204).json();
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productServices.update(id, name);
  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

const creteControler = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productServices.criarProduto(name);
  if (!type) {
    return res.status(201).json(message);
  }
};
module.exports = {
  listaProduct,
  getProdutoId,
  creteControler,
  update,
  remove,
};