const validarId = (req, res, next) => {
  const name = req.body;
  // if (!name.productId) return res.status(400).json({ message: '"productId" is required' });
  const id = (itemID) => itemID.every((item) => item.productId);
  if (!id(name)) return res.status(400).json({ message: '"productId" is required' });
  next();
};

const validarQuantity = (req, res, next) => {
  const resultBody = req.body;
  const existQuatity = (itemID) => itemID.every((item) => !item.quantity);
  const valueQuatity = (value) =>
    value.every((item) => item.quantity === 0 || item.quantity < 0);
  if (valueQuatity(resultBody)) {
    return res.status(422).json(
      { message: '"quantity" must be greater than or equal to 1' },
    );
  }
  if (existQuatity(resultBody)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};
/* const notId = (req, res, next) => {
  const name = req.body;
  const id = (itemID) => itemID.map((item) => item.productId);
  if (!id(name)) return res.status(404).json({ message: 'Product not found' });
  next();
}; */

module.exports = {
  validarId,
  validarQuantity,
  /*  notId, */
};