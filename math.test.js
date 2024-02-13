const { getMean, getMedian, getMode } = require("./math");

describe("Operations of an even length array", function () {
  let numArr;
  let numArr2;
  let numArr3;
  let numArr4;
  beforeEach(function () {
    numArr = [56, 98, 75, 37, 107, 411, 13, 3];
    numArr2 = [78, 23, 49, 12, 33, 9];
    numArr3 = [41, 63, 96, 5, 84, 27, 38, 19, 75, 32];
    numArr4 = [4, 3, 7, 5, 1, 2, 3, 6, 2, 3];
  });

  test("get the mean", function () {
    const mean = getMean(numArr);
    const mean2 = getMean(numArr2);
    const mean3 = getMean(numArr3);
    const mean4 = getMean(numArr4);
    expect(mean).toBe(100);
    expect(mean2).toBe(34);
    expect(mean3).toBe(48);
    expect(mean4).toBe(3.6);
  });

  test("get the median", function () {
    const median = getMedian(numArr);
    const median2 = getMedian(numArr2);
    const median3 = getMedian(numArr3);
    const median4 = getMedian(numArr4);
    expect(median).toBe(65.5);
    expect(median2).toBe(28);
    expect(median3).toBe(39.5);
    expect(median4).toBe(3);
  });

  test("get the mode", function () {
    const mode = getMode(numArr4);
    expect(mode).toBe("3");
  });
});

describe("Operations of an odd length array", function () {
  let numArr;
  let numArr2;
  let numArr3;
  let numArr4;
  beforeEach(function () {
    numArr = [21, 49, 78, 65, 92];
    numArr2 = [34, 2, 76, 47, 52, 64, 12];
    numArr3 = [57, 23, 46];
    numArr4 = [6, 9, 3, 4, 2, 2, 4, 6, 3, 4, 1];
  });

  test("get the mean", function () {
    const mean = getMean(numArr);
    const mean2 = getMean(numArr2);
    const mean3 = getMean(numArr3);
    const mean4 = getMean(numArr4);
    expect(mean).toBe(61);
    expect(mean2).toBe(41);
    expect(mean3).toBe(42);
    expect(mean4).toBe(4);
  });

  test("get the median", function () {
    const median = getMedian(numArr);
    const median2 = getMedian(numArr2);
    const median3 = getMedian(numArr3);
    const median4 = getMedian(numArr4);
    expect(median).toBe(65);
    expect(median2).toBe(47);
    expect(median3).toBe(46);
    expect(median4).toBe(4);
  });

  test("get the mode", function () {
    const mode = getMode(numArr4);
    expect(mode).toBe("4");
  });
});
