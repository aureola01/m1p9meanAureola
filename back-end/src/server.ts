// @ts-ignore
import * as app from "./app/app";
import * as config from "./app/app.config";
import * as database from "./app/app.database";

console.log("Starting application ...");

database.database.connect(async () => {
  const srv = app.app.init(config.config.server.port);
});
