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
