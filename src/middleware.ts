import { AuthorizationError } from "./utilities/error";
import { getUserByEmailId } from "../src/services/userServices";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = process.env.SECRET_KEY || "9090";

async function getUserInfo(decoded: any) {
  const { userId, userName, userEmail } = decoded;
  return {
    userId,
    userName,
    userEmail,
  };
}

async function verifyToken(ctx: any, next: any) {
  const token = ctx.header.token;

  if (!token) {
    ctx.throw(401, "Token should not be empty");
  }

  const jwtToken = token.split(" ")[1];

  try {
    const state = jwt.verify(jwtToken, secretKey);
    const payload = await getUserInfo(state);
    const userDetails = await getUserByEmailId(payload.userEmail).catch(
      (error: any) => {
        if (error.status === 404) {
          throw new AuthorizationError("AuthorizationError", 401);
        }
        throw error;
      }
    );
    ctx.state.jwtPayload = state;
    ctx.state.userDetails = userDetails;
    await next();
  } catch (err: any) {
    const status = err.status || 500; // default to 500 if status is undefined
    const message = err.message || "Internal Server Error";
    ctx.throw(status, message);
  }
}

const generateToken = (user: any) => {
  return {
    token: jwt.sign(
      { userName: user.name, userEmail: user.email_id, userId: user.id },
      secretKey
    ),
  };
};
const comparePassword = async (password: any, hash: any) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error: any) {
    throw new Error();
  }
};

export { verifyToken, generateToken, comparePassword };
