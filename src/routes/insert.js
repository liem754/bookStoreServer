import * as CT from "../controller";
import express from "express";
const route = express.Router();

//PRIVATE
route.post("/", CT.insertDB);
export default route;
