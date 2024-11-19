# BVH

BVH, or Bounding Volume Hierarchy, is an algorithm used in 3D computer graphics to speed up the rendering process. It organizes the geometry in a hierarchical structure where each node in the tree represents a bounding volume (a volume enclosing or containing one or more geometric objects). The root node of the BVH contains all other nodes or geometric objects, its child nodes represent a partition of the space, and the leaf nodes are often individual geometric objects. The main objective of using BVH is to quickly exclude large portions of the scene from the rendering process, to reduce the computational load of evaluating every single object in the scene individually.

Visit the following resources to learn more:

- [@opensource@UnityBoundingVolumeHeirachy](https://github.com/rossborchers/UnityBoundingVolumeHeirachy)
