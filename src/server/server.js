require("dotenv").config();

const Hapi = require("@hapi/hapi");
const routes = require("../server/routes");
const loadModel = require("../services/loadModel");

(async () => {
  const server = Hapi.server({
    port: 8080,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
      payload: {
        maxBytes: 10000000,
      },
    },
  });

  const model = await loadModel();
  server.app.model = model;

  server.route(routes);

  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
})();
