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
