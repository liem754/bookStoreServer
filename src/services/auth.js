import db from "../models";
export const register = () =>
  new Promise(async (resolve, reject) => {
    try {
      resolve("thanh cong");
    } catch (error) {
      reject(error);
    }
  });
