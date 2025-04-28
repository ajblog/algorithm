package main

import (
	"fmt"
)

func countSubarrays(nums []int, k int) int {
	start := 0
	windowSum := 0
	ans := 0

	for end := 0; end < len(nums); end++ {
		windowSum += nums[end]

		for windowSum*(end-start+1) >= k {
			windowSum -= nums[start]
			start++
		}

		ans += end - start + 1
	}

	return ans
}

func main() {
	nums := []int{2, 1, 4, 3, 5}
	k := 10
	fmt.Println(countSubarrays(nums, k)) // Output: 6
}
