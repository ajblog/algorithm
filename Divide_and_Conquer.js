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

// Sure! Here's another interesting divide and conquer question
// that is similar in difficulty to the previous one:

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

// Given a list of n integers, write a function to find the k-th
// smallest element in the list using a divide and conquer approach.

// Example:
// Input: arr = [7, 10, 4, 3, 20, 15], k = 3

// Output: 7 (The 3rd smallest element in the list is 7)

// Input: arr = [7, 10, 4, 3, 20, 15], k = 4

// Output: 10 (The 4th smallest element in the list is 10)
