import { Request, Response } from "express";
import api from "../services/api";

export class StockController {
  constructor() {}

  async quote(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { stock_name } = req.params;
      const { data } = await api.get(
        `query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=${process.env.APIKEY}`
      );
      if (data) {
        if (data["Note"]) {
          return res.status(500).json({
            error: "Há problemas com sua chave de requisição",
          });
        } else {
          if (data["Global Quote"].hasOwnProperty("01. symbol")) {
            const quote = {
              name: stock_name,
              lastPrice: Number.parseFloat(data["Global Quote"]["05. price"]),
              pricedAt: new Date(
                data["Global Quote"]["07. latest trading day"]
              ).toISOString(),
            };
            return res.json(quote);
          } else {
            return res.status(400).json({ error: "Erro nos dados informados" });
          }
        }
      } else {
        return res.status(400).json({ error: "Erro nos dados informados" });
      }
    } catch (err) {
      return res.status(500).json({ error: "Erro de resposta do servidor" });
    }
  }
  async gains(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { purchasedAmount, purchasedAt }: any = req.query;
      const { stock_name } = req.params;
      const { data } = await api.get(
        `query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=${process.env.APIKEY}`
      );
      if (data) {
        if (data["Error Message"]) {
          return res.status(400).json({ error: "Erro nos dados informados" });
        } else {
          if (data["Note"]) {
            return res.status(400).json({
              error: "Há problemas com sua chave de requisição",
            });
          } else {
            if (data["Time Series (Daily)"][purchasedAt] != undefined) {
              const priceAtDate = Number.parseFloat(
                data["Time Series (Daily)"][purchasedAt]["4. close"]
              );
              const lastPrice = Number.parseFloat(
                data["Time Series (Daily)"][
                  Object.keys(data["Time Series (Daily)"])[0]
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
                error: "O preço passado não foi encontrado, tente novamente",
              });
            }
          }
        }
      } else {
        return res.status(400).json({ error: "Erro nos dados informados" });
      }
    } catch (err) {
      return res.status(500).json({ error: "Erro de resposta do servidor" });
    }
  }
  async compare(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { stock_name } = req.params;
      const { stocks } = req.body;
      const requests: Array<Object> = [];
      const listPrices: Array<Object> = [];
      let hasError: string = "";

      stocks.push(stock_name);
      stocks.forEach((stock: string) => {
        requests.push(
          api.get(
            `query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${process.env.APIKEY}`
          )
        );
      });

      const response = await Promise.all(requests);
      response.some((item: any): any => {
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
          error: "Há problemas com sua chave de requisição",
        });
      }
    } catch (err) {
      return res.status(400).json({ error: "Erro de resposta do servidor" });
    }
  }
  async history(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { stock_name } = req.params;
      const { from, to }: any = req.query;
      const arrayFilter: Array<Object> = [];
      const { data } = await api.get(
        `query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=full&apikey=${process.env.APIKEY}`
      );
      if (data) {
        if (data["Error Message"]) {
          return res.status(400).json({ error: "Erro nos dados informados" });
        } else {
          if (data["Note"]) {
            return res.status(400).json({
              error: "Há problemas com sua chave de requisição",
            });
          } else {
            const startDate = new Date(from);
            const endDate = new Date(to);
            const stocksData = data["Time Series (Daily)"];
            Object.keys(stocksData).filter((item) => {
              const valueDate = new Date(item);
              if (valueDate >= startDate && valueDate <= endDate) {
                arrayFilter.push({
                  opening: stocksData[item]["1. open"],
                  low: stocksData[item]["3. low"],
                  high: stocksData[item]["2. high"],
                  closing: stocksData[item]["4. close"],
                  pricedAt: item,
                });
              }
            });
            return res.json({ name: stock_name, prices: arrayFilter });
          }
        }
      } else {
        return res.status(400).json({ error: "Erro nos dados informados" });
      }
    } catch (err) {
      return res.status(500).json({ msg: "Erro de resposta do servidor" });
    }
  }
}
