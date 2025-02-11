// Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....

// You may assume the input array always has a valid answer.

// Example 1:

// Input: nums = [1,5,1,1,6,4]
// Output: [1,6,1,5,1,4]
// Explanation: [1,4,1,5,1,6] is also accepted.
// Example 2:

// Input: nums = [1,3,2,2,3,1]
// Output: [2,3,1,3,1,2]
function wiggleSort(nums) {
  nums.sort((a, b) => a - b); // Step 1: Sort the array

  let mid = Math.ceil(nums.length / 2); // Midpoint of the array
  let smallHalf = nums.slice(0, mid); // The smaller half
  let largeHalf = nums.slice(mid); // The larger half

  // Step 2: Interleave the halves in reverse order
  for (let i = 0; i < nums.length; i++) {
    // Place elements from the larger half at odd indices and from the smaller half at even indices
    nums[i] = i % 2 === 0 ? smallHalf.shift() : largeHalf.pop();
  }
  return nums;
}

// Given a linked list, swap every two adjacent nodes and return its head.
//  You must solve the problem without modifying the values in the list's nodes
// (i.e., only nodes themselves may be changed.)
var swapPairs = function (head) {
  // If the list is empty or has only one node, return the head
  if (head === null || head.next === null) {
    return head;
  }

  // Initialize a new head with the second node
  let newHead = head.next;

  // Keep track of the current node and the previous node
  let prev = null;
  let current = head;

  // Traverse the list and swap pairs
  while (current !== null && current.next !== null) {
    let nextNode = current.next;
    let nextNext = nextNode.next;

    // Perform the swap
    nextNode.next = current;
    current.next = nextNext;

    // Link the previous node to the swapped pair
    if (prev !== null) {
      prev.next = nextNode;
    }

    // Move to the next pair
    prev = current;
    current = current.next;
  }

  return newHead;
};

// console.log(swapPairs([1, 3, 8, 7]));
// You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a double booking.

// A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).

// The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), the range of real numbers x such that start <= x < end.

// Implement the MyCalendar class:

// MyCalendar() Initializes the calendar object.
// boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a double booking. Otherwise, return false and do not add the event to the calendar.

var MyCalendar = function () {
  this.bookings = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
  let left = 0,
    right = this.bookings.length - 1;

  // Binary search to find the correct insertion point
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const [s, e] = this.bookings[mid];

    if (end <= s) {
      right = mid - 1;
    } else if (start >= e) {
      left = mid + 1;
    } else {
      // Overlap found
      return false;
    }
  }

  // Insert the new booking in the correct position
  this.bookings.splice(left, 0, [start, end]);
  return true;
};

// var obj = new MyCalendar();
// var param_1 = obj.book(10, 20);
// var param_2 = obj.book(15, 25);
// var param_3 = obj.book(20, 30);
// console.log(obj.bookings);

// Given an integer array nums and an integer k,
//  return true if there are two distinct indices i and j in the array
// such that nums[i] == nums[j] and abs(i - j) <= k.
function containsNearbyDuplicate(nums, k) {
  let indexObj = {};
  for (let i = 0; i <= nums.length; i++) {
    if (indexObj.hasOwnProperty(nums[i]) && i - indexObj[nums[i]] <= k) {
      return true;
    }
    indexObj[nums[i]] = i;
  }
  return false;
}

// console.log(containsNearbyDuplicate([1, 2, 1, 1, 2, 3], 2));

// You are given an integer array nums consisting of n elements, and an integer k.

// Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value.
// Any answer with a calculation error less than 10-5 will be accepted.

// Example 1:

// Input: nums = [1,12,-5,-6,50,3], k = 4
// Output: 12.75000
// Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
function findMaxAverage(nums, k) {
  let curSum = 0;
  let maxSum = -Infinity;

  for (let i = 0; i < k; i++) {
    curSum += nums[i];
  }

  maxSum = curSum;

  let i = 0;
  while (i < nums.length - k) {
    curSum = curSum + nums[i + k] - nums[i];
    maxSum = Math.max(maxSum, curSum);
    i += 1;
  }

  return maxSum / k;
}

// console.log(findMaxAverage([5], 1));
// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

// Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

// Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
// Return k.
function removeDuplicates(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let k = 1; // Initialize the count of unique elements to 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k - 1]) {
      nums[k] = nums[i]; // Overwrite the next unique element
      k++;
    }
  }

  return k;
}

// console.log(removeDuplicates([1, 1, 2, 3, 4, 4, 6]));

// An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.
// Given an integer n, return true if n is an ugly number.
function isUgly(n) {
  if (n <= 0) {
    return false;
  }
  while (n % 2 === 0) {
    n /= 2;
  }
  while (n % 3 === 0) {
    n /= 3;
  }
  while (n % 5 === 0) {
    n /= 5;
  }
  return n === 1;
}
// An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

// Given an integer n, return the nth ugly number.
var nthUglyNumber = function (n) {
  let uglyArr = [];
  uglyArr.push(1);
  let p = 0;
  let q = 0;
  let r = 0;
  for (let i = 0; i < n; i++) {
    let two = uglyArr[p] * 2;
    let three = uglyArr[q] * 3;
    let five = uglyArr[r] * 5;
    let min = Math.min(two, three, five);
    uglyArr.push(min);
    if (min === two) p++;
    if (min === three) q++;
    if (min === five) r++;
  }
  return uglyArr[n - 1];
};

// console.log(minSteps(6));
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

function twoSum(nums, target) {
  const indexMap = new Map(); // Initialize the hash map

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    // Check if the complement exists in the hash map
    if (indexMap.has(complement)) {
      return [indexMap.get(complement), i];
    }

    // Store the index of the current element
    indexMap.set(nums[i], i);
  }

  // If no solution is found (though the problem guarantees exactly one solution)
  throw new Error("No two sum solution");
}

// console.log(twoSum([3, 2, 4], 6));

// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
function topKFrequent(nums, k) {
  let freqMap = new Map();
  for (let num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }
  let found = 0;
  let foundArr = [];
  while (found < k) {
    let max = 0;
    let maxKey = 0;
    for (let [key, value] of freqMap) {
      if (value > max) {
        max = value;
        maxKey = key;
      }
    }
    foundArr.push(maxKey);
    freqMap.delete(maxKey);
    found++;
  }
  return foundArr;
}
// console.log(topKFrequent([1, 1, 1, 3, 2, 2], 2));
// Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.

// The integer division should truncate toward zero, which means losing its fractional part. For example, 8.345 would be truncated to 8, and -2.7335 would be truncated to -2.

// Return the quotient after dividing dividend by divisor.

// Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231, 231 − 1]. For this problem, if the quotient is strictly greater than 231 - 1, then return 231 - 1, and if the quotient is strictly less than -231, then return -231.

var divide = function (dividend, divisor) {
  if (dividend === 0) return 0;
  if (divisor === 1) return dividend;
  let abs_dividend = Math.abs(dividend);
  let abs_divisor = Math.abs(divisor);
  let r = 0;
  while (abs_dividend >= abs_divisor) {
    abs_dividend -= abs_divisor;
    r++;
  }
  if (
    ((dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0)) &&
    r != 0
  )
    r = -r;
  return r;
};

// console.log(divide(-2147483648, -1));
// Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.

// Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:

// Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
// Return k.
var removeElement = function (nums, val) {
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      result.push(nums[i]);
    } else {
      nums[i] = null;
    }
  }
  return result;
};
// console.log(removeElement([3, 2, 2, 3], 3));

// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack,
// or -1 if needle is not part of haystack.

// Example 1:

// Input: haystack = "sadbutsad", needle = "sad"
// Output: 0
// Explanation: "sad" occurs at index 0 and 6.
// The first occurrence is at index 0, so we return 0.
var strStr = function (haystack, needle) {
  let result = -1;
  if (needle === "") result = 0;
  for (let i = 0; i < haystack.length; i++) {
    if (haystack.slice(i, i + needle.length) === needle) {
      result = i;
      break;
    }
  }
  return result;
};

// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.Example 1:

// Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
// Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]];
var groupAnagrams = function (strs) {
  function sortString(str) {
    return str.split("").sort().join("");
  }
  let hashedObj = {};
  strs.forEach((item) => {
    let sorted = sortString(item);
    if (hashedObj[sorted]) {
      hashedObj[sorted].push(item);
    } else {
      hashedObj[sorted] = [item];
    }
  });
  return Object.values(hashedObj);
};
// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

// Given an integer array nums, find the
// subarray
//  with the largest sum, and return its sum.

// Example 1:

// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.
var maxSubArray = function (nums) {
  let start = 0;
  let end = 0;
  let curSum = nums[0];
  let newSum = 0;
  for (let i = 0; i <= nums.length - 1; i++) {
    newSum += nums[i];
    if (newSum >= curSum) {
      curSum = newSum;
      start = end;
      end = i;
    }
  }
  if (nums.length === 1) return nums[0];
  return [...nums].splice(start, end + 1).reduce((a, b) => a + b);
};

// You are given a 0-indexed 2D matrix grid of size m x n, where (r, c) represents:

// A land cell if grid[r][c] = 0, or
// A water cell containing grid[r][c] fish, if grid[r][c] > 0.
// A fisher can start at any water cell (r, c) and can do the following operations any number of times:

// Catch all the fish at cell (r, c), or
// Move to any adjacent water cell.
// Return the maximum number of fish the fisher can catch if he chooses his starting cell optimally, or 0 if no water cell exists.

// An adjacent cell of the cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) or (r - 1, c) if it exists.

// Example 1:

// Input: grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]
// Output: 7
// Explanation: The fisher can start at cell (1,3) and collect 3 fish, then move to cell (2,3) and collect 4 fish.
// Example 2:
var findMaxFish = function (grid) {
  let m = grid.length;
  let n = grid[0].length;
  let dp = Array.from({ length: m }, () => Array(n).fill(0));
  let visited = Array.from({ length: m }, () => Array(n).fill(false)); // To track visited cells

  function findIslandSum(i, j) {
    // Boundary check: ensure i and j are within valid bounds and cell is not visited
    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === 0 || visited[i][j])
      return 0;

    // Mark the current cell as visited
    visited[i][j] = true;

    // Sum the current cell value and recursively sum the adjacent cells
    return (
      grid[i][j] +
      findIslandSum(i + 1, j) + // down
      findIslandSum(i - 1, j) + // up
      findIslandSum(i, j + 1) + // right
      findIslandSum(i, j - 1) // left
    );
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        dp[i][j] = 0;
      } else if (
        (i > 0 && dp[i - 1][j] !== undefined && dp[i - 1][j] !== 0) ||
        (j > 0 && dp[i][j - 1] !== undefined && dp[i][j - 1] !== 0)
      ) {
        dp[i][j] = i > 0 ? dp[i - 1][j] : dp[i][j - 1];
      } else {
        dp[i][j] = findIslandSum(i, j);
      }
    }
  }
  let max = -Infinity;
  for (let i = 0; i < m; i++) {
    curMax = Math.max(...dp[i]);
    if (curMax > max) max = curMax;
  }
  return max;
};

// console.log(
//   findMaxFish([
//     [0, 2, 1, 0],
//     [4, 0, 0, 3],
//     [1, 0, 0, 4],
//     [0, 3, 2, 0],
//   ])
// );

var getLucky = function (s, k) {
  let alphMap = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
  };
  s = parseInt(
    s
      .split("")
      .map((char) => alphMap[char])
      .join("")
  );
  let j = s.toString();
  for (let i = 0; i < k; i++) {
    j = j
      .toString()
      .split("")
      .reduce((a, b) => parseInt(a) + parseInt(b));
  }
  return j;
};

// There is a city composed of n x n blocks, where each block contains a single building shaped like a vertical square prism. You are given a 0-indexed n x n integer matrix grid where grid[r][c] represents the height of the building located in the block at row r and column c.

// A city's skyline is the outer contour formed by all the building when viewing the side of the city from a distance. The skyline from each cardinal direction north, east, south, and west may be different.

// We are allowed to increase the height of any number of buildings by any amount (the amount can be different per building). The height of a 0-height building can also be increased. However, increasing the height of a building should not affect the city's skyline from any cardinal direction.

// Return the maximum total sum that the height of the buildings can be increased by without changing the city's skyline from any cardinal direction.
// Input: grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]
// Output: 35
// Explanation: The building heights are shown in the center of the above image.
// The skylines when viewed from each cardinal direction are drawn in red.
// The grid after increasing the height of buildings without affecting skylines is:
// gridNew = [ [8, 4, 8, 7],
//             [7, 4, 7, 7],
//             [9, 4, 8, 7],
//             [3, 3, 3, 3] ]
var maxIncreaseKeepingSkyline = function (grid) {
  let fullSum = 0;
  function findMaxInRowsAndColumns(matrix) {
    let n = matrix.length; // Size of the matrix
    let maxInRows = []; // Array to store maximum values in each row
    let maxInColumns = []; // Array to store maximum values in each column

    // Initialize maxInColumns with the first row's values
    for (let col = 0; col < n; col++) {
      maxInColumns[col] = matrix[0][col];
    }

    // Loop through each row to find max in rows and update max in columns
    for (let row = 0; row < n; row++) {
      let maxInRow = matrix[row][0]; // Start with the first element in the row

      for (let col = 0; col < n; col++) {
        // Update max in row
        if (matrix[row][col] > maxInRow) {
          maxInRow = matrix[row][col];
        }

        // Update max in column
        if (matrix[row][col] > maxInColumns[col]) {
          maxInColumns[col] = matrix[row][col];
        }
      }

      // Store the max value for the current row
      maxInRows.push(maxInRow);
    }

    return { maxInRows, maxInColumns };
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      fullSum +=
        Math.min(
          findMaxInRowsAndColumns(grid).maxInColumns[j],
          findMaxInRowsAndColumns(grid).maxInRows[i]
        ) - grid[i][j];
      grid[i][j] = Math.min(
        findMaxInRowsAndColumns(grid).maxInColumns[j],
        findMaxInRowsAndColumns(grid).maxInRows[i]
      );
    }
  }
  return fullSum;
};

// Given an m x n matrix, return all elements of the matrix in spiral order.

// Example 1:

// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]
var spiralOrder = function (matrix) {
  let m = matrix.length;
  let n = matrix[0].length;
  let result = [];
  let right = n - 1;
  let down = m - 1;
  let left = 0;
  let up = m - 2;
  let i = 0;
  let j = 0;
  while (result.length < m * n) {
    while (j <= right) {
      result.push(matrix[i][j]);
      j++;
    }
    j--;
    i++;
    while (i <= down) {
      result.push(matrix[i][j]);
      i++;
    }
    i--;
    j--;
    while (j >= left) {
      result.push(matrix[i][j]);
      j--;
    }
    j++;
    i--;
    while (i >= up) {
      result.push(matrix[i][j]);
      i--;
    }
    i++;
    j++;
    right--;
    down--;
    left++;
    up--;
  }
  return result.splice(0, m * n);
};

// console.log(
//   spiralOrder([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//   ])
// );

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

// Given head, the head of a linked list, determine if the linked list has a cycle in it.

// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

// Return true if there is a cycle in the linked list. Otherwise, return false.
var hasCycle = function (head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};

var deleteDuplicates = function (head) {
  while (head.next !== null) {
    if (head.val === head.next.val) {
      head.next = head.next.next;
    } else {
      head = head.next;
    }
  }
  return head;
};

// Given the head of a singly linked list, reverse the list, and return the reversed list.
var reverseList = function (head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    // Temporarily store the next node
    let next = current.next;

    // Reverse the current node's pointer
    current.next = prev;

    // Move pointers one position ahead
    prev = current;
    current = next;
  }

  // `prev` will be the new head of the reversed list
  return prev;
};

// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

// Example 1:

// Input: nums = [1,2,3,1]

// Output: true

// Explanation:

// The element 1 occurs at the indices 0 and 3.
var containsDuplicate = function (nums) {
  let hashMap = new Map();
  let ans = false;
  nums.forEach((item) => {
    if (!hashMap.has(item)) hashMap.set(item, "set");
    else ans = true;
    // else return true;
  });
  return ans;
};

// console.log(containsDuplicate([1, 2, 3, 1]));
// Given an array of positive integers nums and a positive integer target, return the minimal length of a
// subarray
//  whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.Example 1:
//
// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.
var minSubArrayLen = function (target, nums) {
  let i = 0;
  let j = 0;
  curSum = nums[0];
  let ans = nums.length;
  let found = false;
  while (i <= j && j < nums.length) {
    console.log("ans", i, j, curSum, ans);
    if (curSum >= target) {
      if (j - i + 1 <= ans) {
        ans = j - i + 1;
        found = true;
      }
      curSum -= nums[i];
      i++;
    } else {
      j++;
      curSum += nums[j];
    }
  }
  if (found) return ans;
  return 0;
};
// Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.

// The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.

// The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.

// Return an array of the k parts.
// Input: head = [1,2,3], k = 5
// Output: [[1],[2],[3],[],[]]
// Explanation:
// The first element output[0] has output[0].val = 1, output[0].next = null.
// The last element output[4] is null, but its string representation as a ListNode is [].
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function (head, k) {
  let nullVisited = false;
  let n = 0;
  while (!nullVisited) {
    if (head.next.value !== null) n++;
    else nullVisited = true;
  }
  nullVisited = false;
  let counter = 0;
  let arr = Array.from({ length: n }, () => []);
  while (!nullVisited) {
    if (counter <= Math.floor(n / k)) {
      arr[Math.floor(n / k)][counter] = head;
      head = head.next;
      counter++;
    }
    if (head.value === null) nullVisited = true;
  }
  return arr;
};

// There is a strange printer with the following two special properties:

// The printer can only print a sequence of the same character each time.
// At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.
// Given a string s, return the minimum number of turns the printer needed to print it.

// Example 1:

// Input: s = "aaabbb"
// Output: 2
// Explanation: Print "aaa" first and then print "bbb".
// Example 2:

// Input: s = "aba"
// Output: 2
// Explanation: Print "aaa" first and then print "b" from the second place of the string, which will cover the existing character 'a'.
var strangePrinter = function (s) {
  const dp = Array.from({ length: s.split("").length }, () => 1);
  let map = new Map();
  let strArray = s.split("");

  if (!s.length) return 0;
  if (s.length === 1) {
    map.set(strArray[0], 0);
    return 1;
  }

  map.set(strArray[0], true);
  let cur = 0;
  for (let i = 1; i < strArray.length; i++) {
    if (strArray[i] === strArray[i - 1] && i > 0) {
      dp[i] = dp[i - 1];
    } else {
      if (!map.has(strArray[i]) || map.get(strArray[i]) < cur) {
        dp[i] = dp[i - 1] + 1;
      } else {
        cur = i;
        dp[i] = dp[i - 1];
      }
    }
    map.set(strArray[i], i);
  }
  return dp[strArray.length - 1];
};

// console.log(strangePrinter("abcabc"));
// Given the string s, return the size of the longest substring containing each vowel an even number of times. That is, 'a', 'e', 'i', 'o', and 'u' must appear an even number of times.

// Example 1:

// Input: s = "eleetminicoworoep"
// Output: 13
// Explanation: The longest substring is "leetminicowor" which contains two each of the vowels: e, i and o and zero of the vowels: a and u.
var findTheLongestSubstring = function (s) {
  let n = s.length;
  let mask = 0;
  let maxLength = 0;
  let m = new Map();
  m.set(0, -1);

  for (let i = 0; i < n; i++) {
    if (s[i] === "a") mask ^= 1 << 0;
    else if (s[i] === "e") mask ^= 1 << 1;
    else if (s[i] === "i") mask ^= 1 << 2;
    else if (s[i] === "o") mask ^= 1 << 3;
    else if (s[i] === "u") mask ^= 1 << 4;

    if (m.has(mask)) {
      maxLength = Math.max(maxLength, i - m.get(mask));
    } else {
      m.set(mask, i);
    }
  }

  return maxLength;
};

// There is a malfunctioning keyboard where some letter keys do not work. All other keys on the keyboard work properly.

// Given a string text of words separated by a single space (no leading or trailing spaces) and a string brokenLetters of all distinct letter keys that are broken, return the number of words in text you can fully type using this keyboard.

// Example 1:

// Input: text = "hello world", brokenLetters = "ad"
// Output: 1
// Explanation: We cannot type "world" because the 'd' key is broken.
/**
 * @param {string} text
 * @param {string} brokenLetters
 * @return {number}
 */
var canBeTypedWords = function (text, brokenLetters) {
  // Split the text into words
  let words = text.split(" ");

  // Create a set for broken letters for O(1) lookup time
  let brokenSet = new Set(brokenLetters);

  // Initialize count for words that can be typed
  let count = 0;

  // Loop through each word
  for (let word of words) {
    let canType = true;

    // Check each character of the word
    for (let char of word) {
      if (brokenSet.has(char)) {
        canType = false;
        break; // If broken letter is found, no need to check further
      }
    }

    // If the word can be typed, increment the count
    if (canType) {
      count++;
    }
  }

  return count;
};

// Given a string s, return true if the s can be palindrome after deleting at most one character from it.

// Example 1:

// Input: s = "aba"
// Output: true
// Example 2:

// Input: s = "abca"
// Output: true
// Explanation: You could delete the character 'c'.
// Example 3:

// Input: s = "abc"
// Output: false
var validPalindrome = function (s) {
  // Helper function to check if a substring is a palindrome
  function isPalindrome(s, left, right) {
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // If characters don't match, check if skipping one of them results in a palindrome
    if (s[left] !== s[right]) {
      // Check by skipping the left character or the right character
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    }
    left++;
    right--;
  }

  // If no mismatches, it's already a palindrome
  return true;
};

// You are given an integer array nums. A subsequence of nums is called a square streak if:

// The length of the subsequence is at least 2, and
// after sorting the subsequence, each element (except the first element) is the square of the previous number.
// Return the length of the longest square streak in nums, or return -1 if there is no square streak.

// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

// Example 1:

// Input: head = [1,2,3,4,5], k = 2
// Output: [2,1,4,3,5]
var reverseKGroup = function (head, k) {
  let allAns = [];
  let items = [];
  while (!!head) {
    if (items.length === k) {
      allAns = allAns.concat([...items].reverse());
      items = [];
    }
    items.push(head);
    head = head.next;
  }
  if (items.length < k) {
    allAns = allAns.concat(items); // Do not reverse incomplete group
  } else {
    allAns = allAns.concat([...items].reverse()); // Otherwise reverse them
  }
  for (let i = 0; i < allAns.length; i++) {
    allAns[i].next = allAns[i + 1];
    if (i === allAns.length - 1) allAns[i].next = undefined;
  }

  return allAns[0];
};

// A fancy string is a string where no three consecutive characters are equal.

// Given a string s, delete the minimum possible number of characters from s to make it fancy.

// Return the final string after the deletion. It can be shown that the answer will always be unique.

// Example 1:

// Input: s = "leeetcode"
// Output: "leetcode"
// Explanation:
// Remove an 'e' from the first group of 'e's to create "leetcode".
// No three consecutive characters are equal, so return "leetcode".

var makeFancyString = function (s) {
  let sArray = s.split("");
  let ans = [sArray[0]];
  let curSimilarCount = 1;
  for (let i = 1; i < sArray.length; i++) {
    if (sArray[i] === sArray[i - 1]) {
      curSimilarCount++;
      if (curSimilarCount === 3) curSimilarCount--;
      else {
        ans.push(sArray[i]);
      }
    } else {
      curSimilarCount = 1;
      ans.push(sArray[i]);
    }
  }
  return ans.join("");
};

// Given a string s of zeros and ones, return the maximum score after splitting the string into two non-empty substrings (i.e. left substring and right substring).

// The score after splitting a string is the number of zeros in the left substring plus the number of ones in the right substring.

// Example 1:

// Input: s = "011101"
// Output: 5
// Explanation:
// All possible ways of splitting s into two non-empty substrings are:
// left = "0" and right = "11101", score = 1 + 4 = 5
// left = "01" and right = "1101", score = 1 + 3 = 4
// left = "011" and right = "101", score = 1 + 2 = 3
// left = "0111" and right = "01", score = 1 + 1 = 2
// left = "01110" and right = "1", score = 2 + 1 = 3
/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
  let totalOnes = s.split("1").length - 1; // Count total number of ones
  let zerosCount = 0;
  let onesCount = 0;
  let bestScore = Number.NEGATIVE_INFINITY; // Use Number.NEGATIVE_INFINITY instead of -Infinity

  // Traverse the string and calculate scores
  [...s].forEach((char, i) => {
    if (i < s.length - 1) {
      // Stop before the last character
      if (char === "0") zerosCount++;
      else onesCount++;

      // Calculate score
      const currentScore = zerosCount + (totalOnes - onesCount);
      bestScore = Math.max(bestScore, currentScore);
    }
  });

  return bestScore;
};

// You are given a 0-indexed integer array nums of length n.

// nums contains a valid split at index i if the following are true:

// The sum of the first i + 1 elements is greater than or equal to the sum of the last n - i - 1 elements.
// There is at least one element to the right of i. That is, 0 <= i < n - 1.
// Return the number of valid splits in nums.

// Example 1:

// Input: nums = [10,4,-8,7]
// Output: 2
// Explanation:
// There are three ways of splitting nums into two non-empty parts:
// - Split nums at index 0. Then, the first part is [10], and its sum is 10. The second part is [4,-8,7], and its sum is 3. Since 10 >= 3, i = 0 is a valid split.
// - Split nums at index 1. Then, the first part is [10,4], and its sum is 14. The second part is [-8,7], and its sum is -1. Since 14 >= -1, i = 1 is a valid split.
// - Split nums at index 2. Then, the first part is [10,4,-8], and its sum is 6. The second part is [7], and its sum is 7. Since 6 < 7, i = 2 is not a valid split.
// Thus, the number of valid splits in nums is 2.
/**
 * @param {number[]} nums
 * @return {number}
 */
var waysToSplitArray = function (nums) {
  let totalSum = nums.reduce((pre, cur) => cur + pre);
  let leftSplit = 0;
  let correctSplits = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    leftSplit += nums[i];
    if (leftSplit >= totalSum - leftSplit) correctSplits++;
  }
  return correctSplits;
};

// Given an array of positive integers nums, return the maximum possible sum of an ascending subarray in nums.

// A subarray is defined as a contiguous sequence of numbers in an array.

// A subarray [numsl, numsl+1, ..., numsr-1, numsr] is ascending if for all i where l <= i < r, numsi  < numsi+1. Note that a subarray of size 1 is ascending.

// Example 1:

// Input: nums = [10,20,30,5,10,50]
// Output: 65
// Explanation: [5,10,50] is the ascending subarray with the maximum sum of 65.
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAscendingSum = function (nums) {
  let curIndex = 0;
  let curSum = nums[0];
  let maxSum = curSum;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] < nums[i]) {
      curSum += nums[i];
      maxSum = Math.max(maxSum, curSum);
    } else {
      curSum = nums[i];
    }
  }
  return maxSum;
};

// Given two strings s and part, perform the following operation on s until all occurrences of the substring part are removed:

// Find the leftmost occurrence of the substring part and remove it from s.
// Return s after removing all occurrences of part.

// A substring is a contiguous sequence of characters in a string.

// Example 1:

// Input: s = "daabcbaabcbc", part = "abc"
// Output: "dab"
// Explanation: The following operations are done:
// - s = "daabcbaabcbc", remove "abc" starting at index 2, so s = "dabaabcbc".
// - s = "dabaabcbc", remove "abc" starting at index 4, so s = "dababc".
// - s = "dababc", remove "abc" starting at index 3, so s = "dab".
// Now s has no occurrences of "abc".
// Example 2:

// Input: s = "axxxxyyyyb", part = "xy"
// Output: "ab"
// Explanation: The following operations are done:
// - s = "axxxxyyyyb", remove "xy" starting at index 4 so s = "axxxyyyb".
// - s = "axxxyyyb", remove "xy" starting at index 3 so s = "axxyyb".
// - s = "axxyyb", remove "xy" starting at index 2 so s = "axyb".
// - s = "axyb", remove "xy" starting at index 1 so s = "ab".
// Now s has no occurrences of "xy".

// Constraints:

// 1 <= s.length <= 1000
// 1 <= part.length <= 1000
// s​​​​​​ and part consists of lowercase English letters.

function removeOccurrences(s, part) {
  let stack = [];
  let partLength = part.length;

  for (let char of s) {
    stack.push(char); // Add character to stack

    // Check if the last characters in the stack match `part`
    if (
      stack.length >= partLength &&
      stack.slice(-partLength).join("") === part
    ) {
      stack.length -= partLength; // Remove last `partLength` characters
    }
  }

  return stack.join(""); // Convert stack back to string
}

// // Example test cases
// console.log(removeOccurrences("daabcbaabcbc", "abc")); // Output: "dab"
// console.log(removeOccurrences("axxxxyyyyb", "xy")); // Output: "ab"

// Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

// Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

// Return k after placing the final result in the first k slots of nums.

// Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

// Custom Judge:

// The judge will test your solution with the following code:

// int[] nums = [...]; // Input array
// int[] expectedNums = [...]; // The expected answer with correct length

// int k = removeDuplicates(nums); // Calls your implementation

// assert k == expectedNums.length;
// for (int i = 0; i < k; i++) {
//     assert nums[i] == expectedNums[i];
// }
// If all assertions pass, then your solution will be accepted.

/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
  let writeIndex = 0; // Where the next valid element should go

  for (let num of nums) {
    // Allow at most two occurrences
    if (writeIndex < 2 || nums[writeIndex - 2] !== num) {
      nums[writeIndex] = num;
      writeIndex++;
    }
  }

  return writeIndex; // Number of valid elements
}

// console.log(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]));
// Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

// Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

// The tests are generated such that there is exactly one solution. You may not use the same element twice.

// Your solution must use only constant extra space.
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let start = 0;
  let end = numbers.length - 1;
  let result = numbers[start] + numbers[end];
  while (result !== target) {
    if (result >= target) end -= 1;
    else start += 1;
    result = numbers[start] + numbers[end];
  }
  return [start + 1, end + 1];
};

console.log(twoSum([2, 3, 4], 6));
