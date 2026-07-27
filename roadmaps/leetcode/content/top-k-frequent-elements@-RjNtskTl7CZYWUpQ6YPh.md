# Top K Frequent Elements

Given an array and a number k, return the k most frequent elements. You could sort by frequency, but the optimal approach uses bucket sort. Since no element can appear more times than the length of the array, you can create buckets indexed by frequency and scan from the top. This problem bridges hash maps and sorting, and introduces the idea that the constraints of a problem often suggest a faster algorithm.

Visit the following resources to learn more:

- [@article@Top K Frequent Elements - LeetCode](https://leetcode.com/problems/top-k-frequent-elements/description/)
- [@video@Top K Elements in 6 minutes](https://www.youtube.com/watch?v=6_v6OoxvMOE)