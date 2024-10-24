# DBVT

`DBVT` or `Dynamic Bounding Volume Tree` is an acceleration data structure that's primarily used in physics simulations like collision detection. It's a type of BVH (`Bounding Volume Hierarchy`), but the unique aspect of a DBVT is its handling of dynamic objects. As the name suggests, it's specifically designed to efficiently handle changing scenarios, such as objects moving or environments evolving, better than a typical BVH. Unlike a static BVH, a DBVT dynamically updates the tree as objects move, maintaining efficiency of collision queries. It primarily does this through tree rotations and refitting bounding volumes rather than fully rebuilding the tree. This makes DBVT a highly appealing option for scenarios with considerable dynamics.

Learn more from the following resources:

- [@article@DBVT](https://sopiro.github.io/DynamicBVH/)
- [@article@Dynamic Bounding Volume Hierarchies](https://box2d.org/files/ErinCatto_DynamicBVH_Full.pdf)
