// Given a positive integer n, write a function that returns the number of
// set bits
//  in its binary representation (also known as the Hamming weight).

// Example 1:

// Input: n = 11

// Output: 3

// Explanation:

// The input binary string 1011 has a total of three set bits.
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    count += n & 1; // Check if the last bit is 1
    n = n >>> 1; // Unsigned right shift to process the next bit
  }
  return count;
}

// Example usage:
console.log(hammingWeight(11)); // Output: 3

// Given a string array words, return the maximum value of length(word[i]) * length(word[j]) where the two words do not share common letters. If no such two words exist, return 0.

// Example 1:

// Input: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
// Output: 16
// Explanation: The two words can be "abcw", "xtfn".
// Example 2:

// Input: words = ["a","ab","abc","d","cd","bcd","abcd"]
// Output: 4
// Explanation: The two words can be "ab", "cd".
// Example 3:

// Input: words = ["a","aa","aaa","aaaa"]
// Output: 0
// Explanation: No such pair of words.
/**
 * @param {string[]} words
 * @return {number}
 */
/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
  const n = words.length;
  const masks = new Array(n).fill(0);

  // Build bitmask for each word: O(n * L)
  for (let i = 0; i < n; i++) {
    let mask = 0;
    for (const ch of words[i]) {
      mask |= 1 << (ch.charCodeAt(0) - 97);
    }
    masks[i] = mask;
  }

  let best = 0;
  // Compare all pairs: O(n^2)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if ((masks[i] & masks[j]) === 0) {
        best = Math.max(best, words[i].length * words[j].length);
      }
    }
  }
  return best;
};
