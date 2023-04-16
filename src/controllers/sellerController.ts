import { getListOfSellers } from "../services/sellerServices";

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

export { sellerController };
