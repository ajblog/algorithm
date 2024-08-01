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

console.log(minCoins([1, 2, 5], 11)); //3
