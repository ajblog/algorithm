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

console.log(waysToBuyPensPencils(23, 10, 3));
