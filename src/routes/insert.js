import * as CT from "../controller";
import express from "express";
const route = express.Router();

//PRIVATE
route.get("/", CT.insertDB);
export default route;
