# Bump

`Bump` is very similar to texture. It is, as a matter of fact, a type of texture itself. If you take the texture of a bricked wall, it will becoming increasingly obvious that the amount of detail present inside the wall, if geometrically processed would be incredibly demanding and wasteful. In order to combat this ineffeciency, the `bump` maps were created. Traditionally, a flat texture would just be an image of something called a `color map`, that is to say, where does each individual color of the pixel should be to represent a texture. When you take the picture of your floor, wall, or any object, that image in essence is the color map. The bump map is different as it informs the texture about it's `normal` values. So, if you take a flat 2D mesh and apply a bump map on it, it will render the same 2D mesh with all the normal values baked into the flat 2D mesh, creating a graphically effect mimicking 3-dimensionality. 

There is also something known as a normal map, and displacement maps.

Learn more from the following resources:

- [@video@Normals, Normal maps and Bump maps](https://www.youtube.com/watch?v=l5PYyzsZED8)
- [@video@Bump, normal and displacement](https://www.youtube.com/watch?v=43Ilra6fNGc)
