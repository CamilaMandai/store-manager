const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');

const connection = require('../../../src/models/connection');

const { allProducts, oneProduct } = require('../mocks/products.mock');

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
  it('Cadastra um produto', async function () {
    //arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    //act
    const insertId = await productsModel.insert({
      name: "ProdutoX"
    });
    //assert
    expect(insertId).to.be.equal(1);
  })
  it('Busca por um produto que não existe', async function () {
    //arrange
     sinon.stub(connection, 'execute').resolves([[]]);
    //act
     const produto = await productsModel.getById(12);
    //assert
     expect(produto).to.be.undefined;
  })
  it('Atualiza um produto', async function () {
    //arrange
    sinon.stub(connection, 'execute').resolves();
    //act
    const produto = await productsModel.update(1, "Martelo do Batman");
    //assert
    expect(produto).to.be.undefined;
  })
  it('Deleta um produto', async function () {
    //arrange
    sinon.stub(connection, 'execute').resolves();
    //act
    const result = await productsModel.deleteProduct(1);
    //assert
    expect(result).to.be.undefined;
  })
  it('Busca um produto pelo match de uma query', async function () {
    //arrange
    sinon.stub(connection, 'execute').onFirstCall().resolves(allProducts);
    sinon.stub(connection, 'execute').onSecondCall().resolves(allProducts[0]);
    //act
    const result = await productsModel.search('Martelo');
    //assert
    expect(result).to.be.deep.equal([allProducts[0]]);
  })
  afterEach(function () {
    sinon.restore();
  });
} )