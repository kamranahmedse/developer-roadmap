# Frustum Culling

Frustum culling is a standard practice in computer graphics, used in virtually all games to optimize performance by not rendering objects outside of your field of view. Think of your field of view as a frustum, a truncated pyramid shape. The farthest side is called the far clip plane, and the closest side is the near clip plane. Any object in the game that doesn't fall within this frustum is culled, meaning it’s not rendered, to improve performance. This feature comes built-in with Unreal Engine.

Visit the following resources to learn more:

- [@article@Frustum Culling](https://gamedev.net/tutorials/programming/general-and-gameplay-programming/frustum-culling-r4613/)
- [@video@Frustum Culling - Game Optimization 101 - Unreal Engine](https://www.youtube.com/watch?v=Ql56s1erTMI)
