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
    inorder.slice(0, rootIndex),
  );
  root.right = buildTree(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1),
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

// Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

// Example 1:

// Input: nums = [-10,-3,0,5,9]
// Output: [0,-3,9,-10,null,5]
// Explanation: [0,-10,5,null,-3,null,9] is also accepted:

// Example 2:

// Input: nums = [1,3]
// Output: [3,1]
// Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  const buildTree = (left, right) => {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const node = new TreeNode(nums[mid]);

    node.left = buildTree(left, mid - 1);
    node.right = buildTree(mid + 1, right);

    return node;
  };

  return buildTree(0, nums.length - 1);
};

// You are given the root of a binary tree containing digits from 0 to 9 only.

// Each root-to-leaf path in the tree represents a number.

// For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
// Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

// A leaf node is a node with no children.

// Example 1:

// Input: root = [1,2,3]
// Output: 25
// Explanation:
// The root-to-leaf path 1->2 represents the number 12.
// The root-to-leaf path 1->3 represents the number 13.
// Therefore, sum = 12 + 13 = 25.
// Example 2:
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
var sumNumbers = function (root) {
  function dfs(node, currentSum) {
    if (!node) return 0;

    currentSum = currentSum * 10 + node.val;

    // If it's a leaf, return the final number
    if (!node.left && !node.right) {
      return currentSum;
    }

    // Otherwise, recurse down both subtrees
    return dfs(node.left, currentSum) + dfs(node.right, currentSum);
  }

  return dfs(root, 0);
};

// Given a reference of a node in a connected undirected graph.

// Return a deep copy (clone) of the graph.

// Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

// class Node {
//     public int val;
//     public List<Node> neighbors;
// }

// Test case format:

// For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.

// An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

// The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function (node) {
  if (!node) return null;

  const map = new Map(); // old node -> new node

  const dfs = (n) => {
    if (map.has(n)) return map.get(n);

    const clone = new Node(n.val);
    map.set(n, clone);

    for (const nei of n.neighbors) {
      clone.neighbors.push(dfs(nei));
    }

    return clone;
  };

  return dfs(node);
};

// Given the root of a binary tree, return all root-to-leaf paths in any order.

// A leaf is a node with no children.

// Example 1:

// Input: root = [1,2,3,null,5]
// Output: ["1->2->5","1->3"]
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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  let ans = [];
  let stringInit = `${root.val}`;
  const dfs = (node, curString) => {
    if (node != root) curString += `->${node.val}`;
    if (node.left) {
      dfs(node.left, curString);
    }
    if (node.right) {
      dfs(node.right, curString);
    }
    if (!node.left && !node.right) {
      ans.push(curString);
    }
  };
  dfs(root, stringInit);
  return ans;
};

// Given the root of a complete binary tree, return the number of the nodes in the tree.

// According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

// Design an algorithm that runs in less than O(n) time complexity.
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
var countNodes = function (root) {
  if (!root) return 0;

  const getHeight = (node) => {
    let h = 0;
    while (node) {
      h++;
      node = node.left;
    }
    return h;
  };

  const leftH = getHeight(root.left);
  const rightH = getHeight(root.right);

  if (leftH === rightH) {
    // left subtree is perfect → 2^leftH - 1 nodes + root + right subtree
    return (1 << leftH) + countNodes(root.right);
  } else {
    // right subtree is perfect → 2^rightH - 1 nodes + root + left subtree
    return (1 << rightH) + countNodes(root.left);
  }
};
