import {
  createCatalogController,
  getOrdersBySellerIdController,
} from "../controllers/sellerController";
import { verifyToken } from "../middleware";

const route = require("koa-router");
const bodyParser = require("koa-bodyparser");
const sellerRouter = new route();

sellerRouter.prefix("/api/seller");

sellerRouter.post(
  "/create_catalog",
  verifyToken,
  bodyParser(),
  createCatalogController
);
sellerRouter.get("/orders", verifyToken, getOrdersBySellerIdController);

export default sellerRouter;
