## Backend

Principais tecnologias usadas, node, typescript, express, jest.\
Principais conceitos utilizados, clean architecture, solid, ddd.

### Instalação

1. Clone o repositorio
   ```sh
   git clone https://github.com/hitaloose/hiring.git
   ```
2. Navegue para pasta do projeto
   ```sh
   cd node/api
   ```
3. Crie o arquivo .env e preencha com dados obrigatórios, para obter o token Alpha Vantage [click aqui](https://www.alphavantage.co/support/#api-key)
   ```sh
   cp ./.env-exemple ./.env
   ```
4. Instale os pacotes npm
   ```sh
   npm install
   ```

### Execução

- Para executar em modo desenvolvimento
  ```sh
  npm run dev
  ```
- Para rodar todos testes
  ```sh
  npm test:ci
  ```

## Frontend

Principais tecnologias usadas, react, typescript, styled-components, material-ui.

### Instalação

1. Clone o repositorio
   ```sh
   git clone https://github.com/hitaloose/hiring.git
   ```
2. Navegue para pasta do projeto
   ```sh
   cd node/web
   ```
3. Crie o arquivo .env e preencha com dados obrigatórios
   ```sh
   cp ./.env-exemple ./.env
   ```
4. Instale os pacotes npm
   ```sh
   npm install
   ```

### Execução

- Para executar em modo desenvolvimento
  ```sh
  npm run start
  ```
- Para rodar todos testes
  ```sh
  npm test
  ```
