const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (passengerId) => {
  const [[passenger]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [passengerId],
  );
  return passenger;
};

const inserirProduct = async (order) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [order],
  );
  return insertId;
};

const update = async (id, name) => {
  await connection.execute(
    `UPDATE StoreManager.products SET name = '${name}' WHERE id = '${id}'`,
  );
  return { id, name };
};

const remove = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
};

module.exports = {
  findAll,
  findById,
  inserirProduct,
  update,
  remove,
};