const koa = require("koa");
import buyerRouter from "../routes/buyersRoutes";
function createServer() {
  const app = new koa();
  app.use(buyerRouter.routes()).use(buyerRouter.allowedMethods());
  return app;
}

export default createServer;
