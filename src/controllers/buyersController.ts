import { getListOfSellers } from "../services/sellerServices";
import {
  getListofCatalogBySellerId,
  createCatalogOrderService,
} from "../services/buyerServices";
const getAllSellersController = async (ctx: any) => {
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
    ctx.status = error.statusCode;
    ctx.body = error;
  }
};

const getCatalogSellerController = async (ctx: any) => {
  try {
    const sellerId = ctx.params.seller_id;
    const sellerCatalog = await getListofCatalogBySellerId(sellerId);
    ctx.body = sellerCatalog;
    ctx.statusCode = 200;
  } catch (error: any) {
    ctx.status = error.statusCode;
    ctx.body = error;
  }
};

const createCatalogOrder = async (ctx: any) => {
  try {
    const { products } = ctx.request.body;

    const buyerId = ctx.state.userDetails[0].id;
    const res = await createCatalogOrderService(products, buyerId);
    ctx.body = res;
    ctx.statusCode = 201;
  } catch (error: any) {
    ctx.status = error.statusCode;
    ctx.body = error;
  }
};

export {
  getAllSellersController,
  getCatalogSellerController,
  createCatalogOrder,
};
