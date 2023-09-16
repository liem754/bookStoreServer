const user = require("../controller/user");
const router = require("express").Router();
router.post("/", user.register);
module.exports = router;
