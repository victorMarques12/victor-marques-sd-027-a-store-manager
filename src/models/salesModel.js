const connection = require('./connection');

const findAll = async () => {
  const array = [];
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.sales as sa
right join StoreManager.sales_products as sp
on sa.id = sp.product_id order by sp.sale_id, sp.product_id`,
  );
  result.map((resultId) => {
    const sales = {
      saleId: resultId.sale_id,
      date: resultId.date,
      productId: resultId.product_id,
      quantity: resultId.quantity,
    };
    return array.push(sales);
  });
  return array;
};

const findById = async (passengerId) => {
  const array = [];
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.sales as sa
      right join StoreManager.sales_products as sp
      on sa.id = sp.product_id where sp.sale_id = ${passengerId}
      order by sp.sale_id, sp.product_id`,
  );
  result.map((resultId) => {
    const sales = {
      date: resultId.date,
      productId: resultId.product_id,
      quantity: resultId.quantity,
    };
    return array.push(sales);
  });
  return array;
};
const remove = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
};
const update = async (id, productId, quantity) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales SET quantity = '${quantity}' 
    WHERE id = '${id}' AND product_id = '${productId}'`,
  );
  return result;
};
const criarSale = async () => {
  const [{ insertId }] = await
    connection.execute('INSERT INTO StoreManager.sales (date) VALUES(NOW())');
  return insertId;
};

module.exports = {
  findAll,
  findById,
  remove,
  update,
  criarSale,
};