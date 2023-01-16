const connection = require('./connection');

// const findAll = async () => {
//  const result = await connection.execute(
//   'SELECT * FROM StoreManager.sales',
//  );
//  return result;
// };

// const getById = async (id) => {
//  const sale = await connection.execute(
//    'SELECT * FROM StoreManager.sales WHERE sale_id'
//  )
// }

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

module.exports = {
  // findAll,
  insert,
};