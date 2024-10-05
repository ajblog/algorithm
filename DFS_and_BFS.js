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
