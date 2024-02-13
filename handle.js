const fs = require("fs");
const ExpressError = require("./expressErrors");

function writeResults(obj, req) {
  if (req.query.save && req.query.save == "true") {
    let date = new Date();
    let dateStr = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    let newObj = { ...obj.response, timestamp: dateStr };
    let json = JSON.stringify(newObj);

    fs.writeFile("results.json", json, "utf8", (err) => {
      if (err) {
        console.log(err);
        process.kill(1);
      }
    });
  }
}

function errorHandling(req) {
  if (!req.query.nums) {
    throw new ExpressError("numbers are required", 400);
  }
  const nums = req.query.nums;
  let numArr = nums.split(",");
  for (let num of numArr) {
    if (isNaN(parseFloat(num))) {
      throw new ExpressError(`${num} is not a number`, 400);
    }
  }
  return numArr;
}

module.exports = { writeResults, errorHandling };
