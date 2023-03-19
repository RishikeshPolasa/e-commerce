const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = process.env;
const secretKey = process.env.SECRET_KEY || "9090";
async function verifyToken(ctx: any, next: any) {
  try {
    if (!ctx.header.token) {
      throw new Error("Token should not be empty");
    }
    const bearerHeader = ctx.get("token");
    const token = ctx.request.header.token.split(" ")[1];
    ctx.state.jwtPayload = jwt.verify(token, secretKey);
    await next();
  } catch (error: any) {
    ctx.status = 401;
    ctx.body = error;
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
