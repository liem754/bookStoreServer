import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const hashPassword = (pw) => bcrypt.hashSync(pw, bcrypt.genSaltSync(8));
export const register = ({ name, email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: hashPassword(password),
          name,
        },
      });
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role: response[0].role,
            },
            process.env.JWT_KEY,
            { expiresIn: "2d" }
          )
        : null;

      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register is success!" : "Email has used!",
        token,
      });
    } catch (error) {
      reject(error);
    }
  });
