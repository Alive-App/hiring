/* eslint-disable array-callback-return */
const api = require('../utils/api');

module.exports = {
  async actualQuote(req, res) {
    const { symbol } = req.params;

    const response = await api.get(`query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.APIKEY}`);
    const { data } = response;

    if (data.Note) {
      return res.status(429).json({ error: 'Muitos ativos, aguarde 1 minuto para realizar novas consultas' });
    }
    if (data['Global Quote']['01. symbol']) {
      const Quote = {
        name: data['Global Quote']['01. symbol'],
        lastPrice: parseFloat(data['Global Quote']['05. price']),
        pricedAt: new Date(
          data['Global Quote']['07. latest trading day'],
        ).toISOString(),
      };
      return res.json(Quote);
    }

    return res.status(404).json({ error: 'ativo não encontrado' });
  },
  async gainsProjection(req, res) {
    const { symbol } = req.params;
    const { purchasedAmount, purchasedAt, finalDate } = req.query;
    const { data } = await api.get(
      `query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=&apikey=${process.env.APIKEY}`,
    );
    if (data.Note) {
      return res.status(429).json({ error: 'Muitos ativos, aguarde 1 minuto para realizar novas consultas' });
    }

    if (data['Time Series (Daily)'][purchasedAt] && data['Time Series (Daily)'][finalDate] !== undefined) {
      const purchasePriceAtDate = Number.parseFloat(
        data['Time Series (Daily)'][purchasedAt]['4. close'],
      );

      if (finalDate) {
        if (data['Time Series (Daily)'][finalDate
        ]) {
          const priceAtFinalDate = Number.parseFloat(
            data['Time Series (Daily)'][finalDate
            ]['4. close'],
          );

          const gains = purchasedAmount * priceAtFinalDate
                - purchasedAmount * purchasePriceAtDate;
          return res.json({
            name: symbol,
            purchasedAmount,
            purchasedAt: new Date(purchasedAt).toISOString(),
            finalDate: new Date(finalDate).toISOString(),
            purchasePriceAtDate,
            priceAtFinalDate,
            capitalGains: `R$ ${gains}`,
          });
        }
        return res.status(400).json({ error: 'não há dados disponivés para projeções com esta data' });
      }
      const priceAtLastRefreshed = Number.parseFloat(
        data['Time Series (Daily)'][
          Object.keys(data['Time Series (Daily)'])[0]
        ]['4. close'],
      );
      const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
      const gains = purchasedAmount * priceAtLastRefreshed
        - purchasedAmount * purchasePriceAtDate;
      return res.json({
        name: symbol,
        purchasedAmount,
        purchasedAt: new Date(purchasedAt).toISOString(),
        lastRefreshed: new Date(lastRefreshed).toISOString(),
        priceAtDate: purchasePriceAtDate,
        lastPrice: priceAtLastRefreshed,
        capitalGains: `R$ ${gains}`,
      });
    }
    return res.status(400).json({ error: 'Tem certeza que os dados informados estão corretos?' });
  },
  async historical(req, res) {
    const { symbol } = req.params;
    const { from, to } = req.query;
    const { data } = await api.get(
      `query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=&apikey=${process.env.APIKEY}`,
    );
    if (data.Note) {
      return res.status(429).json({ error: 'Muitos ativos, aguarde 1 minuto para realizar novas consultas' });
    }

    if (data['Time Series (Daily)'][from] && data['Time Series (Daily)'][to]) {
      const startDate = new Date(from);
      const endDate = new Date(to);
      const history = [];
      const days = data['Time Series (Daily)'];
      Object.keys(days).map((day) => {
        const valueDate = new Date(day);
        if (valueDate >= startDate && valueDate <= endDate) {
          history.push({
            opening: days[day]['1. open'],
            low: days[day]['3. low'],
            high: days[day]['2. high'],
            closing: days[day]['4. close'],
            pricedAt: new Date(day).toISOString(),
          });
        }
      });
      return res.json({ name: symbol, prices: history });
    }
    return res.status(400).json({ error: 'os dados para estas datas não estão disponiveis' });
  },
  async compare(req, res) {
    const { symbol } = req.params;
    const { stocks } = req.body;
    if (stocks) {
      const data = [];
      const listPrices = [];
      stocks.push(symbol);
      stocks.forEach((stock) => {
        data.push(
          api.get(
            `query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${process.env.APIKEY}`,
          ),
        );
      });
      const response = await Promise.all(data);
      console.log(response);
      response.map((item) => {
        if (item.data.Note) {
          return res.status(400).json({ error: 'Muitos ativos, aguarde 1 minuto para realizar novas consultas' });
        }
        if (item.data['Global Quote']['01. symbol']) {
          listPrices.push({
            name: item.data['Global Quote']['01. symbol'],
            lastPrice: Number.parseFloat(
              item.data['Global Quote']['05. price'],
            ),
            pricedAt: new Date(
              item.data['Global Quote']['07. latest trading day'],
            ).toISOString(),
          });
        } else {
          listPrices.push({ error: 'ativo não encontrado' });
        }
      });

      return res.json(listPrices);
    }
    return res.status(400).json({ error: 'é necessario enviar uma ou mais ações para a  comparação' });
  },
};
