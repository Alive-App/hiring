import express from "express";

const routes = express.Router();

import { StockController } from "../controllers/StockController";

const stockController = new StockController();

routes.get("/:stock_name/quote", stockController.quote);
routes.post("/:stock_name/compare", stockController.compare);
routes.get("/:stock_name/gains", stockController.gains);
routes.get("/:stock_name/history", stockController.history);

export default routes;
