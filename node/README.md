# Teste de Avaliação NODEJS

Teste feito em Node.js para uma corretora com funcionalidades de preços atuais, histórico, etc.

## Tecnologias usada no Projeto

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Requerimentos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [NPM](https://www.npmjs.com/)

## Execução do Projeto

É necessário possuir uma key em [Alphavantage](https://www.alphavantage.co/support/#api-key) para obter a `api-key` que será usada no arquivo `.env`.

Faça um clone do projeto com `git clone` ou abra com o [Github Desktop](https://desktop.github.com/).

Instale as dependências usando `npm install` ou `yarn`.

Abra o arquivo `.env.example` e lá estára como infomar as keys usada no projeto.

Execute `yarn dev` para iniciar o projeto.

## Testes

Foi usado [Jest](https://jestjs.io/) e [SuperTest](https://github.com/visionmedia/supertest) para executar os testes.

Para rodar os testes use `yarn test`.

Para editar e modificar os testes,ou incluir novos estão em `__tests__`.
