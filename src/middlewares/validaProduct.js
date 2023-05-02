const { idSchema } = require('./schema');
// const productsModel = require('../models/productModel');

const validacaoProduct = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validateProductId = (id) => {
  const { error } = idSchema.validate(id);
  if (!error) return { type: null, message: '' };
  return { type: 'INVALID_VALUE', message: '"id" must to be a number' };
};

/* const validateNewProduct = (newProduct) => {
  const { error } = newProductSchema.validate(newProduct);
  if (!error) return { type: null, message: '' };
  if (!newProduct.name) return { type: 'NAME_IS_REQUIRED', message: '"name" is required' };
  return { type: 'NAME_LENGTH_ERROR', message: '"name" length must be at least 5 characters long' };
};

const verificateProductIdExist = async (allProducts) => {
  const existentProducts = await Promise
    .all(allProducts.map((product) => productsModel.findById(product.productId)));
  return existentProducts.every((product) => product[0]);
}; */

module.exports = {
  validacaoProduct,
  validateProductId,
  /*  validateNewProduct,
   verificateProductIdExist, */
};