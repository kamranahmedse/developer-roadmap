# Bellman-Ford

The **Bellman Ford algorithm** is a method used in graph theory for finding the shortest path between a single source vertex and all other vertices in a weighted graph. This algorithm is significant because it is capable of handling graphs with negative weight edges, unlike Dijkstra's algorithm. It follows a bottom-up approach, filling up the distance table gradually while relaxing edges. The algorithm gets its name from its developers, Richard Bellman and Lester Ford. However, it can lead to an infinite loop if there are negative weight cycles in the graph, which should be addressed separately using another check.

Visit the following resources to learn more:

- [@article@Bellman-Ford Algorithm - GeeksforGeeks](https://www.geeksforgeeks.org/dsa/bellman-ford-algorithm-dp-23/)
- [@article@Bellman Ford's Algorithm - Programiz](https://www.programiz.com/dsa/bellman-ford-algorithm)
- [@article@Bellman-Ford Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm)