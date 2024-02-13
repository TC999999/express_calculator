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

module.exports = { getMean, getMedian, getMode };
