const salesModel = require('../models/salesModel');

const buscarSales = async () => {
  const allProdutos = await salesModel.findAll();
  return { type: null, message: allProdutos };
};

const buscarSalesById = async (id) => {
  const result = await salesModel.findById(id);
  if (!result[0]) {
    return {
      type: 404,
      message: 'Sale not found',
    };
  }
  return { message: result };
};

const remove = async (id) => {
  const saleExiste = await buscarSalesById(id);
  if (saleExiste.type) return saleExiste;
  const result = await salesModel.remove(id);
  return { message: result };
};

const update = async (id, array) => {
  const productExiste = await buscarSalesById(id);
  if (productExiste.type) return productExiste;
  const result = array.map(({ productId, quantity }) => salesModel.update(id, productId, quantity));
  Promise.all(result);
  return { message: { id, itemsUpdated: array } };
};
/* const criarSale = async () => {
  const salesId = await salesModel.criarSale();
  const exist = await buscarSalesById(salesId);
  const idExist = exist.find((e) => e === true);
  if (idExist) {
    const result = await salesModel.criarSale(salesId);
    if (result) return { type: null, message: result };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};
 */
module.exports = {
  buscarSales,
  buscarSalesById,
  remove,
  update,
/*   criarSale, */
};