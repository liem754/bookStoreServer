import db from "../models";

export const createBlog = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await db.Blog.create({
        title: data?.title,
        description: data?.description,
        images: data.images,
      });

      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Thành Công" : "Thất bại",
      });
    } catch (error) {
      reject(error);
    }
  });
export const getBlog = (bid) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await db.Blog.findOne({
        where: { id: bid },
      });

      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Thành Công" : "Thất bại",
        blog: rs,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getBlogs = ({ page, limit }) =>
  new Promise(async (resolve, reject) => {
    try {
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 4;
      const offset = (pageNumber - 1) * pageSize;
      let filter = {};
      const rs = await db.Blog.findAll({
        where: filter,
        offset: offset,
        limit: pageSize,
      });
      const count = await db.Blog.count({
        where: filter,
      });

      resolve({
        err: rs ? 0 : 1,
        mes: rs ? "Thành Công" : "Thất bại",
        data: rs,
        totalCount: count,
        limit: pageSize,
      });
    } catch (error) {
      reject(error);
    }
  });
