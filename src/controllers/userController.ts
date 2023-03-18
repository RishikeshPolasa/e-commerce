import { signupService, ValidUser } from "../services/userServices";
import { generateToken } from "../middleware";
const userSingupController = async (ctx: any) => {
  try {
    const { name, email_id, password } = ctx.request.body;
    if (!email_id || !password || !name) {
      throw new Error("All feilds are required");
    }
    const res = await signupService(email_id, password, name);
    ctx.body = res;
    ctx.status = 200;
  } catch (error: any) {
    ctx.body = error;
    ctx.status = error.statusCode;
  }
};

const userLoginController = async (ctx: any) => {
  try {
    const { emailId, password } = ctx.request.body;
    if (!emailId || !password) {
      throw new Error("All feilds are required");
    }
    const res = await ValidUser(emailId, password);
    const accessToken = generateToken(res[0]);
    ctx.body = {
      name: res[0].name,
      emaild: res[0].id,
      Token: accessToken,
    };
    ctx.status = 201;
  } catch (error: any) {
    ctx.error = error;
    ctx.status = 400;
  }
};

export { userSingupController, userLoginController };
