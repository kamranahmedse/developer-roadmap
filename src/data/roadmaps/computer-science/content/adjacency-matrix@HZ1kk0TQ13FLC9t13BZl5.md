# Adjacency Matrix

An adjacency matrix is a 2D array used to represent a graph. The matrix has a size of V x V, where V is the number of vertices in the graph. Each element in the matrix, represented by adj[i][j], indicates whether there is an edge between vertex i and vertex j.

If adj[i][j] = 1, it means there is an edge from vertex i to vertex j.
If adj[i][j] = 0, it means there is no edge between vertex i and vertex j.
For undirected graphs, the adjacency matrix will be symmetric, as the edge between two vertices works in both directions. In weighted graphs, instead of storing 1 and 0, the matrix stores the actual weights of the edges, and a 0 or some special marker (like infinity) to indicate no connection.

Characteristics:

Space Complexity: Uses O(V^2) space, where V is the number of vertices.
Time Complexity: Checking if an edge exists between two vertices takes O(1) time, but traversing all edges takes O(V^2) time.
This representation is ideal for dense graphs where most vertex pairs are connected.
