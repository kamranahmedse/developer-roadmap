# Knuth Morris Pratt

The Knuth-Morris-Pratt (KMP) algorithm searches for a pattern in text by preprocessing the pattern into a table that tracks the longest proper prefix that is also a suffix. This lets the algorithm skip re-checking characters it has already matched when a mismatch occurs, giving it O(n + m) time complexity.

Visit the following resources to learn more:

- [@course@Knuth-Morris Pratt](https://www.coursera.org/learn/algorithms-part2/lecture/TAtDr/knuth-morris-pratt)
- [@video@9.1 Knuth-Morris-Pratt KMP String Matching Algorithm](https://www.youtube.com/watch?v=V5-7GzOfADQ)