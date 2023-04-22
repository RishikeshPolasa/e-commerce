import {
  getListOfSellers,
  createCatalogService,
} from "../services/sellerServices";
import { ForbiddenError } from "../utilities/error";

const sellerController = async (ctx: any) => {
  try {
    const lists = await getListOfSellers();
    const res = lists.map((list: any) => {
      return {
        id: list.id,
        name: list.name,
      };
    });
    ctx.body = res;
    ctx.statusCode = 200;
  } catch (error: any) {
    ctx.body = error.message;
    ctx.status = error.statusCode;
  }
};

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

export { sellerController, createCatalogController };
