// N = 1041     10000010001
// N = 32       100000

/**
 * TODO
 * 1. Convert decimal to binary
 *         32/2 = 16
 *         16/2 = 8
 *          8/2 = 4
 *          4/2 = 2
 *          2/2 = 1
 *
 *   32 16 8 4 2 1
 *
 *       1 0 0 1 0
 *
 *  18%2 = 0, 18/2 = 9
 *   9%2 = 1, 9/2 = 4
 *   4%2 = 0, 4/2 = 2
 *   2%2 = 0, 2/2 = 1
 *   1%2 = 1
 *
 * 2. Identify 0's sorrounded by 1
 */

// function dec2bin(num) {
//   return parseInt(binaryAry(num, []).join(''), 10);
// }

// function binaryAry(num, ary) {
//   ary.unshift(num % 2);
//   const nextNum = parseInt(num / 2, 10);
//   if (nextNum > 1) {
//     binaryAry(nextNum, ary);
//   } else {
//       ary.unshift(nextNum);
//   }
//   return ary;
// }

/**
 * num = 9
 *
 * num != 0     num%2       num/2       dec + rem * i
 * -----------------------------------------------------------------------
 * 66561 != 0   66561%2 = 1 9/2 = 4     0 + 1 * 1           =            1
 * 4 != 0       4%2 = 0     4/2 = 2     1 + 0 * 10          =            1
 * 2 != 0       2%2 = 0     2/2 = 1     1 + 0 * 100         =            1
 * 1 != 0       1%2 = 1     1/2 = 0     1 + 1 * 1000        =         1001
 *
 *
 */

function addTwoNum(a, b) {
  if (a > 10000000 || b > 10000000) {
    let excess = 0;
    let maxNum, minNum;
    const finalSum = [];

    maxNum = (a > b ? a : b).toString();
    minNum = (a < b ? a : b).toString();

    const maxNumBase = maxNum.length;
    const minNumBase = minNum.length;

    for (let i = 0; i < maxNumBase - minNumBase; i++) {
      minNum = '0' + minNum;
    }

    for (let i = maxNum.length - 1; i >= 0; i--) {
      const sum =
        excess + parseInt(maxNum[i], 10) + parseInt(minNum[i] || 0, 10);
      excess = parseInt(sum / 10, 10);
      finalSum.unshift(sum % 10);
    }

    return finalSum.join('');
  } 

  return a + b;
}

function dec2bin(num) {
  let dec = 0;
  let rem,
    i = 1;

  while (num != 0) {
    rem = num % 2;
    dec = addTwoNum(dec, rem * i); // BigInt(dec) + BigInt(rem * i);
    i = i * 10;
    num = parseInt(num / 2, 10);
  }

  return dec;
}

function getBinaryGap(num) {
  const binaryGaps = [];

  const indicesOf1 = [];
  let i = 0,
    onesBeginning,
    zeros = 0;

  num = num.toString();

  while (i < num.length) {
    if (num[i] === '1') {
      if (onesBeginning !== undefined) {
        binaryGaps.push(zeros);
        zeros = 0;
      }
      onesBeginning = i;
    }

    if (onesBeginning !== undefined && num[i] === '0') {
      zeros += 1;
    }

    i++;
  }

  return binaryGaps.length > 0 ? Math.max(...binaryGaps) : 0;
}

// console.log(getBinaryGap(dec2bin(18)));
// console.log(getBinaryGap(dec2bin(32)));
// console.log(getBinaryGap(dec2bin(66561)));
// console.log(getBinaryGap(dec2bin(1041)));
// console.log(getBinaryGap(dec2bin(529)));
console.log(getBinaryGap(dec2bin(6291457)));

// addTwoNum(434394,13431);
