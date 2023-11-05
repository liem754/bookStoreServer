const blog = require("../controller");
const express = require("express");
const { default: verifyToken } = require("../middlewares/verify_token");
const { isAdmin } = require("../middlewares/verify_role");
const upload = require("../config/cloudinary.config");
const router = express.Router();
router.get("/:bid", blog.getBlogct);
router.post(
  "/",
  { verifyToken, isAdmin },
  upload.single("images"),
  blog.createBlogct
);

router.get("/all", blog.getBlogcts);

module.exports = router;
