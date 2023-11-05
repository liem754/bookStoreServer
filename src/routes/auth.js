const auth = require("../controller");
const router = require("express").Router();
router.post("/register", auth.register);
router.put("/final", auth.finalregister);

router.post("/login", auth.login);

export default router;
