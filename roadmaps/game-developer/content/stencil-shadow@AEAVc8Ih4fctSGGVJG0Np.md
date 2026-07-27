# Stencil Shadow

`Stencil shadows` are a technique used in 3D computer graphics for creating shadows. The stencil shadow algorithm operates by treating a shadow as a 3D volume of space, known as a shadow volume. Any part of the scene that lies inside this shadow volume will be in shadow. If it lies outside the shadow volume, it will be in light. The shadow volume is created by extruding the polygonal silhouette of a 3D object into space along the lines of sight from the light source. For equivalent complex objects, the number of edges or vertices to fill the stencil buffer will generally be less than the number of pixels needed to compute shadow maps, making stencil shadows more efficient in that regard. However, the shadows produced by this technique can look blocky or unrealistic if not further refined.

Visit the following resources to learn more:

- [@article@Stencil Shadows Implementation](https://devforum.roblox.com/t/stencil-shadows-implementation/2079287)
