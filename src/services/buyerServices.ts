import { NotFoundError } from "../utilities/error";
import query from "../utilities/sqlConnection";
import { v4 as uuidv4 } from "uuid";
const getListofCatalogBySellerId = async (sellerId: any) => {
  const res = await query("select * from products where seller_id=?", [
    sellerId,
  ]);
  if (res.length == 0) {
    throw new NotFoundError("Seller catalog not found", 404);
  }
  return res;
};

const createCatalogOrderService = async (products: any, buyerId: any) => {
  const orderId = uuidv4();
  const response = await Promise.all(
    products.map(async (product: any) => {
      const { productName, productBrand, productPrice, productId } = product;
      const sellerId = await query(
        "select seller_id from products where id=?",
        [productId]
      );
      return await query(
        "insert into orders (order_id,buyer_id,product_id,product_name,product_price,product_brand,seller_id) values (?,?,?,?,?,?,?)",
        [
          orderId,
          buyerId,
          productId,
          productName,
          productPrice,
          productBrand,
          sellerId[0].seller_id,
        ]
      );
    })
  );
  return response;
};

export { getListofCatalogBySellerId, createCatalogOrderService };
