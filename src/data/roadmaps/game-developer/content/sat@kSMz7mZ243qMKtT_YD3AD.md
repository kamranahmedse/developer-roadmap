# SAT

`Sat`, or separating axis theorem, is frequently used in collision detection in game development. Its primary benefit is for simple and fast detection of whether two convex polygons intersect. The theorem is somewhat complex—it works by projecting all points of both polygons onto numerous axes around the shapes, then checking for overlaps. However, it can be relatively time-consuming when dealing with more complex models or numerous objects as it has to calculate the projections, so often it is used in a broad-phase detection system. A deep explanation of how `sat` works might involve some mathematical concepts or visual aids, but this is the foundation of its use in game development.

Visit the following resources to learn more:

- [@article@Separating Axis Theorem](https://dyn4j.org/2010/01/sat/)
- [@article@Collision Detection Using the Separating Axis Theorem](https://code.tutsplus.com/collision-detection-using-the-separating-axis-theorem--gamedev-169t)
