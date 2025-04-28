// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

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
var maxDepth = function (root) {
  const dfs = (node, depth) => {
    if (!node) return depth; // Return current depth if node is null
    depth += 1;
    // Calculate the max depth for both subtrees
    return Math.max(dfs(node.left, depth), dfs(node.right, depth));
  };

  return dfs(root, 0);
};

// Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

// Example 1:

// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;

  // Root is the first element in the preorder traversal
  const rootValue = preorder[0];
  const root = new TreeNode(rootValue);

  // Find the root in the inorder traversal to split left and right subtrees
  const rootIndex = inorder.indexOf(rootValue);

  // Recursively build the left and right subtrees
  root.left = buildTree(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );
  root.right = buildTree(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );

  return root;
}

// Given the root of a binary tree, return the number of nodes where the value of the node is equal to the average of the values in its subtree.

// Note:

// The average of n elements is the sum of the n elements divided by n and rounded down to the nearest integer.
// A subtree of root is a tree consisting of root and all of its descendants.
var averageOfSubtree = function (root) {
  // Initialize a counter to keep track of nodes that meet the condition
  let count = 0;

  // Helper function to calculate the sum and count of nodes in a subtree
  function dfs(node) {
    if (!node) {
      // If the node is null, return [sum, count] as [0, 0]
      return [0, 0];
    }

    // Recursively calculate the sum and count for left and right subtrees
    const [leftSum, leftCount] = dfs(node.left);
    const [rightSum, rightCount] = dfs(node.right);

    // Calculate the current sum and count
    const currentSum = leftSum + rightSum + node.val;
    const currentCount = leftCount + rightCount + 1;

    // Calculate the average of the subtree
    const average = Math.floor(currentSum / currentCount);

    // Check if the node's value matches the average
    if (node.val === average) {
      count++;
    }

    // Return the sum and count for the current subtree
    return [currentSum, currentCount];
  }

  // Start DFS traversal from the root
  dfs(root);

  // Return the final count of nodes that meet the condition
  return count;
};
