import {
  userSingupController,
  userLoginController,
} from "../controllers/userController";
const route = require("koa-router");
const bodyParser = require("koa-bodyparser");
const userRouter = new route();

userRouter.post("/signup", bodyParser(), userSingupController);
userRouter.post("/login", bodyParser(), userLoginController);
export default userRouter;
