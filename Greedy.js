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

console.log(largestPausedNumber(10));
