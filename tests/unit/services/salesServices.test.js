const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');
const productsModel = require('../../../src/models/products.model');
const salesService = require('../../../src/services/sales.services');
const { allProducts } = require('../mocks/products.mock');
const { saleCreateResponse, rightSaleBody, allSales, saleByID } = require('../mocks/sales.mock'); 

describe('Teste da camada service de sales', function () {
  it('Busca por todos os sales', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSales);
    const result = await salesService.findAll()
    expect(result).to.be.deep.equal({ message: allSales });
  })
  it('Busca por sale pelo Id', async function () {
    sinon.stub(salesModel, 'getById').resolves(saleByID);
    const result = await salesService.getById(1)
    expect(result).to.be.deep.equal({ type: null, message: saleByID });
  })
  it('Tenta cadastrar sale com produto com Id inválido', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);
    const result = await salesService.insert([
      { productId: 99, quantity: 1 },
      { productId: 2, quantity: 5 },
    ]);
    expect(result).to.be.deep.equal({ type: 'INVALID_ID', message: 'Product not found' });
  })
  it('Cadastro de sale com sucesso', async function () {
    sinon.stub(salesModel, 'insert').resolves(saleCreateResponse);
    const result = await salesService.insert(rightSaleBody);
    expect(result).to.be.deep.equal({ type: null, message: saleCreateResponse });
  })
  afterEach(function () {
    sinon.restore();
  })
})