# Avaliação Técnica Alive Node.js

API desenvolvida em Node.js que possibilita a verificação de Preço atual, Preço histórico, Preço atual com comparação a outras ações e projeção de ganhos com comparação em data específica.

## O Cenário

Uma corretora de ações está desenvolvendo um sistema para permitir que pequenos investidores possam tomar decisões melhores sobre seu portfólio. Uma das funcionalidades importantes é a de verificar o desempenho de uma ação em cinco cenários:

Preço atual;
Preço histórico;
Preço atual em comparação a outras ações;
Projeção de ganhos com compra em data específica.

## Tecnologias

- [Node.js](https://nodejs.org/en/)
- [Javascript]
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Requerimentos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)

## Execução do Projeto

Clone o projeto `git clone`
Executar o comando `yarn` ou `npm install` para instalação das dependências
Criar a conta em https://www.alphavantage.co/support/#api-key para obter a `api-key`
Editar o arquivo `.env` e informar a `api-key` obtida na variável `APIKEY`
Executar o comando `yarn start` para iniciar a aplicação.

Por padrão o endereço e porta são `localhost` e porta `3000`, caso seja necessário deve-se alterar
os valores padrões no arquivo `.env` nas variáveis `ADDRESS` e `PORT`.

## Testes

As rotinas de Testes foram implementadas utilizando `Jest` e `Supertest`.

Para executar os testes, basta executar o comando `yarn test`.
