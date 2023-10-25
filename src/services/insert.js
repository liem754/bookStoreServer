import data from "../data/amazon.books.json";
import { dataRole } from "../ultils/data";

export const insertDB = () =>
  new Promise(async (resolve, reject) => {
    try {
      dataRole.forEach(async (item, index) => {
        await db.Role.create({
          code: item.code,
          value: item.value,
        });
      });
      resolve("ok");
    } catch (error) {
      reject(error);
    }
  });
