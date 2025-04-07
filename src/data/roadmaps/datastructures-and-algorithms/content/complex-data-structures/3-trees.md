# 2-3 trees

2-3 trees are self-balancing search trees, a type of B-tree specifically designed to have two or three children per internal node. Each internal node contains either one or two keys. If a node has one key, it has two children; if it has two keys, it has three children. All leaf nodes appear at the same level, ensuring the tree remains balanced. This structure guarantees logarithmic time complexity for insertions, deletions, and searches, making 2-3 trees efficient for maintaining sorted data. While conceptually important, 2-3 trees are often used as a stepping stone to understand more practical data structures like red-black trees, which are binary tree implementations of 2-3 trees.

Learn more from the following resources:

- [@article@2-3 Trees](https://cathyatseneca.gitbooks.io/data-structures-and-algorithms/content/2-3_trees/)
- [@course@Princeton 2-3 Trees PDF](https://www.cs.princeton.edu/~dpw/courses/cos326-12/ass/2-3-trees.pdf)
- [@video@2-3 Trees and B-Trees](https://www.youtube.com/watch?v=TOb1tuEZ2X4)