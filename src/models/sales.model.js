const connection = require('./connection');

const findAll = async () => {
  const querySelect = 'SELECT sale_id AS saleId, date, product_id AS productId, quantity';
  const queryFrom = ' FROM StoreManager.sales_products AS products ';
  const queryInner = 'INNER JOIN StoreManager.sales AS sales ON products.sale_id = sales.id';
  const result = await connection.execute(
    querySelect + queryFrom + queryInner,
    );
 return result;
};

const getById = async (id) => {
  const querySelect = 'SELECT date, product_id AS productId, quantity ';
  const queryFrom = 'FROM StoreManager.sales_products AS p ';
  const queryInner = `INNER JOIN StoreManager.sales AS s ON p.sale_id=s.id WHERE p.sale_id=${id}`;
  const sale = await connection.execute(
    querySelect + queryFrom + queryInner,
  );
  return sale[0];
};

const insert = async (products) => {
  //  const { productId, quantity } = product;
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [new Date()],
  );
  const nestedValues = [products.map((product) =>
    [insertId, Number(product.productId), Number(product.quantity)])];
    await connection.query(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ?',
    nestedValues,
    // (err) => { if (err) throw err; connection.end(); },
  );
  const saleInserted = {
    id: insertId,
    itemsSold: products,
  };
  return saleInserted;
};

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales WHERE id=?', [id]);
};

module.exports = {
  findAll,
  getById,
  insert,
  deleteSale,
};