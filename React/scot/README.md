# SCOT - Stock Viewer

## 1. Introdução

Scot é um WebApp para visualização de ações, criado como um desafio proposto no processo seletivo para _developer_ da [Alive](https://alive.app.br).

A aplicação foi desenvolvida em [ReactJS](https://reactjs.org) ([veja outras ferramentas usadas no projeto](#4.-Ferramentas)) e os dados foram extraídos do site [Alpha Vantage](https://www.alphavantage.co).

## 2. Demo

Uma demonstração da aplicação está disponível [aqui](https://scot.vercel.app)

## 3. Configurando

Para executar a aplicação na sua máquina, basta clonar esse repositório (use `git clone`) e, com o React e o Yarn (ou NPM) instalado, rode: `yarn` ou `npm install`

Depois de instalar todas as dependências, você pode executar: `yarn start` / `npm run start` para iniciar o servidor de desenvolvimento ou `yarn build` / `npm run build` para criar os arquivos de distribuição (em html, css e js).

## 4. Testes

O projeto inclui testes automatizados utilizando [Enzyme](https://github.com/enzymejs/enzyme) e [Jest](https://jestjs.io/). Para rodar os testes, basta rodar `yarn test` ou `npm run test`

## 5. Uso

O uso da ferramenta é super simples. Abaixo seguem as funcionalidades e como usá-las.

- **Buscar empresas**: Para buscar empresas, basta digitar o nome da ação daquela empresa (ou parte dele) e clicar no ícone da lupa.

  ![Buscar](https://i.ibb.co/sPbtv8V/Captura-de-Tela-2021-01-20-s-12-29-18.png)

- **Gráfico com histórico**: O gráfico mostra as informações da ação (preço máximo, mínimo e de fechamento) em comparação com a data.

  ![Gráfico](https://i.ibb.co/hdQtdmQ/Captura-de-Tela-2021-01-20-s-12-29-12.png)

- **Detalhes**: Também é possível visualizar os detalhes da ação (preço de abertura, fechamento, máximo e mínimo) do último dia extraído.

  ![Detalhes](https://i.ibb.co/48WHCWg/Captura-de-Tela-2021-01-20-s-12-29-06.png)

- **Visualização no dia, mês e ano**: Você pode visualizar as últimas 24 horas, 30 dias ou 12 meses do histórico da ação daquela empresa, basta clicar na tab localizada na barra superior.

  ![Tab](https://i.ibb.co/1XVnrGP/Captura-de-Tela-2021-01-20-s-12-29-15.png)

- **Simulação**: Também é possível simular os ganhos (ou perdas) que poderiam acontecer caso o usuário tivesse comprado ações daquela empresa no passado. Com a quantidade de cotas, data de compra e de venda, o sistema retorna o lucro ou prejuízo previsto.

  ![Retorno](https://i.ibb.co/XL9BB0f/Captura-de-Tela-2021-01-20-s-12-29-01.png)

## 6. Ferramentas

A aplicação utiliza algumas ferramentas externas que indico a leitura e conhecimento:

- [ReactJS](https://reactjs.org)
- [React Google Chart](https://react-google-charts.com)
- [Styled-Components](http://styled-components.com)
- [Pullstate](https://github.com/lostpebble/pullstate)
- [Sass](http://sass-lang.com)
- [Axios](https://github.com/axios/axios)
- [React Router Dom](https://reactrouter.com/web/guides/quick-start)
- [Enzyme](https://github.com/enzymejs/enzyme)
- [FontAwesome](http://fontawesome.com)

## 7. Autoria

O projeto foi desenvolvido por [Victor Raphaell Vieira Rodrigues](mailto:victorvieira89@gmail.com) para o processo seletivo da [Alive](https://alive.com.br) e o uso de todo o código-fonte eh permitido livremente.
