package java;

class Solution {
    // Given a positive integer num represented as a string, return the integer num without trailing zeros as a string.
    // Example 1:

    // Input: num = "51230100"
    // Output: "512301"
    // Explanation: Integer "51230100" has 2 trailing zeros, we remove them and return integer "512301".
    public String removeTrailingZeros(String num) {
        int number_of_zeros = 0;
        for (int i = num.length() - 1; i >= 0; i--) {
            if (num.charAt(i) != '0') {
                break;
            } else {
                number_of_zeros++;
            }
        }
        return num.substring(0, num.length() - number_of_zeros);
    }

}
