import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/routes";

export class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan(""));
  }

  routes() {
    this.app.use("/stock", routes);
  }

  async listen(port: Number) {
    await this.app.listen(port);
    console.log("Server run");
  }
}
