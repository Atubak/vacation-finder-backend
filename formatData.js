const fs = require("fs");

//get the names of all jsonfiles in rawdata folder
const listOfFiles = fs.readdirSync("./data/rawData", { withFileTypes: false });
//take off extension
const pureNames = listOfFiles.map((file) => file.slice(0, -5));
console.log(pureNames);

//in a forEach method of pureNames, import a .json with readfilesync and format the data to have correct coordinates in an array and correct category name
//output a separate new .json file for each category into formattedData/

pureNames.forEach((fileName) => {
  const rawData = fs.readFileSync(`./data/rawData/${fileName}.json`);
  const parsedRawData = JSON.parse(rawData);

  const formatted = parsedRawData.map((el) => {
    return {
      ...el,
      category: fileName,
      geo: el.geo
        .slice(6)
        .slice(0, -1)
        .split(" ")
        .map((coordinate) => parseFloat(coordinate)),
    };
  });

  console.log(fileName, formatted.length);

  const stringifiedData = JSON.stringify(formatted, null, 2);
  fs.writeFileSync(`./data/formattedData/${fileName}.json`, stringifiedData);
});

console.log("::::::::::::::::::finish formatting data:::::::::::::::::");
