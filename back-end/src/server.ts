import { app } from "./app/app";
// var app = require('./app/app');
import { config } from "./app/app.config";
// var config = require('./app/app.config');
import { database } from "./app/app.database";
// var database = require('./app/app.database');

console.log("Starting application ...");

database.connect(async () => {
  const srv = app.init(config.server.port);
});
