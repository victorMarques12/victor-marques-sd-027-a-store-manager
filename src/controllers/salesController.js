const salesService = require('../services/salesService');

const listaSales = async (_req, res) => {
  // constante para procurar "encontrar" o produto
  const { type, message } = await salesService.buscarSales();
  // condição para a mensagem de erro
  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};
const criarSale = async (req, res) => {
  const novoSale = req.body;
  const { type, message } = await salesService.criarSale(novoSale);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.buscarSalesById(Number(id));

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};
const remove = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.remove(id);
  if (type) return res.status(404).json({ message });

  res.status(204).json(message);
};
const update = async (req, res) => {
  const { id } = req.params;
  const array = req.body;
  const { type, message } = await salesService.update(id, array);
  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

module.exports = {
  listaSales,
  getSalesId,
  remove,
  update,
  criarSale,
};