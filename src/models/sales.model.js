const connection = require('./connection');

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
    (err) => { if (err) throw err; connection.end(); },
  );
  const saleInserted = {
    id: insertId,
    itemsSold: products,
  };
  return saleInserted;
};

module.exports = {
  insert,
};