# Reconstruct Itinerary

Given a list of airline tickets, reconstruct the itinerary in lexical order starting from JFK, using all tickets exactly once. You use DFS with a sorted adjacency list and add nodes to the result only after all their outgoing edges are exhausted, which is Hierholzer's algorithm for Eulerian paths. This problem teaches you a non-obvious graph traversal where the order of adding nodes to the result is reversed.

Visit the following resources to learn more:

- [@article@Reconstruct Itinerary](https://leetcode.com/problems/reconstruct-itinerary/)
- [@video@Reconstruct Itinerary | Leetcode #332](https://www.youtube.com/watch?v=WYqsg5dziaQ)
- [@video@Leetcode - Reconstruct Itinerary (Python)](https://www.youtube.com/watch?v=iHhNWam4BSM)