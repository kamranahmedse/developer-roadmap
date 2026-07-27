# Sort and Sweep

**Sort and Sweep** is an algorithm used in collision detection in game development which optimizes the process of identifying potential intersecting objects. Here's how it works: first, all objects in the game are sorted along a specific axis (typically the 'x' axis). Then a line (known as the 'sweep line') is moved along this axis. As the line sweeps over the scene, any objects that cross this line are added to an 'active' list. When an object no longer intersects with the sweep line, it's removed from this list. The only objects checked for intersection are those within this 'active' list reducing the number of checks required. This makes sort and sweep an efficient spatial partitioning strategy.

Visit the following resources to learn more:

- [@article@Sort, Sweep and Prune](https://leanrada.com/notes/sweep-and-prune/)
- [@article@Collision Detection Algorithm](https://notes.billmill.org/visualization/interactive_explainers/sort__sweep_and_prune_-_collision_detection_algorithms.html)
