const koa = require("koa");
import buyerRouter from "../routes/buyersRoutes";
import userRouter from "../routes/userRoutes";
import sellerRouter from "../routes/SellerRoutes";

function createServer() {
  const app = new koa();
  app
    .use(buyerRouter.routes())
    .use(buyerRouter.allowedMethods())
    .use(userRouter.routes())
    .use(userRouter.allowedMethods())
    .use(sellerRouter.routes())
    .use(sellerRouter.allowedMethods());

  return app;
}

export default createServer;
