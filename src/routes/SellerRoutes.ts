import {
  sellerController,
  createCatalogController,
} from "../controllers/sellerController";
import { verifyToken } from "../middleware";

const route = require("koa-router");
const bodyParser = require("koa-bodyparser");
const sellerRouter = new route();

sellerRouter.get("/buyer/list_of_sellers", verifyToken, sellerController);

sellerRouter.post(
  "/api/seller/create_catalog",
  verifyToken,
  bodyParser(),
  createCatalogController
);

export default sellerRouter;
