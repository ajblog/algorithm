// You are given a list of coin denominations and a target amount of money.
// Your task is to determine the minimum number of coins needed to make up that amount using the given denominations.
// You can assume that you have an unlimited supply of each type of coin.
// Input: coins = [1, 2, 5], amount = 11
// Output: 3

// Explanation: The minimum number of coins needed to make 11 is 3 (5 + 5 + 1).

// Input: coins = [2], amount = 3
// Output: -1

// Explanation: It is not possible to make the amount 3 with only coin of denomination 2.

function minCoins(coinsArr, amount) {
  let numberOfCoins = 0;
  let currentSum = 0;
  coinsArr.sort((a, b) => a - b);
  while (currentSum < amount) {
    let maxCoin = coinsArr[coinsArr.length - 1];
    if (currentSum + maxCoin <= amount) {
      currentSum += maxCoin;
      numberOfCoins++;
      console.log(numberOfCoins, currentSum, coinsArr);
    } else {
      coinsArr.pop();
    }
  }
  if (currentSum === amount) {
    return numberOfCoins;
  } else return -1;
}

// console.log(minCoins([1, 2, 5], 11)); //3

// Description:
// You are given a set of activities, each with a start time and an end time. Your goal is to select the maximum number of activities that don't overlap.

// Input:
// An array of tuples where each tuple represents an activity with a start time and an end time. For example: [(1, 4), (3, 5), (0, 6), (5, 7), (8, 9)].
// Output:
// A list of selected activities such that no two selected activities overlap, and the number of selected activities is maximized.
// Example:
// Given the activities [(1, 4), (3, 5), (0, 6), (5, 7), (8, 9)], one optimal solution is:
// (1, 4)
// (5, 7)
// (8, 9)

function activitySelection(activities) {
  // Sort activities based on end times
  activities.sort((a, b) => a[1] - b[1]);
  console.log(activities);
  let selectedActivities = [];
  let lastEndTime = -1;

  for (let activity of activities) {
    let [start, end] = activity;
    // If this activity starts after the last selected one ends, select it
    if (start > lastEndTime) {
      selectedActivities.push(activity);
      lastEndTime = end;
    }
  }

  return selectedActivities;
}

// console.log(
//   activitySelection([
//     [1, 4],
//     [3, 5],
//     [0, 6],
//     [5, 7],
//     [8, 9],
//   ])
// );

// There are n
//  digital panels placed in a straight line. Each panel can show any digit from 0
//  to 9
// . Initially, all panels show 0
// .

// Every second, the digit shown by each panel increases by 1
// . In other words, at the end of every second, a panel that showed 9
//  would now show 0
// , a panel that showed 0
//  would now show 1
// , a panel that showed 1
//  would now show 2
// , and so on.

// When a panel is paused, the digit displayed on the panel does not change in the subsequent seconds.

// You must pause exactly one of these panels, at any second you wish. Then, the panels adjacent to it get paused one second later, the panels adjacent to those get paused 2
//  seconds later, and so on. In other words, if you pause panel x
// , panel y
//  (for all valid y
// ) would be paused exactly |x−y|
//  seconds later.

// For example, suppose there are 4
//  panels, and the 3
// -rd panel is paused when the digit 9
//  is on it.

// The panel 1
//  pauses 2
//  seconds later, so it has the digit 1
// ;
// the panel 2
//  pauses 1
//  second later, so it has the digit 0
// ;
// the panel 4
//  pauses 1
//  second later, so it has the digit 0
// .
// The resulting 4
// -digit number is 1090
// . Note that this example is not optimal for n=4
// .

// Once all panels have been paused, you write the digits displayed on them from left to right, to form an n
//  digit number (it can consist of leading zeros). What is the largest possible number you can get? Initially, all panels show 0
// .

// Input
// Each test case consists of a single line containing a single integer n
//  (1≤n≤2⋅105
// ).

// It is guaranteed that the sum of n
//  over all test cases does not exceed 2⋅105
// .

// Output
// For each test case, print the largest number you can achieve, if you pause one panel optimally.

// Example
// InputCopy
// 1
// 2
// OutputCopy
// 9
// 98

function largestPausedNumber(n) {
  let result = "";
  if (n === 1) {
    result += "9";
  } else {
    result += "98";
    for (let i = 0; i < n - 2; i++) {
      result += `${(i + 9) % 10}`;
    }
  }
  return result;
}

// console.log(largestPausedNumber(10));
// Problem: Weighted Job Scheduling
// You are given n jobs, where each job has a start time, an end time, and a profit associated with it. You need to schedule the jobs in such a way that you maximize the total profit while ensuring that no two jobs overlap.

// You can either select a job or skip it, but if you select it, you cannot select any other job that overlaps with it.

// Example:
// plaintext
// Copy code
// Input:
// jobs = [
// { start: 1, end: 3, profit: 50 },
// { start: 2, end: 5, profit: 20 },
// { start: 4, end: 6, profit: 70 },
// { start: 6, end: 7, profit: 60 },
// { start: 5, end: 8, profit: 30 },
// { start: 7, end: 9, profit: 40 }
// ]

// Output:
// 220

//greedy method can't support the non consecutive job schedulings
function findOptimumJobsSchedule(jobsArr) {
  let finalResult = 0;
  let startTime = 0;
  let finishTime = 0;
  jobsArr.sort(
    (a, b) => b.profit / (b.end - b.start) - a.profit / (a.end - a.start)
  );
  startTime = jobsArr[0].start;
  finishTime = jobsArr[0].end;
  finalResult += jobsArr[0].profit;
  jobsArr.forEach((job, index) => {
    if (index > 0) {
      if (job.start >= finishTime) {
        finalResult += job.profit;
        finishTime = job.end;
      } else if (job.end <= startTime) {
        finalResult += job.profit;
        startTime = job.start;
      }
    }
  });
  return finalResult;
}
// console.log(
//   findOptimumJobsSchedule([
//     { start: 1, end: 3, profit: 50 },
//     { start: 2, end: 5, profit: 20 },
//     { start: 4, end: 6, profit: 70 },
//     { start: 6, end: 7, profit: 60 },
//     { start: 5, end: 8, profit: 30 },
//     { start: 7, end: 9, profit: 40 },
//   ])
// );

// Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

// Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.

// Example 1:

// Input: g = [1,2,3], s = [1,1]
// Output: 1
// Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3.
// And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
// You need to output 1.
// Example 2:

// Input: g = [1,2], s = [1,2,3]
// Output: 2
// Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2.
// You have 3 cookies and their sizes are big enough to gratify all of the children,
// You need to output 2.
function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let i = 0;
  let j = 0;
  while (i <= g.length && j <= s.length) {
    if (s[j] >= g[i]) {
      i++;
      j++;
    } else {
      j++;
    }
  }
  return i;
}

// console.log(findContentChildren([1, 2], [1, 10, 2]));
// There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. You do not know the exact y-coordinates of the balloons.

// Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

// Given the array points, return the minimum number of arrows that must be shot to burst all balloons.

// Example 1:

// Input: points = [[10,16],[2,8],[1,6],[7,12]]
// Output: 2
// Explanation: The balloons can be burst by 2 arrows:
// - Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
// - Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  if (!points.length) return 0;

  // Sort balloons by their ending coordinate
  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let arrowPos = points[0][1]; // First arrow at the end of the first balloon

  for (let [xStart, xEnd] of points) {
    // If the balloon starts after the last shot arrow, we need a new arrow
    if (xStart > arrowPos) {
      arrows++;
      arrowPos = xEnd; // Update arrow position
    }
  }

  return arrows;
};

// Example usage
// console.log(
//   findMinArrowShots([
//     [10, 16],
//     [2, 8],
//     [1, 6],
//     [7, 12],
//   ])
// ); // Output: 2
// Given an integer array nums of 2n integers, group these integers into n pairs (a1, b1), (a2, b2), ..., (an, bn) such that the sum of min(ai, bi) for all i is maximized. Return the maximized sum.

// Example 1:

// Input: nums = [1,4,3,2]
// Output: 4
// Explanation: All possible pairings (ignoring the ordering of elements) are:
// 1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
// 2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
// 3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
// So the maximum possible sum is 4.
// Example 2:

// Input: nums = [6,2,6,5,1,2]
// Output: 9
// Explanation: The optimal pairing is (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9.
/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
  nums.sort((a, b) => a - b);
  let ans = 0;
  for (let i = 0; i < nums.length - 1; i = i + 2) {
    console.log(ans);
    ans += nums[i];
  }
  return ans;
};

console.log(arrayPairSum([6, 2, 6, 5, 1, 2]));
