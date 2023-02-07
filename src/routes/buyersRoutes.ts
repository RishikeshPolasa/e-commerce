import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { getAllSellers } from "../controllers/buyersController";
const route = require("koa-router");
const buyerRouter = new route();

buyerRouter.prefix("/api/buyer");

buyerRouter.get("/", getAllSellers);

export default buyerRouter;
