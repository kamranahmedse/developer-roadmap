# Tree-Based Indexing

Tree-based indexing involves using data structures that follow a tree-like model, with parent nodes, child nodes, and leaf nodes in a hierarchical order. Two popular tree-based indexing methods are B-tree and B+ tree. In a B-tree index, every data record is associated with a leaf node, while internal nodes can be linked to a number of lower nodes within a certain range. On the other hand, B+ tree index structure makes all records reside at the leaf level, with the internal nodes only containing key values. The path from the root to every leaf node in both B-tree and B+ tree is the same length, which allows for efficient and consistent retrieval times.

Visit the following resources to learn more:

- [@article@Tree-based Indexing — OpenDSA](https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/TreeIndexing.html)
- [@article@Understanding Database Indexes — B-Trees, LSM Trees](https://dev.to/aws-builders/understanding-database-indexes-and-their-data-structures-hashes-ss-tables-lsm-trees-and-b-trees-2dk5)
- [@article@Introduction of B+ Tree — GeeksforGeeks](https://www.geeksforgeeks.org/dbms/introduction-of-b-tree/)