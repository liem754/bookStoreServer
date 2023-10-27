import db from "../models";
import { stringToRandomNumber } from "../ultils/ramdom";
import { sendMail, sendMail2 } from "../ultils/sendMail";
export const getOne = (uid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: uid },
        attributes: {
          exclude: ["password", "role"],
        },
        include: [
          {
            model: db.Role,
            as: "roleData",
            attributes: ["id", "value", "code"],
          },
        ],
      });
      resolve({
        err: response ? 0 : -1,
        mes: response ? "OK!" : "not user!",
        userData: response ? response : null,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateCarts = (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const alreadyCart = await db.Cart.findOne({
        where: { product: parseInt(data.pid) },
      });

      if (!alreadyCart) {
        const rs = await db.Cart.create({
          product: parseInt(data.pid),
          price: data.price,
          quantity: +data.quantity,
          userId: id,
        });
        resolve({
          success: rs ? true : false,
          mes: rs ? "Đã Thêm Vào Giỏ Hàng!" : "Some thing went wrong!",
        });
      } else {
        const rss = await db.Cart.update(
          {
            price: data.price,
            quantity: +data.quantity,
          },
          { where: { product: parseInt(data.pid) } }
        );
        resolve({
          success: rss ? true : false,
          mes: rss ? "Cập Nhập Giỏ Hàng Thành Công!" : "Some thing went wrong!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const getCarts = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await db.Cart.findAll({
        where: { userId: parseInt(id) },
        attributes: ["id", "price", "quantity"],
        include: [
          {
            model: db.Book,
            as: "book",
            attributes: ["id", "title", "images", "author"],
          },
        ],
      });
      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Thành Công" : "Thất bại",
        carts: rs,
      });
    } catch (error) {
      reject(error);
    }
  });
export const deleteCart = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await db.Cart.destroy({
        where: { id: pid },
      });
      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Thành Công" : "Thất bại",
        carts: rs,
      });
    } catch (error) {
      reject(error);
    }
  });
export const contact = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = {
        email: payload.email,
        html: payload.messege,
        subject: `Tài khoản ${payload.email} gửi liên hệ`,
      };
      const data2 = {
        email: payload.email,
        html: `Liên hệ của bạn đã được chúng tôi ghi nhận,cảm ơn bạn vì đã phản hồi!!`,
        subject: "Phản hồi từ CuaHangSach",
      };
      const rs = await sendMail(data);
      const rss = await sendMail2(data2);
      resolve({
        err: rs && rss ? 0 : -1,
        mes: rs && rss ? "Thành Công" : "Thất bại",
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateUser = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await db.User.update(
        {
          name: payload.name,
          email: payload.email,
          avatar: payload.avatar,
        },
        {
          where: { id },
        }
      );
      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Thành Công" : "Thất bại",
        rs,
      });
    } catch (error) {
      reject(error);
    }
  });
