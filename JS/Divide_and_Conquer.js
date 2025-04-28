//QUESTION1
// Given an array of integers,
// find the maximum difference between two elements
// such that the larger element appears after the smaller element in the array.
// Solve this problem using a divide and conquer approach.

// Example:
// Input: [2, 3, 10, 6, 4, 8, 1]

// Output: 8 (The maximum difference is between 10 and 2)

// Input: [7, 9, 5, 6, 3, 2]

// Output: 2 (The maximum difference is between 9 and 7)

const findMaxInArray = (arr) => {
  max = -Infinity;
  arr.forEach((item) => {
    if (item > max) max = item;
  });
  return max;
};

const findMinInArray = (arr) => {
  min = Infinity;
  arr.forEach((item) => {
    if (item < min) min = item;
  });
  return min;
};

function maxDiffernece(arr) {
  if (arr.length === 0 || arr.length === 1) return 0;

  const leftMax = maxDiffernece(arr.slice(0, Math.floor(arr.length + 1) / 2));
  const rightMax = maxDiffernece(
    arr.slice(Math.floor(arr.length + 1) / 2, arr.length)
  );
  const crossMax =
    findMaxInArray(arr.slice(Math.floor(arr.length + 1) / 2, arr.length)) -
    findMinInArray(arr.slice(0, Math.floor(arr.length + 1) / 2));

  return Math.max(leftMax, rightMax, crossMax);
}

// console.log(maxDiffernece([7, 9, 5, 6, 3, 2]));

//QUESTION2
// Question:
// Given an array of integers, find the maximum sum of a contiguous subarray
// using a divide and conquer approach.

// Example:
// Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]

// Output: 6 (The maximum sum is for the subarray [4, -1, 2, 1])

// Input: [1, 2, 3, 4, 5]

// Output: 15 (The maximum sum is for the subarray [1, 2, 3, 4, 5])

function findMaxSubArraySum(arr) {
  function findCrossMax(arr, mid) {
    let leftSum = -Infinity;
    let sum = 0;
    for (let i = mid; i >= 0; i--) {
      sum += arr[i];
      if (sum > leftSum) leftSum = sum;
    }

    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid + 1; i < arr.length; i++) {
      sum += arr[i];
      if (sum > rightSum) rightSum = sum;
    }

    return leftSum + rightSum;
  }

  if (arr.length === 1) return arr[0];

  const mid = Math.floor(arr.length / 2);

  const leftMax = findMaxSubArraySum(arr.slice(0, mid));
  const rightMax = findMaxSubArraySum(arr.slice(mid));

  const crossMax = findCrossMax(arr, mid - 1);

  return Math.max(leftMax, rightMax, crossMax);
}

// console.log(findMaxSubArraySum([-3, 6, 2]));

//QUESTION3
// Given a list of n integers, write a function to find the k-th
// smallest element in the list using a divide and conquer approach.

// Example:
// Input: arr = [7, 10, 4, 3, 20, 15], k = 3

// Output: 7 (The 3rd smallest element in the list is 7)

// Input: arr = [7, 10, 4, 3, 20, 15], k = 4

// Output: 10 (The 4th smallest element in the list is 10)

function partition(arr, low, high) {
  let pivot = arr[low];
  let i = low;
  let j = high;

  while (i < j) {
    // Move `i` to the right until an element greater than the pivot is found
    while (arr[i] <= pivot && i < high) {
      i++;
    }
    // Move `j` to the left until an element less than the pivot is found
    while (arr[j] > pivot && j > low) {
      j--;
    }
    // Swap elements at i and j if they haven't crossed
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // Swap pivot with element at j
  [arr[low], arr[j]] = [arr[j], arr[low]];

  return j; // Return the index of the pivot
}

function getKthSmallest(arr, k) {
  function quickSelect(arr, low, high, k) {
    if (low <= high) {
      let pivotPosition = partition(arr, low, high);

      if (pivotPosition === k) {
        return arr[pivotPosition];
      } else if (pivotPosition > k) {
        return quickSelect(arr, low, pivotPosition - 1, k);
      } else {
        return quickSelect(arr, pivotPosition + 1, high, k);
      }
    }
    return -1;
  }

  return quickSelect(arr, 0, arr.length - 1, k - 1);
}

// console.log(getKthSmallest([3, 2, -10, 1], 3));

// Question
//given an array of integers, find the number of sequesnces with total sum of each less than "t"
//Remember to check the sliding window method!!!

function crossCountSequences(arr, mid, t) {
  let i = mid - 1;
  let j = mid;
  let count = 0;
  let sum = arr[i] + arr[j];
  while (i >= 0 && j < arr.length) {
    if (sum < t) {
      count += 1;
    }
    if (arr[i - 1] < arr[j + 1]) {
      i--;
      sum += arr[i];
    } else {
      j++;
      sum += arr[j];
    }
  }
  return count;
}

function countSmallerThanTSequences(arr, t) {
  if (arr.length === 0) return;
  if (arr.length === 1) {
    if (arr[0] < t) return 1;
    else return 0;
  }
  let mid = Math.floor(arr.length / 2);
  let left = countSmallerThanTSequences(arr.slice(0, mid), t);
  let right = countSmallerThanTSequences(arr.slice(mid), t);
  let crossCount = crossCountSequences(arr, mid, t);
  return left + right + crossCount;
}

// You are given an array of integers representing the stock prices on different days.
//  Write a function to find the maximum profit you can achieve by buying and selling the stock.
//  You are allowed to complete at most one transaction (i.e., buy one and sell one share of the stock),
// but you must buy before you sell. Use a divide and conquer approach to solve this problem.

// Example:
// makefile
// Copy code
// Input: prices = [7, 1, 5, 3, 6, 4]
// Output: 5

// Input: prices = [7, 6, 4, 3, 1]
// Output: 0

function findMaxProfitHelper(arr, mid) {
  let minPrice = Infinity;
  for (let i = 0; i < mid; i++) {
    if (arr[i] <= minPrice) minPrice = arr[i];
  }
  let maxPrice = -Infinity;
  for (let i = mid; i < arr.length; i++) {
    if (arr[i] >= maxPrice) maxPrice = arr[i];
  }
  return maxPrice - minPrice;
}

function findMaxProfit(arr) {
  let profit = 0;
  if (arr.length === 0 || arr.length === 1) {
    return 0;
  } else if (arr.length === 2) {
    profit = arr[1] - arr[0];
  }
  let mid = Math.floor(arr.length / 2);
  let leftMax = findMaxProfit(arr.slice(0, mid));
  let rightMax = findMaxProfit(arr.slice(mid));
  let crossProfit = findMaxProfitHelper(arr, mid);

  profit = Math.max(leftMax, rightMax, crossProfit);

  if (profit <= 0) {
    return 0;
  }
  return profit;
}
