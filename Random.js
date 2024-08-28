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
