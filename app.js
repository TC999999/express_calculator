const express = require("express");
const fs = require("fs");
const ExpressError = require("./expressErrors");

const app = express();

app.use(express.json());

function getMean(numArr) {
  let total = 0;
  let div = numArr.length;
  for (let num of numArr) {
    num = parseFloat(num);
    total += num;
  }
  return total / div;
}

function getMedian(numArr) {
  let sortedArr = numArr.sort(function (a, b) {
    return a - b;
  });
  let sortedNumArr = sortedArr.map((val) => {
    return parseFloat(val);
  });
  let len = sortedArr.length;
  let median;
  if (len % 2 == 0) {
    median = (sortedNumArr[len / 2 - 1] + sortedNumArr[len / 2]) / 2;
  } else {
    median = sortedNumArr[(len + 1) / 2 - 1];
  }
  return median;
}

function getMode(numArr) {
  let freqObj = {};
  let maxFreq = 0;
  for (let num of numArr) {
    if (freqObj.hasOwnProperty(num)) {
      freqObj[num] += 1;
    } else {
      freqObj[num] = 1;
    }
    if (freqObj[num] > maxFreq) {
      maxFreq = freqObj[num];
    }
  }

  let modeArr = [];
  for (let num in freqObj) {
    if (freqObj[num] == maxFreq) {
      modeArr.push(num);
    }
  }

  if (modeArr.length == 1) {
    return modeArr[0];
  } else {
    return modeArr;
  }
}

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

app.get("/", (req, res) => {
  return res.send(
    "Calculator! Type mean, median, mode, or all to get the proprerty of a list of numbers in the query string"
  );
});

app.get("/mean", (req, res, next) => {
  try {
    let numArr = errorHandling(req);
    let mean = String(getMean(numArr));
    const meanObj = {
      response: { operation: "mean", values: numArr, mean: mean },
    };
    writeResults(meanObj, req);
    return res.send(meanObj);
  } catch (e) {
    next(e);
  }
});

app.get("/median", (req, res, next) => {
  try {
    let numArr = errorHandling(req);
    let median = String(getMedian(numArr));
    let medianObj = {
      response: { operation: "median", values: numArr, median: median },
    };
    writeResults(medianObj, req);
    return res.send(medianObj);
  } catch (e) {
    next(e);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    let numArr = errorHandling(req);
    let modeArr = getMode(numArr);
    let modeObj = {
      response: { operation: "mode", values: numArr, mode: modeArr },
    };
    writeResults(modeObj, req);
    return res.send(modeObj);
  } catch (e) {
    next(e);
  }
});

app.get("/all", (req, res, next) => {
  try {
    let numArr = errorHandling(req);
    let mean = String(getMean(numArr));
    let median = String(getMedian(numArr));
    let mode = getMode(numArr);
    let allObj = {
      response: {
        operation: "all",
        values: numArr,
        mean: mean,
        median: median,
        mode: mode,
      },
    };
    writeResults(allObj, req);
    return res.send(allObj);
  } catch (e) {
    next(e);
  }
});

app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404);
  next(e);
});

app.use((error, req, res, next) => {
  let status = error.status || 500;
  let message = error.msg;
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
