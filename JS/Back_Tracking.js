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
