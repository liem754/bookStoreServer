const auth = require("./auth");
const user = require("./user");

const insert = require("./insert");
const book = require("./book");
const blog = require("./blog");

const initRouter = (app) => {
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/user", user);
  app.use("/api/v1/insert", insert);
  app.use("/api/v1/book", book);
  app.use("/api/v1/blog", blog);

  return app.use("/", (req, res) => {
    res.send("This route not defined!");
  });
};
module.exports = initRouter;
