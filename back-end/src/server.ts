const app = require("app/app");
const config = require("app/app.config");
const database = require("app/app.database");

console.log("Starting application ...");

database.database.connect(async () => {
  const srv = app.app.init(config.config.server.port);
});
