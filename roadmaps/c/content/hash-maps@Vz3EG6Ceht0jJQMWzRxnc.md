# Hash Maps

A hash map stores key-value pairs and uses a hash function to convert each key into an index into an underlying array, allowing average constant-time lookup, insertion, and deletion. Since C has no built-in hash map, implementing one involves writing a hash function, handling collisions when two keys hash to the same index, and managing the underlying array's resizing. Common collision-handling strategies include chaining, where colliding entries form a linked list, and open addressing, where the map probes for the next free slot.

Visit the following resources to learn more:

- [@article@How to implement a hash table (in C)](https://benhoyt.com/writings/hash-table-in-c/)
- [@video@Understanding and implementing a Hash Table (in C)](https://www.youtube.com/watch?v=2Ti5yvumFTU)