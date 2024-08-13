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