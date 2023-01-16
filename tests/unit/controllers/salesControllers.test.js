const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { rightSaleBody, saleCreateResponse } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.services');

describe('Teste da camada controller de sales', function () {
  // it('Busca por todos os sales', async function () {
    // arrange
    // const res = {};
    // const req = {};
    // res.status = sinon.stub().returns(res);
    // res.json = sinon.stub().returns();
    // sinon
     // .stub(salesService, 'findAll')
     // .resolves({ type: null, message: allSales });
    //act
    // await salesController.listSales(req, res);
    //assertion
    // expect(res.status).to.have.been.calledWith(200);
    // expect(res.json).to.have.been.calledWith(allSales);
  // })
  it('Cadastra venda com sucesso', async function () {
    // arrange
    const res = {};
    const req = rightSaleBody;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'insert')
      .resolves({ type: null, message: saleCreateResponse });
    //act
    await salesController.insertSale(req, res);
    //assertion
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(saleCreateResponse);
  })
  afterEach(function () {
    sinon.restore();
  });
})

