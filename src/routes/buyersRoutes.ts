import bodyParser from "koa-bodyparser";
import {
  getAllSellersController,
  getCatalogSellerController,
  createCatalogOrder,
} from "../controllers/buyersController";
import { verifyToken } from "../middleware";
const route = require("koa-router");
const buyerRouter = new route();

buyerRouter.prefix("/api/buyer");

buyerRouter.get("/", verifyToken, getAllSellersController);
buyerRouter.get("/seller_catalog/:seller_id", getCatalogSellerController);
buyerRouter.post(
  "/create_catalog_order",
  verifyToken,
  bodyParser(),
  createCatalogOrder
);

export default buyerRouter;
