const geneCode = (category) => {
  return category
    .split(" ")
    .map((item) => item.charAt(0))
    .join("")
    .toUpperCase();
};
module.exports = geneCode;
