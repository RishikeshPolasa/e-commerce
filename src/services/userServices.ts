require("dotenv").config();
import query from "../utilities/sqlConnection";
const bcrypt = require("bcryptjs");
import { v4 as uuidv4 } from "uuid";
import { AuthorizationError, ForbiddenError } from "../utilities/error";
import { comparePassword, generateToken } from "../middleware";
const signupService = async (email_id: any, password: any, name: any) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: uuidv4(),
    name,
    email_id,
    password: encryptedPassword,
    type: "buyer",
  };
  const token = generateToken(user);
  await query(
    "insert into users (id,name,email_id,password,user_type) values (?,?,?,?,?)",
    [user.id, user.name, user.email_id, user.password, user.type]
  );
  return {
    user: user.name,
    email: user.email_id,
    token: token,
  };
};
const ValidUser = async (emailId: any, password: any) => {
  const user = await query("select * from users where email_id = ?", [emailId]);
  if (!user[0]) {
    throw new AuthorizationError("No user exists!", 401);
  }
  let isValidPassword = await comparePassword(password, user[0].password);
  if (!isValidPassword) {
    throw new ForbiddenError("Password does not match", 403);
  }
  return user;
};
export { signupService, ValidUser };
