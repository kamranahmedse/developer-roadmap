# OBB

`Oriented Bounding Box (OBB)` is a type of bounding volume used in computer graphics and computational geometry. It is often used to simplify complex geometric objects by correlating them as a box much closer in size and orientation to the actual object. Unlike the `Axis-Aligned Bounding Box (AABB)`, the `OBB` is not constrained to align with the axis, so the box can be rotated. This orientation is usually chosen based on the object's local coordinate system, so the `OBB` maintains its rotation. Properties of an `OBB` include its center, dimensions, and orientation. However, it is worth noting that `OBBs` can be more computationally intensive than `AABBs` due to mathematical complexity.

Visit the following resources to learn more:

- [@article@OBB vs OBB Collision Detection](https://gamedev.stackexchange.com/questions/25397/obb-vs-obb-collision-detection)
- [@article@Oriented Bounding Box](https://gamedev.stackexchange.com/questions/49041/oriented-bounding-box-how-to)
