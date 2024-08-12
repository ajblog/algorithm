// Given a set of coin denominations and a total amount of money, determine the minimum number of coins needed to make that amount. If it's not possible to make the amount with the given coins, return -1.

// Example:
// Input:
// Coins: [1, 2, 5]
// Amount: 11
// Output:
// 3 (because 11 = 5 + 5 + 1)

function findMinCoins(coisArr, amount) {
  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= dp.length; i++) {
    coisArr.forEach((item) => {
      if (i >= item) {
        dp[i] = Math.min(dp[i], dp[i - item] + 1);
      }
    });
  }
}

// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps.
// In how many distinct ways can you climb to the top?
//
// Example:
// Input: n = 4
// Output: 5
// Explanation: There are 5 ways to climb to the top:
// 1 step + 1 step + 1 step + 1 step
// 1 step + 1 step + 2 steps
// 1 step + 2 steps + 1 step
// 2 steps + 1 step + 1 step
// 2 steps + 2 steps

function distinctStep(steps) {
  let dp = new Array(steps + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= steps; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[steps];
}

// Given an integer array nums,
// return the length of the longest strictly increasing subsequence.
//
// Example:
// Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]
// Output: 4
// Explanation: The longest increasing subsequence is [2, 3, 7, 101], so its length is 4.

function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;

  // Initialize the dp array with 1s
  let dp = new Array(nums.length).fill(1);

  // Fill the dp array
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // The length of the longest increasing subsequence
  return Math.max(...dp);
}

// Example usage
// const nums = [3, 4, 5, 1, 2, 8];
// console.log(lengthOfLIS(nums));  // Correct Output: 4

// You are given a 2D grid grid of size n x m, where each cell contains a positive integer. Your task is to find the maximum path sum from the top-left corner (cell (0,0)) to the bottom-right corner (cell (n-1,m-1)).

// You can only move to the right or down from any given cell.

// Example:
// plaintext
// Copy code
// Input:
// grid = [
//     [5, 3, 2, 1],
//     [1, 7, 1, 2],
//     [4, 6, 5, 3],
//     [2, 3, 2, 6]
// ]

// Explanation:
// The path with the maximum sum is 5 → 3 → 7 → 6 → 5 → 3 → 6, and the sum is 28.

function findMaxPathSumDP(arr, n, m) {
  let dp = Array.from({ length: n }, () => Array(m).fill(0));

  dp[0][0] = arr[0][0];

  // Fill the first row
  for (let j = 1; j < m; j++) {
    dp[0][j] = dp[0][j - 1] + arr[0][j];
  }

  // Fill the first column
  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0] + arr[i][0];
  }

  // Fill the rest of the dp array
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = arr[i][j] + Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  return dp;
}

// There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

// Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

// The test cases are generated so that the answer will be less than or equal to 2 * 109.
function uniquePaths(m, n) {
  let dp = Array.from({ length: m }, () => Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}

// console.log(uniquePaths(3, 2));
