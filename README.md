Neste projeto desenvolvi uma API RESTful de um sistema de gerenciamento de vendas no formato dropshipping. Com ela é possível criar, visualizar, deletar e atualizar produtos e vendas. Para a gestão de dados foi criado um banco de dados MySQL.

A API foi construída utilizando a arquitetura MSC (model-service-controller).

## Orientações para rodar o node e banco com Docker ##

> Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
> Use o comando `docker exec -it store_manager bash` para abrir um terminal dentro do container do docker, que estará rodando em segundo plano.
> Dentro desse terminal, instale as dependências com `npm install`

- **Atenção** Caso tenha optado por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados no terminal do container.


