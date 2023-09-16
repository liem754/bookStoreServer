const user = require("../controller");
const router = require("express").Router();
router.post("/register", user.register);
router.post("/login", user.login);

module.exports = router;
