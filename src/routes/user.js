import * as CT from "../controller";
import express from "express";
import { isAdmin } from "../middlewares/verify_role";
import verifyToken from "../middlewares/verify_token";
const upload = require("../config/cloudinary.config");

const route = express.Router();
route.use(verifyToken);
route.post("/update", CT.updateCart);
route.get("/carts", CT.getCarts);
route.put("/", CT.deleteCart);
route.post("/mail", CT.contact);
route.put("/update", upload.single("avatar"), CT.updateUser);

//PRIVATE
// route.use(verifyToken);
route.get("/", CT.getCurrent);

export default route;
