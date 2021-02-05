import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "../.env" });

import { Server } from "./server";
const main = async () => {
  const app = new Server();

  await app.listen(9000);
};

main();
