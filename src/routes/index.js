const { handleNotFound } = require("../middlewares/handle_error");
import auth from "./auth";
import user from "./user";
import insert from "./insert";
import book from "./book";
const initRouter = (app) => {
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/user", user);
  app.use("/api/v1/insert", insert);
  app.use("/api/v1/book", book);

  app.use(handleNotFound);
};
module.exports = initRouter;
