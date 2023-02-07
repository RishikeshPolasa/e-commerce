const getAllSellers = (ctx: any) => {
  try {
    ctx.body = "All sellers";
    ctx.statusCode = 200;
  } catch (error: any) {
    ctx.status = error.statusCode;
    ctx.body = error;
  }
};

export { getAllSellers };
