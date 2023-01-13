const { expect } = require('chai');
const sinon = require('sinon');
const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.services');

const allProducts = require('../mocks/products.mock');

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
  it('Busca por todos os produtos', async function () {
    // arrange
    const res = {};
    const req = { params: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getById')
      .resolves({ type: null, message: allProducts[0] });
    //act
    await productsController.getById(req, res);
    //assertion
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts[0]);
  })
  afterEach(function () {
    sinon.restore();
  });
})