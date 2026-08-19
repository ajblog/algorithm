// You are given an integer total indicating the amount of money you have. You are also given two integers cost1 and cost2 indicating the price of a pen and pencil respectively. You can spend part or all of your money to buy multiple quantities (or none) of each kind of writing utensil.

// Return the number of distinct ways you can buy some number of pens and pencils./**
/**
 * @param {number} total
 * @param {number} cost1
 * @param {number} cost2
 * @return {number}
 */
var waysToBuyPensPencils = function (total, cost1, cost2) {
  let biggerNum = cost1 >= cost2 ? cost1 : cost2;
  let smallerNum = cost1 < cost2 ? cost1 : cost2;

  let biggerQ = Math.floor(total / biggerNum);
  let ways = 0;
  for (let i = 0; i <= biggerQ; i++) {
    ways += Math.floor((total - biggerNum * i) / smallerNum);
  }
  return ways + (biggerQ + 1);
};

// Given an array nums of integers, return how many of them contain an even number of digits.

// Example 1:

// Input: nums = [12,345,2,6,7896]
// Output: 2
// Explanation:
// 12 contains 2 digits (even number of digits).
// 345 contains 3 digits (odd number of digits).
// 2 contains 1 digit (odd number of digits).
// 6 contains 1 digit (odd number of digits).
// 7896 contains 4 digits (even number of digits).
// Therefore only 12 and 7896 contain an even number of digits.
// Example 2:

// Input: nums = [555,901,482,1771]
// Output: 1
// Explanation:
// Only 1771 contains an even number of digits.
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumbers = function (nums) {
  let ans = 0;
  nums.forEach((item) => {
    if (item.toString().length % 2 === 0) ans += 1;
  });
  return ans;
};

// console.log(findNumbers([12, 345, 2, 6, 7896]));
// Given a list of dominoes, dominoes[i] = [a, b] is equivalent to dominoes[j] = [c, d] if and only if either (a == c and b == d), or (a == d and b == c) - that is, one domino can be rotated to be equal to another domino.

// Return the number of pairs (i, j) for which 0 <= i < j < dominoes.length, and dominoes[i] is equivalent to dominoes[j].

// Example 1:

// Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
// Output: 1
// Example 2:

// Input: dominoes = [[1,2],[1,2],[1,1],[1,2],[2,2]]
// Output: 3

// Constraints:

// 1 <= dominoes.length <= 4 * 104
// dominoes[i].length == 2
// 1 <= dominoes[i][j] <= 9
/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function (dominoes) {
  let ans = 0;
  let hashMap = new Map();
  function sortedString(domino) {
    let temp = [];
    if (domino[0] >= domino[1]) {
      temp.push(domino[1]);
      temp.push(domino[0]);
      return temp.join("");
    } else {
      temp.push(domino[0]);
      temp.push(domino[1]);
      return temp.join("");
    }
  }

  dominoes = dominoes.map((item) => sortedString(item));
  dominoes.forEach((domino) => {
    if (hashMap.has(domino)) hashMap.set(domino, hashMap.get(domino) + 1);
    else hashMap.set(domino, 1);
  });
  for (const [_key, value] of hashMap) {
    if (value !== 1) ans += (value * (value - 1)) / 2;
  }
  return ans;
};

// You are given a 2D integer array drones, where drones[i] = [xi, yi, rangei] represents the x-coordinate, y-coordinate, and travel range of the ith drone.

// You are also given an integer array target = [tx, ty], representing the coordinates of the target.

// A drone drones[i] can reach the target if the Manhattan distance between its coordinates and the target coordinates is less than or equal to its rangei.

// Return the index of the reachable drone with the minimum Manhattan distance to the target. If there is a tie, return the smallest index. If no drone can reach the target, return -1.

// Example 1:

// Input: drones = [[0,0,8],[2,2,9]], target = [3,4]

// Output: 1

// Explanation:

// The distance between drones[0] and target is |0 - 3| + |0 - 4| = 7, which is within its range of 8.
// The distance between drones[1] and target is |2 - 3| + |2 - 4| = 3, which is within its range of 9.
// Since drones[1] is the nearest drone, the answer is 1.
// Example 2:

// Input: drones = [[2,1,5],[4,4,5],[6,6,8]], target = [5,5]

// Output: 1

// Explanation:

// The distance between drones[0] and target is |2 - 5| + |1 - 5| = 7, which is greater than its range of 5.
// The distance between drones[1] and target is |4 - 5| + |4 - 5| = 2, which is within its range of 5.
// The distance between drones[2] and target is |6 - 5| + |6 - 5| = 2, which is within its range of 8.
// Both drones[1] and drones[2] are the nearest drones. Since we should return the smallest index, the answer is 1.
// Example 3:

// Input: drones = [[4,4,5]], target = [8,6]

// Output: -1

// Explanation:

// The distance between drones[0] and target is |4 - 8| + |4 - 6| = 6, which is greater than its range of 5.
// No drone can reach the target, so the answer is -1.
/**
 * @param {number[][]} drones
 * @param {number[]} target
 * @return {number}
 */
var nearestDrone = function (drones, target) {
  const map = new Map();
  function manhanttan_distance(first, second) {
    return Math.abs(first[0] - second[0]) + Math.abs(first[1] - second[1]);
  }
  drones.forEach((item, index) => {
    let distance = manhanttan_distance([item[0], item[1]], target);
    if (item[2] - distance >= 0) {
      map.set(index, distance);
    }
  });
  let min = Infinity;
  let ans = -1;
  for (const [key, value] of map) {
    if (value < min) {
      min = value;
      ans = key;
    }
  }
  return ans;
};
