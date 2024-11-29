# Convexity

Convexity is a significant concept used in game development, particularly in the narrow phase of collision detection. A shape is considered convex if, for every pair of points inside the shape, the complete line segment between them is also inside the shape. Essentially, a convex shape has no angles pointing inwards. Convex shapes can be of great benefit in game development because they're simpler to handle computationally. For instance, in collision detection algorithms such as separating axis theorem (SAT) and Gilbert–Johnson–Keerthi (GJK), the input shapes are often convex. Non-convex shapes or concave shapes usually require more complex methods for collision detection, often involving partitioning the shape into smaller convex parts.

Visit the following resources to learn more:

- [@article@Convexity in Game Development](https://www.gamedeveloper.com/game-platforms/understanding-convexity-in-ltv-modelling)
