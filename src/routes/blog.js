const blog = require("../controller");
const express = require("express");
const { isAdmin } = require("../middlewares/verify_role");
const upload = require("../config/cloudinary.config");
const { default: verifyToken } = require("../middlewares/verify_token");
const router = express.Router();
router.get("/:bid", blog.getBlogct);
router.get("/all", blog.getBlogcts);
//very
router.use(verifyToken);
router.use(isAdmin);
router.post("/create", upload.single("images"), blog.createBlogct);

module.exports = router;
