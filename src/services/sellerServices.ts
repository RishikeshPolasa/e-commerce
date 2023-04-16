require("dotenv").config();
import query from "../utilities/sqlConnection";
const getListOfSellers = async () => {
  const seller = "seller";
  const list = await query("select * from users where user_type=?", [seller]);
  return list;
};

export { getListOfSellers };
