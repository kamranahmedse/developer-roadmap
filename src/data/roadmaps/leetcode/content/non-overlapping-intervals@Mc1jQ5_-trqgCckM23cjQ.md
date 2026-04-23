# Non-overlapping Intervals

Given a list of intervals, find the minimum number of intervals to remove so that the rest do not overlap. You sort by end time and greedily keep every interval that does not conflict with the last kept one. This problem teaches the classic interval scheduling insight: always prefer the interval that ends earliest, since it leaves the most room for future intervals.

Visit the following resources to learn more:

- [@article@Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- [@video@Non-overlapping Intervals - LeetCode 435 - Python](https://www.youtube.com/watch?v=2LUQ6tBdGxo)
- [@video@Non-overlapping Intervals (LeetCode 435)](https://www.youtube.com/watch?v=XsrJgwGlRoc)