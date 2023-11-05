const book = require("../controller");
const express = require("express");
const { default: verifyToken } = require("../middlewares/verify_token");
const { isAdmin } = require("../middlewares/verify_role");
const upload = require("../config/cloudinary.config");
const router = express.Router();
router.get("/", book.getBooks);
router.get("/one/:bid", book.getBook);
router.get("/cate/:category", book.getbookbyCategoryct);
router.get("/all", book.getCategory);

// router.get("/all", book.getCategory);
router.post("/rating", verifyToken, book.Ratingct);
router.get("/getrating/:pid", book.getRatingct);

/// verify
router.use(verifyToken);
router.use(isAdmin);
router.post("/", upload.single("images"), book.createBooks);
router.put("/", upload.single("images"), book.updateBook);
router.delete("/", book.deleteBook);

export default router;
