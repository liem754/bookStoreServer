const db = require("../models");
const { Op, literal } = require("sequelize");
const geneCode = require("../ultils/geneCode");
const createBook = (data, id) =>
  new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      await db.Book.create({
        title: data?.title,
        author: data?.author,
        category: data?.category,
        publicationYear: data?.publicationYear,
        description: data?.description,
        price: data?.price,
        quantity: data?.quantity,
        images: data?.images,
        userId: id,
      });
      await db.Category.findOrCreate({
        where: { code: geneCode(data?.category) },
        defaults: {
          code: geneCode(data?.category),
          value: data?.category,
        },
      });
      resolve({
        err: 0,
        mes: "Ok",
      });
    } catch (error) {
      reject(error);
    }
  });
const getBooks = ({ page, limit, category, q }) =>
  new Promise(async (resolve, reject) => {
    try {
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 4;
      const offset = (pageNumber - 1) * pageSize;

      const filter = {};
      if (category) {
        filter.category = {
          [Op.substring]: category,
        };
      }

      if (q) {
        filter.title = {
          [Op.substring]: q,
        };
      }
      console.log(filter);
      const books = await db.Book.findAll({
        where: filter,
        limit: pageSize,
        offset: offset,
      });

      const totalCount = await db.Book.count({
        where: filter,
      });

      resolve({
        err: books ? 0 : -1,
        data: books,
        page: pageNumber,
        limit: pageSize,
        totalCount: totalCount,
      });
    } catch (error) {
      reject(error);
    }
  });
const getBook = (bid) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await db.Book.findOne({
        where: { id: parseInt(bid) },

        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        ],
      });
      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Ok" : "Failed",
        book: rs ? rs : null,
      });
    } catch (error) {
      reject(error);
    }
  });
const deleteBook = (bid) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await db.Book.destroy({
        where: { id: bid },
      });
      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Ok" : "Failed",
      });
    } catch (error) {
      reject(error);
    }
  });
const updateBook = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await db.Book.update(
        {
          title: data.title,
          author: data.author,
          category: data.category,
          description: data.description,
          publicationYear: data.publicationYear,
          price: data.price,
          quantity: data.quantity,
          images: data.images,
        },
        {
          where: { id: data.bid },
        }
      );
      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Ok" : "Failed",
      });
    } catch (error) {
      reject(error);
    }
  });

const getCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await db.Category.findAll({
        attributes: ["id", "code", "value"],
      });
      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Ok" : "Failed",
        categorys: rs ? rs : null,
      });
    } catch (error) {
      reject(error);
    }
  });
const getbookbyCategory = (category) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await db.Book.findAll({
        where: { category },
      });
      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Ok" : "Failed",
        data: rs,
      });
    } catch (error) {
      reject(error);
    }
  });
const Rating = (data, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const alreadyCart = await db.Rating.findOne({
        where: { userId: id, product: data.pid },
      });
      if (!alreadyCart) {
        const rs = await db.Rating.create({
          product: parseInt(data.pid),
          comment: data.comment,
          star: +data.star,
          userId: id,
        });
        resolve({
          success: rs ? true : false,
          mes: rs ? "Đánh giá thành công!" : "Some thing went wrong!",
        });
      } else {
        const rss = await db.Rating.update(
          {
            comment: data.comment,
            star: +data.star,
          },
          { where: { userId: parseInt(id) } }
        );
        resolve({
          success: rss ? true : false,
          mes: rss ? "Cập Nhập Đánh Giá Thành Công!" : "Some thing went wrong!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
export const getRatings = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await db.Rating.findAll({
        where: { product: pid },
        include: [
          {
            model: db.User,
            as: "userData",
            attributes: ["id", "name", "email", "avatar"],
          },
        ],
      });

      resolve({
        err: rs ? 0 : -1,
        mes: rs ? "Thành công" : "Thất bại",
        ratings: rs ? rs : null,
      });
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
  getCategory,
  getbookbyCategory,
  Rating,
  getRatings,
};
