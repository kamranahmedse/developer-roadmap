# Sliding Window

The sliding window pattern is used when you need to find an optimal subarray or substring that satisfies some constraint. Instead of checking every possible subarray from scratch, you maintain a window with two pointers and update the result incrementally as the window expands or shrinks. Fixed-size windows are straightforward; variable-size windows require a clear rule for when to shrink from the left. This stage also introduces the monotonic deque, which extends sliding window to problems that need the maximum or minimum within the window at each step.

Visit the following resources to learn more:

- [@article@Sliding Window Technique: A Comprehensive Guide](https://leetcode.com/discuss/post/3722472/sliding-window-technique-a-comprehensive-ix2k/)
- [@article@Sliding Window in 7 minutes | LeetCode Pattern](https://www.youtube.com/watch?v=y2d0VHdvfdc)