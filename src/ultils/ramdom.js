const { MD5 } = require("crypto-js");

export const stringToRandomNumber = (inputString) => {
  const hash = MD5(inputString).toString();
  return hash;
};
// console.log(stringToRandomNumber("hello"));
