# Narrow Phase

The **Narrow Phase** of collision detection is a process that dives deeply into detailed collision checks for pairs of objects that are already found to be potentially colliding during the broad phase. Narrow phase is essentially a fine-tuning process. Upon positive detection from the broad phase, it identifies the precise points of collision between the two objects, and it may involve more detailed shape representations and more expensive algorithms. It might also calculate additional information necessary for the physics simulation (like the exact time of impact and contact normals). The usual methods used for this phase involve bounding box, bounding sphere or separating axis theorem. However, the method can vary depending on the complexity of shapes of objects and the specific needs of the game.

Visit the following resources to learn more:

- [@article@Narrow Phase in Game Development](https://rocketbrush.com/blog/game-development-process-guide)
