const express = require("express");
const { getMean, getMedian, getMode } = require("./math");
const { errorHandling, writeResults } = require("./handle");
const ExpressError = require("./expressErrors");

const app = express();

app.use(express.json());

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
