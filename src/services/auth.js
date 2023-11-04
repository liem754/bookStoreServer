import db from "../models";
import bcrypt from "bcrypt";
const { Op } = require("sequelize");

import jwt from "jsonwebtoken";
import { sendMail2 } from "../ultils/sendMail";
const makeToken = require("uniqid");
const asyncHandler = require("express-async-handler");

const hashPassword = (pw) => bcrypt.hashSync(pw, bcrypt.genSaltSync(8));
export const register = ({ name, email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email },
        // defaults: {
        //   name,
        //   password: hashPassword(password),
        //   email,
        // },
      });
      if (user) {
        resolve({
          mes: "Email đã được sử dụng",
        });
      } else {
        const token = makeToken();

        const newUser = await db.User.create({
          email: btoa(email) + "@" + token,
          name,
          password: hashPassword(password),
        });
        if (newUser) {
          const html = `<h2>Register code:</h2> <br /> <blockquote>${token}</blockquote>`;
          await sendMail2({
            email,
            html,
            subject: "Hoàn tất đăng ký Digital Technology",
          });
        }
        setTimeout(async () => {
          await db.User.destroy({
            where: {
              email: {
                [Op.like]: `${Buffer.from(email).toString("base64")}@${token}`,
              },
            },
          });
        }, 5 * 60 * 1000);
        resolve({
          err: 0,
          // mes: response[1] ? "Register is success!" : "Email has used!",
          mes: "vui long check mail",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
export const finalRegister = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const notActive = await db.User.findOne({
        where: {
          email: {
            [Op.regexp]: `${token}$`,
          },
        },
      });
      if (notActive) {
        const decodedEmail = Buffer.from(
          notActive.email.split("@")[0],
          "base64"
        ).toString("ascii");
        notActive.email = decodedEmail;
        await notActive.save();
      }
      resolve({
        success: notActive ? true : false,
        mes: notActive
          ? "Register is successfully!!.Please login now!"
          : "Something went wrong",
      });
    } catch (error) {
      reject(error);
    }
  });
export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true,
      });
      const isChecked =
        response && bcrypt.compareSync(password, response.password);

      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role: response.role,
            },
            process.env.JWT_KEY,
            { expiresIn: "20s" }
          )
        : null;

      resolve({
        err: token ? 0 : 1,
        mes: token
          ? "Login is success!"
          : response
          ? "Password is wrong!"
          : "Email not used!!!",
        data: response,
        access_token: token ? `Bearer ${token}` : null,
      });
    } catch (error) {
      reject(error);
    }
  });
