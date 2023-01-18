const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.services');

const { allProducts, oneProduct } = require('../mocks/products.mock');

describe('Teste da camada controller de produtos', function () {
  it('Busca por todos os produtos', async function () {
    // arrange
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'findAll')
      .resolves({ type: null, message: allProducts });
    //act
    await productsController.listProducts(req, res);
    //assertion
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  })
  it('Busca por id', async function () {
    // arrange
    const res = {};
    const req = { params: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getById')
      .resolves({ type: null, message: allProducts[0] });
    //act
    await productsController.getProduct(req, res);
    //assertion
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts[0]);
  });
  it('Insere novo produto', async function () {
    // arrange
    const res = {};
    const req = {
      body: {
        name: "ProdutoX"
      } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'insert')
      .resolves(oneProduct);
    await productsController.insertProduct(req, res);
    //assertion
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(oneProduct.message);
  })
  it('Deleta produto', async function () {
    // arrange
    const res = {};
    const req = { params: 1};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'deleteProduct')
      .resolves();
    await productsController.deleteProduct(req, res);
    //assertion
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  })

  afterEach(function () {
    sinon.restore();
  });
})