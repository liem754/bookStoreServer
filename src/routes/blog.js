import * as blog from "../controller/blog";
import express from "express";
import { isAdmin } from "../middlewares/verify_role";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();
router.get("/:bid", blog.getBlogct);
router.get("/all", blog.getBlogcts);
//
router.use(verifyToken);
router.use(isAdmin);
router.post("/create", upload.single("images"), blog.createBlogct);

export default router;
