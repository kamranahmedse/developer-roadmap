# K Closest Points to Origin

Given a list of points, return the k closest to the origin. A max-heap of size k keeps the k smallest distances seen so far, ejecting any point farther than the current kth closest as you iterate. This problem shows how to adapt the top-k pattern to a custom comparison and is good practice for heap problems with custom keys.

Visit the following resources to learn more:

- [@article@K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)
- [@video@K Closest Points to Origin | Leetcode #973](https://www.youtube.com/watch?v=VORIA407dB4)
- [@video@K Closest Points to Origin - Leetcode 973 - Heaps (Python)](https://www.youtube.com/watch?v=IGRUukbD6p8)