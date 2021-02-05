# NODEJS Assessment Test

Test made in Node.js for a broker with features of current prices, history, etc.

## Technologies used in Project

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [NPM](https://www.npmjs.com/)

## Project Execution

It is necessary to have a key in [Alphavantage](https://www.alphavantage.co/support/#api-key) to obtain the `api-key` that will be used in the` .env` file.

Clone the project with `git clone` or open it with [Github Desktop](https://desktop.github.com/).

Install the dependencies using `npm install` or` yarn`.

Open the `.env.example` file and there is how to key in the keys used in the project.

Run `yarn start` to start the project.

## Tests

[Jest](https://jestjs.io/) and [SuperTest](https://github.com/visionmedia/supertest) were used to run the tests.

To run the tests use `yarn test`.

To edit and modify the tests, or add new ones, they are in `__tests__`.
