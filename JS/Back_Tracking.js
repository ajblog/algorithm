// Given a set of distinct integers, find all possible subsets (the power set) of the set. A subset can include any number of elements from the original set, including the empty set.

// Example:
// If the input set is [1, 2, 3], the output should be:

// css
// Copy code
// [  [],
//   [1],
//   [2],
//   [3],
//   [1, 2],
//   [1, 3],
//   [2, 3],
//   [1, 2, 3]
// ]

function backtrackSubsets(nums, start, currSubset, result) {
  // Add the current subset to the result
  result.push([...currSubset]);

  // Explore further elements to include in the subset
  for (let i = start; i < nums.length; i++) {
    // Include nums[i] in the current subset
    currSubset.push(nums[i]);

    // Recurse to build the subset further
    backtrackSubsets(nums, i + 1, currSubset, result);

    // Backtrack: remove the last element added
    currSubset.pop();
  }
}

function generateSubsets(nums) {
  const result = [];
  backtrackSubsets(nums, 0, [], result);
  return result;
}

// // Example usage:
// const nums = [1, 2, 3];
// const subsets = generateSubsets(nums);
// console.log(subsets);

// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// Example 1:

// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
// Example 2:

// Input: n = 1
// Output: ["()"]
function generateParenthesis(n) {
  const result = [];

  function backtrack(current, open, close) {
    // If the current string has reached the maximum length (2 * n), add it to the result
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    // If the number of open parentheses is less than n, we can add an open parenthesis
    if (open < n) {
      backtrack(current + "(", open + 1, close);
    }

    // If the number of close parentheses is less than open, we can add a close parenthesis
    if (close < open) {
      backtrack(current + ")", open, close + 1);
    }
  }

  // Start the backtracking process with an empty string and 0 open and close parentheses
  backtrack("", 0, 0);

  return result;
}

console.log(generateParenthesis(3)); // Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]

// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

// Example 1:

// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// Example 2:

// Input: nums = [0,1]
// Output: [[0,1],[1,0]]
// Example 3:

// Input: nums = [1]
// Output: [[1]]

var permute = function (nums) {
  const result = [];
  const n = nums.length;
  const used = Array(n).fill(false);
  const path = [];

  function backtrack() {
    // Base case: if path has all numbers, push a copy to result
    if (path.length === n) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < n; i++) {
      if (used[i]) continue; // skip already used numbers
      path.push(nums[i]);
      used[i] = true;

      backtrack(); // recurse

      // backtrack
      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
};

// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

// The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

// Example 1:

// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.
// Example 2:

// Input: candidates = [2,3,5], target = 8
// Output: [[2,2,2,2],[2,3,3],[3,5]]
// Example 3:

// Input: candidates = [2], target = 1
// Output: []
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const result = [];

  function backtrack(start, current, total) {
    // If total hits target → push a copy
    if (total === target) {
      result.push([...current]);
      return;
    }

    // If total exceeds → stop exploring
    if (total > target) return;

    // Explore from index "start" to avoid duplicates
    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);

      // Since unlimited reuse is allowed → pass same index i
      backtrack(i, current, total + candidates[i]);

      // undo choice
      current.pop();
    }
  }

  backtrack(0, [], 0);
  return result;
};
