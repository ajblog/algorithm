// Given the root of a Binary Search Tree (BST),
// return the minimum absolute difference between the values of any two different nodes in the tree.
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
  let prev = null;
  let minDiff = Infinity;

  // Helper function to perform in-order traversal
  const inorderTraversal = (node) => {
    if (!node) return;

    // Traverse left subtree
    inorderTraversal(node.left);

    // If this is not the first node, calculate the difference
    if (prev !== null) {
      minDiff = Math.min(minDiff, node.val - prev);
    }

    // Update previous node to the current node's value
    prev = node.val;

    // Traverse right subtree
    inorderTraversal(node.right);
  };

  // Start the in-order traversal from the root
  inorderTraversal(root);

  return minDiff;
};

// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

// Note that the same word in the dictionary may be reused multiple times in the segmentation.

// Example 1:

// Input: s = "leetcode", wordDict = ["leet","code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".
// Example 2:

// Input: s = "applepenapple", wordDict = ["apple","pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
// Note that you are allowed to reuse a dictionary word.
// Example 3:

// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: false

// Constraints:
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const mapDict = new Map();
  const memo = new Map(); // added memoization
  wordDict.forEach((item) => {
    mapDict.set(item, true);
  });

  function rec(word) {
    if (word.length === 0) return true;
    if (memo.has(word)) return memo.get(word); // reuse result

    let breakPointWord = "";

    for (let i = 0; i < word.length; i++) {
      breakPointWord += word[i];
      if (mapDict.has(breakPointWord)) {
        if (rec(word.slice(i + 1))) {
          memo.set(word, true);
          return true;
        }
      }
    }

    memo.set(word, false);
    return false;
  }

  return rec(s);
};
