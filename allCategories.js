const fs = require("fs");

const allCategories = fs
  .readdirSync("./data/formattedData")
  .map((cat) => cat.replace(/\.json$/, ""));

console.log(allCategories);
