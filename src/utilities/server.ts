const koa = require("koa");
import buyerRouter from "../routes/buyersRoutes";
import userRouter from "../routes/userRoutes";
function createServer() {
  const app = new koa();
  app
    .use(buyerRouter.routes())
    .use(buyerRouter.allowedMethods())
    .use(userRouter.routes())
    .use(userRouter.allowedMethods());

  return app;
}

export default createServer;
