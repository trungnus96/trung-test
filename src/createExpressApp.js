// constants
const { BUGSNAG_API_KEY, BUGSNAG_RELEASE_STAGE } = require("./constants/bugsnag_server");

const Bugsnag = require("@bugsnag/js");
const BugsnagPluginExpress = require("@bugsnag/plugin-express");

Bugsnag.start({
  apiKey: BUGSNAG_API_KEY,
  plugins: [BugsnagPluginExpress],
  releaseStage: BUGSNAG_RELEASE_STAGE,
});

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");

function createExpressApp() {
  const app = express();

  const bugsnag_middleware = Bugsnag.getPlugin("express");

  // This must be the first piece of middleware in the stack.
  // It can only capture errors in downstream middleware
  app.use(bugsnag_middleware.requestHandler);

  /* all other middleware and application routes go here */

  // This handles any errors that Express catches
  app.use(bugsnag_middleware.errorHandler);

  // cors
  app.use(cors());
  // logger
  app.use(logger("dev"));
  // helmet, compression, body-parser
  // support parsing of application/json
  app.use(bodyParser.json());
  //support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: true }));

  return app;
}

module.exports = createExpressApp;
