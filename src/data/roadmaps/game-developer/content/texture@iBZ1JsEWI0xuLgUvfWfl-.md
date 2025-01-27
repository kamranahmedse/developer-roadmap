# Texture

`Texture` is the visual quality of an object. Where the `mesh` determines the shape or `topology` of an object, the texture describes the quality of said object. For instance, if there is a spherical mesh, is it supposed to be shiny? is it supposed to be rough? is it supposed to be of rock or of wood? questions of this ilk are often resolved using textures. Textures are often just 2D images that are wrapped onto 3D meshes. The 3D mesh is first divided into segments and unfurled; the 3D meshes are converted into 2D chunks, this process is known as `UV Unwrapping`. Once a mesh has been unwrapped, the textures in the form of an image are applied to the 2D chunks of the 3D mesh, this way the texture knows how to properly wrap around the mesh and avoid any conflicts. Textures determine the visual feel and aesthetics of the game.

Visit the following resources to learn more:

- [@article@Textures and Materials](https://gamedevinsider.com/making-games/game-artist/texturing-and-materials/)
- [@video@How Nintendo Textures Work](https://www.youtube.com/watch?v=WrCMzHngLxI)
- [@video@How Pixar Textures work](https://www.youtube.com/watch?v=o_I6jxlN-Ck)
