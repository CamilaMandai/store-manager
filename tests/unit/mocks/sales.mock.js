const rightSaleBody = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const saleCreateResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ]
};

const allSales = [
  {
    "saleId": 1,
    "date": "2023-01-16T19:50:43.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-01-16T19:50:43.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-01-16T19:50:43.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const saleByID = [
  {
    "date": "2023-01-16T19:50:43.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-01-16T19:50:43.000Z",
    "productId": 2,
    "quantity": 10
  }
]

module.exports = {
  saleCreateResponse,
  rightSaleBody,
  allSales,
  saleByID,
};