require("dotenv").config();
import { v4 as uuidv4 } from "uuid";
import query from "../utilities/sqlConnection";
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

export { getListOfSellers, createCatalogService };
