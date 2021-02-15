# Background

Uma corretora de ações está desenvolvendo um sistema para permitir que pequenos investidores possam tomar decisões melhores sobre seu portfólio. Uma das funcionalidades importantes é a de verificar o desempenho de uma ação em cinco cenários:

   - Preço atual;
   - Preço histórico;
   - Preço atual em comparação a outras ações;
   - Projeção de ganhos com compra em data específica.
   
Para isso, a equipe de software da empresa optou por desenvolver duas aplicações: um serviço de backend especializado nesses requisitos (que permitirá que essas funcionalidades sejam reutilizadas em outros produtos da empresa) e um dashboard configurável que dará visibilidade aos dados. Sua missão para este teste é implementar ambas as partes.

# Requisitos técnicos da solução

O serviço deverá ser implementado via HTTP, e o formato de serialização das requisições e respostas será JSON. O backend deverá ser implementado em node.js, seja com `http` puro, seja com framework de sua escolha. O frontend será uma single-page application (SPA), e poderá ser implementado com a solução de sua escolha: Angular, Angular 2/4, Vue.js, React, você decide. Forneça, em conjunto, uma configuração de build com Webpack, rollup, browserify ou outra solução de sua escolha, e um comando único para subir sua aplicação. 

Sua solução deverá ter testes automatizados, tanto no frontend quanto no backend.

Para obter dados de ações, você poderá usar o Alpha Vantage (https://www.alphavantage.co). Caso queira utilizar bibliotecas prontas para isso — sinta-se livre para utilizá-las.

O tratamento de erros não será explicitado nos endpoints. O candidato ou candidata poderá inferir casos que poderão gerar erros ou duplicidades nos dados, e tratá-los de acordo. A ausência de tratamento não desqualifica a proposta; a presença, no entanto, contará pontos a favor.

## Projeção de ganhos

A ideia é implementar algo simples, sem preocupações com dividendos, taxas administrativas ou outras incumbências que afetariam o montante total. Em sendo assim, pressuponha que a compradora investiu seu dinheiro numa determinada quantidade de ações de uma empresa em alguma data no passado, e que deseja saber quanto teria ganhado ou perdido caso o fizesse.

# Como enviar sua proposta

- Crie um fork deste repositório;
- Implemente sua solução, fazendo commits da maneira que faria em um projeto profissional;
- Substitua este README com um específico para sua aplicação, indicando como rodá-la, e como executar os testes (fique à vontade para inserir mais detalhes técnicos, caso deseje);
- Abra um pull request para este repositório.

# Detalhamento

## Frontend

Feito em React.JS, Bootstrap 5, Apexcharts, React Router Dom
## As rotas do front são as seguintes
### /
  Nessa rota é onde tem resumo da carteira.
  Ná parte principal de tela tem uma lista de cards onde é possivel ver a varição do valor do dia da compra até hoje é valor investido
### /modal
  Nessa rota é onde usuario prenche o formulario para inserir as ações
### `/stocks/history?stock_name=<string>&from=<string>&to=<string>`
  Nessa rota for desenvolvido input e integração com api eo grafico

## Backend

### Endpoints

#### `/stocks/quote?stock_name=<array>` - Retorna a cotação mais recente para a ação ####

Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (AAPL, GOOGL)

Retorno:


```js
[
  {
    "name": string,
    "lastPrice": number,
    "pricedAt": string // data e hora no formato ISO 8601, UTC
  }
]
```

Exemplo de uso:

```
$ curl --location --request GET 'http://localhost:3001/stocks/quote?stock_name=AAPL,GOOGL'
```

#### `/stocks/history?stock_name=<string>&from=<string>&to=<string>` - Retorna preço histórico da ação num intervalo inclusivo ####

Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (AAPL, GOOGL)
- `from` - string com data em formato ISO 8601
- `to` - string com data em format ISO 8601

Retorno:

```js
{
  "name": string,
  "prices": [<pricing>, <pricing>, ...]
}
```

O schema de `pricing` segue abaixo:

```js
{
  "opening": number,
  "low": number,
  "high": number,
  "closing": number,
  "pricedAt": string // data no formato ISO 8601, UTC
}
```

Exemplo de uso:

```
$ curl --location --request GET 'http://localhost:3001/stocks/history?stock_name=AAPL&from=01/01/20&to=12/31/20'
```

#### `/stocks/quote?stock_name=<array>` - Compara uma ação com uma ou mais ações ####
Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (AAPL, GOOGL)

Retorno:


```js
[
  {
    "name": string,
    "lastPrice": number,
    "pricedAt": string // data e hora no formato ISO 8601, UTC
  },
  {
    "name": string,
    "lastPrice": number,
    "pricedAt": string // data e hora no formato ISO 8601, UTC
  }
]
```

Exemplo de uso:

```
$ curl --location --request GET 'http://localhost:3001/stocks/quote?stock_name=AAPL,GOOGL'
```