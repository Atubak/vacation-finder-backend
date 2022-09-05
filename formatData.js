const fs = require("fs");

//taking data from wikidata and formatting it to have a category prop and turning the coordinate prop into an array

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

  const formatted = parsedRawData.map(({ geo, itemLabel, item }) => {
    const coordinates = geo
      .slice(6)
      .slice(0, -1)
      .split(" ")
      .map((coordinate) => parseFloat(coordinate));

    return {
      wikiId: item.slice(31),
      name: itemLabel,
      cat: fileName,
      long: coordinates[0],
      lat: coordinates[1],
    };
  });

  //remove duplicates
  const dubs = [];

  const noDubs = formatted.filter((loc) => {
    const dub = dubs.includes(loc.wikiId);
    if (dub) return false;
    dubs.push(loc.wikiId);
    return true;
  });

  console.log(fileName, noDubs.length);

  const stringifiedData = JSON.stringify(noDubs, null, 2);
  fs.writeFileSync(`./data/formattedData/${fileName}.json`, stringifiedData);
});

console.log("::::::::::::::::::finish formatting data:::::::::::::::::");
