const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');

const {
  rightSaleBody,
  saleCreateResponse,
  allSales,
  saleByID,
} = require('../mocks/sales.mock')

const connection = require('../../../src/models/connection');

describe('Teste da camada Models de sales', function () {
  it('testa se é possível listar todas as vendas', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves(allSales);
    // act
    const response = await salesModel.findAll();
    // assertion
    expect(response).to.be.deep.equal(allSales);
  })
  // it('testa se é possível buscar uma venda pelo id', async function () {
    // arrange
  //  sinon.stub(connection, 'execute').resolves(saleByID);
    // act
  // const response = await salesModel.getById(1);
    // assertion
  // expect(response).to.be.deep.equal(saleByID);
  // })
  it('testa se é possível cadastrar uma venda com sucesso', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    sinon.stub(connection, 'query').resolves(saleCreateResponse);
    // act
    const response = await salesModel.insert(rightSaleBody);
    // assertion
    expect(response).to.be.deep.equal(saleCreateResponse);
  })
  afterEach(function () {
    sinon.restore();
  })
})