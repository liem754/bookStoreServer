const upload = require("../config/cloudinary.config");
const { default: verifyToken } = require("../middlewares/verify_token");
const CT = require("../controller");
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

module.exports = route;
