# Bounding Volume

`Bounding Volume` is a simple shape that fully encompasses a more complex game model. It is less expensive to check for the intersection of bounding volumes when compared to checking for intersection of the actual models. Some commonly used types of bounding volume in game development include Axis-Aligned Bounding Boxes (AABBs), Bounding Spheres, and Oriented Bounding Boxes (OBBs). AABBs and Bounding Spheres are simple to implement and work well with static objects, while OBBs are slightly more complex and are often used with dynamic objects that need to rotate.

Visit the following resources to learn more:

- [@article@Collision Detection in 3D Games](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection)
- [@article@Visualizing Bounding Volume](https://www.haroldserrano.com/blog/visualizing-the-boundary-volume-hierarchy-collision-algorithm)
