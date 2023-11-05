const express = require("express");
const cors = require("cors");
require("dotenv").config();
const initRouter = require("./src/routes");
const ConectDB = require("./src/config/conectDatabase");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouter(app);
ConectDB();
