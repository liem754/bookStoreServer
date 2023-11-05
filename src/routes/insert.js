const express = require("express");

const route = express.Router();
const CT = require("../controller");
//PRIVATE
route.post("/", CT.insertDB);
module.exports = route;
