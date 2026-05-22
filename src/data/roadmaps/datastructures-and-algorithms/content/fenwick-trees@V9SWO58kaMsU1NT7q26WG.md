# Fenwick Trees

Fenwick Trees, also known as Binary Indexed Trees, are data structures that can efficiently support the operation of updating elements and calculating prefix sums in a table of numbers. This makes it particularly useful in situations where the table gets updated often and different kinds of queries (such as sum of elements) need to be answered fast. A Fenwick Tree typically takes O(log n) time for both updation and query operations, which is more efficient than an array or a segment tree. It achieves this efficiency by storing partial sum information in the array. This allows for efficient calculation of sum ranges, with the operation of adding an element and getting the sum of a range both achieve in O(log n) time.
Visit the following resources to learn more:

- [@article@Binary Indexed Trees - Topcoder](https://www.topcoder.com/community/competitive-programming/tutorials/binary-indexed-trees/)
- [@article@Binary Indexed Tree or Fenwick Tree - GeeksforGeeks](https://www.geeksforgeeks.org/dsa/binary-indexed-tree-or-fenwick-tree-2/)
- [@article@Fenwick Tree - Algorithms for Competitive Programming](https://cp-algorithms.com/data_structures/fenwick.html)
