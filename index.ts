require("dotenv").config({ path: "./configs/.env" });
import createServer from "./src/utilities/server";
const port = process.env.PORT || 3000;
const app = createServer();

app.on("error", (err: any) => {
  console.error("server error", err);
});

app.listen(port, function (error: any) {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log("Server is listening at port : " + port);
  }
});
