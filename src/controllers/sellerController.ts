import {
  createCatalogService,
  getOrdersBySellerId,
} from "../services/sellerServices";
import { ForbiddenError } from "../utilities/error";

const createCatalogController = async (ctx: any) => {
  try {
    const { listOfProducts } = ctx.request.body;
    const userType = ctx.state.userDetails[0].user_type;
    if (userType === "buyer") {
      throw new ForbiddenError("User does not have permission", 403);
    }
    await createCatalogService(ctx, listOfProducts);
    ctx.body = {
      message: "Successfully created catalog",
    };
    ctx.statusCode = 201;
  } catch (error: any) {
    ctx.body = error.message;
    ctx.status = error.statusCode;
  }
};

const getOrdersBySellerIdController = async (ctx: any) => {
  try {
    const sellerId = ctx.state.userDetails[0].id;
    const userType = ctx.state.userDetails[0].user_type;
    if (userType === "buyer") {
      throw new ForbiddenError("user does not have access", 403);
    }
    const orders = await getOrdersBySellerId(sellerId, ctx);
    ctx.body = orders;
    ctx.statusCode = 200;
  } catch (error: any) {
    ctx.body = error.message;
    ctx.status = error.statusCode;
  }
};

export {
  createCatalogController,
  getOrdersBySellerIdController,
};
