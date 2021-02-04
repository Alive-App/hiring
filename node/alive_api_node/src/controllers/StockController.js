require('dotenv/config');
const api = require("../services/api");

/*
  /stocks/:stock_name/quote - Retorna a cotação mais recente para a ação

  Retorno:
    {
      "name": string,
      "lastPrice": number,
      "pricedAt": string // data e hora no formato ISO 8601, UTC
    }
*/
const quote = async (req, res) => {
  try {
    const { stock_name } = req.params;
    const result = await api.get(
      `query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${process.env.APIKEY}`
    );
    if (result.data) {
      if (result.data["Note"]) {
        return res.status(400).json({
          error:
            'You are using a free key, with a limit of 5 '+
            'requests per minute and a limit of 500 requests per day, wait and try again.',
        });
      } else {
        if (result.data["Global Quote"].hasOwnProperty("01. symbol")) {
          return res.json({
            name: stock_name,
            lastPrice: Number.parseFloat(
              result.data["Global Quote"]["05. price"]
            ),
            pricedAt: new Date(
              result.data["Global Quote"]["07. latest trading day"]
            ).toISOString(),
          });
        } else {
          return res
            .status(400)
            .json({ error: `Invalid Stock Name ${stock_name}` });
        }
      }
    } else {
      return res
        .status(400)
        .json({ error: `Invalid Stock Name ${stock_name}` });
    }
  } catch (err) {
    return res.status(400).json({ error: `Server Internal Error` });
  }
};

/*
  /stocks/:stock_name/compare - Compara uma ação com uma ou mais ações
  Parâmetros:
    {
      "stocks": [<string>, <string>, ...]
    }

  Retorno:
    {
      "lastPrices": [<lastPrice>, <lastPrice>...]
    }

  Onde lastPrice é um objeto com o seguinte formato:
    {
      "name": string,
      "lastPrice": number,
      "pricedAt": string // data e hora no formato ISO 8601, UTC
    }
*/
const compare = async (req, res) => {
  try {
    const { stock_name } = req.params;
    const { stocks } = req.body;
    const requests = [];
    const listPrices = [];
    let hasError = "";

    stocks.push(stock_name);
    stocks.forEach((stock) => {
      requests.push(
        api.get(
          `query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${process.env.APIKEY}`
        )
      );
    });

    const result = await Promise.all(requests);
    result.some((item, index) => {
      if (item.data.hasOwnProperty("Note")) {
        hasError = item.data.Note;
        return true;
      } else {
        if (item.data["Global Quote"].hasOwnProperty("01. symbol")) {
          listPrices.push({
            name: item.data["Global Quote"]["01. symbol"],
            lastPrice: Number.parseFloat(
              item.data["Global Quote"]["05. price"]
            ),
            pricedAt: new Date(
              item.data["Global Quote"]["07. latest trading day"]
            ).toISOString(),
          });
        }
      }
    });
    if (hasError.length == 0) {
      return res.json({ listPrices: listPrices });
    } else {
      return res.status(400).json({
        error: 'You are using a free key, with a limit of 5 '+
          'requests per minute and a limit of 500 requests per day, wait and try again.',
      });
    }
  } catch (err) {
    return res.status(400).json({ error: `Server Internal Error` });
  }
};


/*
  /stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string> - Projeta ganhos com compra em uma data específica
  Parametros:
  stock_name - parâmetro passado na URI indicando o nome da ação Exemplo (PETR4.SA, VALE5.SA)
  purchasedAmount - number com o número de ações
  purchasedAt - string com data de compra em formato ISO 8601

  Retorno:
    {
      "name": string,
      "purchasedAmount": number,
      "purchasedAt": string, // data em formato ISO 8601,
      "priceAtDate": number, // preço na data de compra
      "lastPrice": number,   // preço mais recente
      "capitalGains": number // ganhos ou perdas com a ação, em reais
    }
*/
const gains = async (req, res) => {
  try {
    const { stock_name } = req.params;
    const { purchasedAmount, purchasedAt } = req.query;

    const result = await api.get(
      `query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=${process.env.APIKEY}`
    );
    if (result.data) {
      if (result.data["Error Message"]) {
        return res
          .status(400)
          .json({ error: `Invalid Stock Name ${stock_name}` });
      } else {
        if (result.data["Note"]) {
          return res.status(400).json({
            error: 'You are using a free key, with a limit of 5 requests per minute and a limit '+
             'of 500 requests per day, wait and try again.',
          });
        } else {
          if (result.data["Time Series (Daily)"][purchasedAt] != undefined) {
            const priceAtDate = Number.parseFloat(
              result.data["Time Series (Daily)"][purchasedAt]["4. close"]
            );
            const lastPrice = Number.parseFloat(
              result.data["Time Series (Daily)"][
                Object.keys(result.data["Time Series (Daily)"])[0]
              ]["4. close"]
            );
            const capitalGains =
              Number.parseFloat(purchasedAmount) * lastPrice -
              Number.parseFloat(purchasedAmount) * priceAtDate;
            return res.json({
              name: stock_name,
              purchasedAmount,
              purchasedAt,
              priceAtDate,
              lastPrice,
              capitalGains,
            });
          } else {
            return res.status(400).json({
              error: `Price on purchase date ${purchasedAt} for stock was not found ${stock_name}`,
            });
          }
        }
      }
    } else {
      return res
        .status(400)
        .json({ error: `Invalid Stock Name ${stock_name}` });
    }
  } catch (err) {
    return res.status(400).json({ error: `Server Internal Error` });
  }
};



/*
  /stocks/:stock_name/history?from=<string>&to=<string> - Retorna preço histórico da ação num intervalo inclusivo
  Parametros:
  stock_name - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
  from - string com data em formato ISO 8601
  to - string com data em format ISO 8601

  Retorno:
    {
      "name": string,
      "prices": [<pricing>, <pricing>, ...]
    }

  Onde prices é um objeto com o seguinte formato:
    {
      "opening": number,
      "low": number,
      "high": number,
      "closing": number,
      "pricedAt": string // data no formato ISO 8601, UTC
    }
*/
const history = async (req, res) => {
  try {
    const { stock_name } = req.params;
    const { from, to } = req.query;
    const filteredList = [];
    const result = await api.get(
      `query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=${process.env.APIKEY}`
    );
    if (result.data) {
      if (result.data["Error Message"]) {
        return res
          .status(400)
          .json({ error: `Invalid Stock Name ${stock_name}` });
      } else {
        if (result.data["Note"]) {
          return res.status(400).json({
            error: 'You are using a free key, with a limit of 5 requests per minute and a limit '+
             'of 500 requests per day, wait and try again.',
          });
        } else {
          const startDate = new Date(from);
          const endDate = new Date(to);

          const stocksData = result.data["Time Series (Daily)"];
          Object.keys(stocksData).filter((item) => {
            const vDate = new Date(item);
            if (vDate >= startDate && vDate <= endDate) {
              filteredList.push({
                opening: stocksData[item]["1. open"],
                low: stocksData[item]["3. low"],
                high: stocksData[item]["2. high"],
                closing: stocksData[item]["4. close"],
                pricedAt: item,
              });
            }
          });
          return res.json({ name: stock_name, prices: filteredList });
        }
      }
    } else {
      return res.json({ error: `Invalid Stock Name ${stock_name}` });
    }
  } catch (err) {
    return res.status(400).json({ msg: `Server Internal Error` });
  }
};

module.exports = { quote, compare, gains, history };
