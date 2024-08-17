# Frustum Culling

Frustum culling is a standard practice in computer graphics, used in virtually all games to optimize performance by not rendering objects outside of your field of view. Think of your field of view as a frustum, a truncated pyramid shape. The farthest side is called the far clip plane, and the closest side is the near clip plane. Any object in the game that doesn't fall within this frustum is culled, meaning it’s not rendered, to improve performance. This feature comes built-in with Unreal Engine.

You can also adjust the near and far clip planes to fine-tune culling. For example, if an object is too close to the camera, it may disappear because it crosses the near clip plane threshold. Similarly, objects that are too far away might be culled by the far clip plane. In some cases, distant objects are LOD-ed (Level of Detail), an optimization technique that reduces the detail of the mesh the farther you are from it, and increases detail as you get closer.

Frustum culling is a fundamental technique that is implemented in virtually all modern games to ensure efficient rendering and smooth gameplay.

[@video@Frustum Culling - Game Optimization 101 - Unreal Engine](https://www.youtube.com/watch?v=Ql56s1erTMI)
