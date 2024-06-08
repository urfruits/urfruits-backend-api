require("dotenv").config();

const Hapi = require("@hapi/hapi");
const routes = require("../server/routes");

(async () => {
  const server = Hapi.server({
    port: 8080,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
      payload: {
        maxBytes: 1000000,
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
})();
