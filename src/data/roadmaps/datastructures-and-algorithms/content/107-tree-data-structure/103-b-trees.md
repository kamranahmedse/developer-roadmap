# B-Trees

B-Tree is a self-balanced search tree data structure that maintains sorted data and allows for efficient insertion, deletion, and search operations. It is most commonly used in systems where read and write operations are performed on disk, such as databases and file systems. The main characteristic of a B-Tree is that all leaves are at the same level, and the internal nodes can store more than one key. Each node in a B-Tree contains a certain number of keys and pointers which navigate the tree. The keys act as separation values which divide its subtrees. For example, if a node contains the values [10,20,30] it has four children: the first contains values less than 10, the second contains values between 10 and 20, the third contains values between 20 and 30, and the fourth contains values greater than 30.

Learn more from the following links:

- [@article@Introduction of B-Tree](https://www.geeksforgeeks.org/introduction-of-b-tree-2/)
- [@video@B-trees in 4 minutes — Intro](https://www.youtube.com/watch?v=FgWbADOG44s)
