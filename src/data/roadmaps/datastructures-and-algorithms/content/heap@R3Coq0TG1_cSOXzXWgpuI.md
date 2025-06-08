# Heap

A heap is a specialized tree-based data structure that satisfies the heap property: in a max-heap, every parent node is greater than or equal to its children, while in a min-heap, every parent node is less than or equal to its children. Heaps are typically implemented as complete binary trees and are most commonly stored in arrays for memory efficiency. The key insight is that despite being conceptually a tree, the parent-child relationships can be calculated using simple array index formulas: for element at index i, its parent is at (i-1)/2, left child at 2i+1, and right child at 2i+2. Heaps excel at maintaining priority relationships and providing quick access to the maximum or minimum element in O(1) time, while insertion and deletion operations run in O(log n). They're fundamental to priority queues, heapsort algorithm, and graph algorithms like Dijkstra's shortest path, making them essential for efficient algorithm design.
Learn more from the following resources:


- [@article@Heap Data Structure](https://www.programiz.com/dsa/heap-data-structure)
- [@article@Binary Heap](https://www.geeksforgeeks.org/binary-heap/)
- [@video@Heap Data Structure](https://www.youtube.com/watch?v=t0Cq6tVNRBA)
- [@video@Heaps and Priority Queues](https://www.youtube.com/watch?v=B7hVxCmfPtM)
