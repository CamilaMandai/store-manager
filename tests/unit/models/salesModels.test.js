const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/sales.model');

const {
  rightSaleBody,
  saleCreateResponse,
} = require('../mocks/sales.mock')

const connection = require('../../../src/models/connection');

describe('Teste da camada Models de sales', function () {
  it('testa se é possível cadastrar uma venda com sucesso', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    sinon.stub(connection, 'query').resolves(saleCreateResponse);
    // act
    const response = await productsModel.insert(rightSaleBody);
    // assertion
    expect(response).to.be.deep.equal(saleCreateResponse);
  })
  afterEach(function () {
    sinon.restore();
  })
})