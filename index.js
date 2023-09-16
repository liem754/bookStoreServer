const express = require("express");
const cors = require("cors");
require("dotenv").config();
const initRouter = require("./src/routes");
const ConectDB = require("./src/config/conectDatabase");
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouter(app);
ConectDB();
const port = process.env.POST || 8888;
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
