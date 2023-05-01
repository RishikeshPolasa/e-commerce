require("dotenv").config();
import { v4 as uuidv4 } from "uuid";
import query from "../utilities/sqlConnection";
import { NotFoundError } from "../utilities/error";
const getListOfSellers = async () => {
  const seller = "seller";
  const list = await query("select * from users where user_type=?", [seller]);
  return list;
};

const createCatalogService = async (ctx: any, listOfProducts: any) => {
  const userId = ctx.state.userDetails[0].id;
  const response = await Promise.all(
    listOfProducts.map(async (currentProduct: any) => {
      const product = {
        id: uuidv4(),
        name: currentProduct.name,
        price: currentProduct.price,
        brand: currentProduct.brand,
      };
      return await query(
        "insert into products (id,name,price,seller_id,brand) values (?,?,?,?,?)",
        [product.id, product.name, product.price, userId, product.brand]
      );
    })
  );
  return response;
};

const getOrdersBySellerId = async (sellerId: any, ctx: any) => {
  const orders = await query("select * from orders where seller_id=?", [
    sellerId,
  ]);
  if (orders.length == 0) {
    throw new NotFoundError("No orders for this seller", 404);
  }
  return orders;
};

export { getListOfSellers, createCatalogService, getOrdersBySellerId };
