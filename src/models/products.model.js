// const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  // return camelize(result);
  return result;
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  // return camelize(product);
  return product;
};

const insert = async (product) => {
   const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product.name],
  );
  return insertId;
};

const update = async (id, name) => {
  const query = `UPDATE StoreManager.products SET name='${name}' WHERE id=${id}`;
  await connection.execute(
    query,
  );
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id=?',
    [id],
  );
};

module.exports = {
  findAll,
  getById,
  insert,
  update,
  deleteProduct,
};