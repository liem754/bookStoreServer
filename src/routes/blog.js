const blog = require("../controller");
const express = require("express");
const { default: verifyToken } = require("../middlewares/verify_token");
const { isAdmin } = require("../middlewares/verify_role");
const upload = require("../config/cloudinary.config");
const router = express.Router();
router.get("/:bid", blog.getBlogct);
router.get("/all", blog.getBlogcts);

router.use(verifyToken);
router.use(isAdmin);
router.post("/", upload.single("images"), blog.createBlogct);

module.exports = router;
