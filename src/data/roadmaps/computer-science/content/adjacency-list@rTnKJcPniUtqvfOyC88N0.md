# Graph Representation

A graph can either be represented as an adjacency matrix or an adjacency list.

The adjacency matrix is a 2D array of size `V x V` where `V` is the number of vertices in a graph. Let the 2D array be `adj[][]`, a slot `adj[i][j] = 1` indicates that there is an edge from vertex `i` to vertex `j`.

Adjacency list is an array of vectors. Size of the array is equal to the number of vertices. Let the array be `array[]`. An entry `array[i]` represents the list of vertices adjacent to the ith vertex. This representation can also be used to represent a weighted graph. The weights of edges can be represented as lists of pairs.

Visit the following resources to learn more:

- [@article@Adjacency Matrix - Graph Representation](https://www.programiz.com/dsa/graph-adjacency-matrix)
- [@article@Adjacency List - Graph Representation](https://www.programiz.com/dsa/graph-adjacency-list)