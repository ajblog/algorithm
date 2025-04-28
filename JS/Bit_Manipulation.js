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
