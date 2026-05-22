# Two Heaps

The two heaps method uses a max-heap to store the lower half of the numbers and a min-heap to store the upper half. This setup allows you to quickly access the largest value of the lower half and the smallest value of the upper half in constant time. Insertions and deletions take logarithmic time, and the heaps are balanced so that the median can be found in O(1) time. This approach is especially useful for dynamically maintaining the median of a long or streaming data sequence, where repeatedly sorting the data would be inefficient (O(n log n) per sort).

Visit the following resources to learn more:

- [@article@Two Heaps — A Coding Pattern for Median-finding (Emre Bolat)](https://emre.me/coding-patterns/two-heaps/)
- [@video@Coding Pattern - Two Heaps](https://www.youtube.com/watch?v=9P7W5aEaatQ)
- [@article@Median of Running Stream - takeUforward](https://takeuforward.org/data-structure/median-of-running-stream/)
- [@article@Median of Stream of Running Integers - GeeksforGeeks](https://www.geeksforgeeks.org/median-of-stream-of-running-integers/)
- [@article@Two Heap Method - GeeksforGeeks](https://www.geeksforgeeks.org/two-heap-method/)