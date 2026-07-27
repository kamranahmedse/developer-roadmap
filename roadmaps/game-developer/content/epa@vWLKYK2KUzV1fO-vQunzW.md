# EPA

The **EPA** (Expanding Polytope Algorithm) is an iterative algorithm used for calculating the penetration depth between two shapes in collision detection. It is commonly used in physics engines and robotics. The algorithm takes the resulting simplex from a previously applied GJK algorithm, iteratively expanding the polytope towards the Minkowski Difference boundary until it finds the closest point to the origin. The vector from that point to the origin is the penetration vector and its magnitude is equal to the penetration depth between the two shapes.

Visit the following resources to learn more:

- [@article@EPA: Collision response algorithm for 2D/3D - winter.dev](https://winter.dev/articles/epa-algorithm)
- [@article@EPA (Expanding Polytope Algorithm) - dyn4j](https://dyn4j.org/2010/05/epa-expanding-polytope-algorithm/)
