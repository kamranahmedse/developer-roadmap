# AABB

`AABB`, short for Axis-Aligned Bounding Box, is a commonly used form of bounding volume in game development. It is a box that directly aligns with the axes of the coordinate system and encapsulates a game object. The sides of an AABB are aligned with the axes, which is helpful when carrying out certain calculations, as non-axis-aligned boxes would require more complex math. AABBs are primarily used for broad-phase collision detection, which means checking whether two objects might be in the process of colliding. Although AABBs are relatively conservative and can have more bounding volume than oriented bounding boxes (OBBs), they are simpler and faster to use in collision detection.

Visit the following resources to learn more:

- [@article@Axis-Aligned Bounding Box](https://gdbooks.gitbooks.io/3dcollisions/content/Chapter1/aabb.html)
