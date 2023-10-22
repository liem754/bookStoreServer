export const generateCode = (value) => {
  let output = "";
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .forEach((element) => {
      output += element.charAt(0) + element.charAt(1);
    });
  return output.toUpperCase() + value.length;
};
