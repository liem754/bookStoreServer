import jwt from "jsonwebtoken";
import { handleNotAuth } from "./handle_error";
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return handleNotAuth("Require authorization", res);
  const accesstoken = token.split(" ")[1];
  jwt.verify(accesstoken, process.env.JWT_KEY, (err, user) => {
    if (err) return handleNotAuth("Access token expired", res);
    console.log(user);
    req.user = user;
    next();
  });
};
export default verifyToken;
