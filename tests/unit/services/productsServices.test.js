const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.services');

const { allProducts, oneProduct } = require('../mocks/products.mock');

describe('Teste da camada service de produtos', function () {
  it('Busca por todos os produtos', async function () {
    // arrange
    sinon.stub(productsModel, 'findAll').resolves(allProducts);
    // act
    const products = await productsService.findAll();
    // assertion
    expect(products.type).to.be.equal(null);
    expect(products.message).to.be.deep.equal(allProducts);
  });
  it('Busca por um produto pelo id', async function () {
    // arrange
    sinon.stub(productsModel, 'getById').resolves(allProducts[0]);
    // act
    const products = await productsService.getById(1);
    // assertion
    expect(products.type).to.be.equal(null);
    expect(products.message).to.be.deep.equal(allProducts[0]);
  });
  it('Insere um novo produto', async function () {
    // arrange
    sinon.stub(productsModel, 'insert').resolves([4]);
    sinon.stub(productsModel, 'getById').resolves(oneProduct.message);
    // act
    const returnedId = await productsService.insert({
      "name": "ProdutoX"
    });
    // assertion
    expect(returnedId).to.be.deep.equal(oneProduct);
  })
  it('Atualiza um produto', async function () {
    // arrange
    sinon.stub(productsModel, 'getById').resolves(oneProduct.message);
    // act
    const result = await productsService.update(4, 'ProdutoX');
    // assertion
    expect(result).to.be.deep.equal(oneProduct);
  })
  afterEach(function () {
    sinon.restore();
  });
})