import data from "../data/amazon.books.json";
export const insertDB = () =>
  new Promise(async (resolve, reject) => {
    try {
      // const db = Object.keys(data);
      //   d.forEach((item) => {
      //     console.log(data[6]);
      // //   });
      // resolve("ok");
    } catch (error) {
      reject(error);
    }
  });
