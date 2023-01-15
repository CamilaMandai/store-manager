const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');

const connection = require('../../../src/models/connection');

const allProducts = require('../mocks/products.mock');

describe('Teste de unidade da camada model de produtos', function () {
  it('Busca todos os produtos do banco de dados', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([allProducts]);

    //act
    const produtos = await productsModel.findAll();

    //assertion
    expect(produtos).to.be.deep.equal(allProducts);
  })
  it('Busca por um produto específico no banco de dados', async function () {
    //arrange
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    //act
    const produto = await productsModel.getById(1);
    //assert
    expect(produto).to.be.deep.equal(allProducts[0]);
  })
  // it('Busca por um produto que não existe', async function () {
    //arrange
    // sinon.stub(connection, 'execute').resolves([{ message: 'Product not found' }]);
    //act
    // const produto = await productsModel.getById(12);
    //assert
    // expect(produto.message).to.equal('Product not found');
 // })
  afterEach(function () {
    sinon.restore();
  });
} )