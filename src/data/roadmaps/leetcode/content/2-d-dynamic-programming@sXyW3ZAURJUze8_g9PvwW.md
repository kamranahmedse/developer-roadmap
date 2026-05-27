# 2-D Dynamic Programming

Two-dimensional DP extends the same ideas to problems where the state depends on two variables simultaneously, typically two indices into two sequences or two dimensions of a grid. The table is now a matrix, and each cell is filled based on cells above it, to its left, or diagonally adjacent. The problems here include string comparison (edit distance, longest common subsequence), grid path counting, and interval DP where you think about ranges rather than prefixes. These problems tend to be harder to set up than 1-D DP, but once you identify the state and the transition, the code follows directly from the recurrence.

Visit the following resources to learn more:

- [@video@Learn Dynamic Programming with Animations – Full Course for Beginners](https://www.youtube.com/watch?v=66hDgWottdA)
- [@video@Dynamic Programming 2D - Full Course - Python](https://www.youtube.com/watch?v=qMky6D6YtXU)