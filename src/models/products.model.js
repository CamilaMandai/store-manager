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

const search = async (q) => {
  const allProducts = await connection.execute('SELECT * FROM StoreManager.products');
  if (!q) return allProducts[0];
  const resultQ = allProducts[0].filter(({ name }) => name.match(q));
  const products = resultQ.map(async ({ name }) => {
    const query = 'SELECT * FROM StoreManager.products WHERE name=?';
    const product = await connection.execute(query, [name]);
    return product;
  });
  const productsSelected = Promise.all(products).then((values) => values[0]);
  return productsSelected;
};

module.exports = {
  findAll,
  getById,
  insert,
  update,
  deleteProduct,
  search,
};