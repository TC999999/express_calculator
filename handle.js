const fs = require("fs");
const ExpressError = require("./expressErrors");

function writeResults(response, save) {
  if (save && save == "true") {
    let date = new Date();
    let dateStr = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    let newObj = { response, timestamp: dateStr };
    let json = JSON.stringify(newObj);

    fs.writeFile("results.json", json, "utf8", (err) => {
      if (err) {
        console.log(err);
        process.kill(1);
      }
    });
  }
}

function errorHandling(numList) {
  if (!numList) {
    throw new ExpressError("numbers are required", 400);
  }
  let numArr = numList.split(",");
  for (let num of numArr) {
    if (isNaN(parseFloat(num))) {
      throw new ExpressError(`${num} is not a number`, 400);
    }
  }
  return numArr;
}

module.exports = { writeResults, errorHandling };
