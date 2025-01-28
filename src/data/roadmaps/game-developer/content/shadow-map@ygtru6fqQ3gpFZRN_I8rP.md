# Shadow Map

Shadow mapping is a technique used in computer graphics to add shadows to a scene. This process involves two steps - generating the shadow map and then rendering the scene. In the shadow map generating step, the scene is rendered from the perspective of the light source capturing depth information. This results in a texture that stores the distance from the light to the nearest surface along each light direction, a “shadow map”. In the scene rendering step, the scene is rendered from the camera’s perspective. For each visible surface point, its distance from the light is calculated and compared to the corresponding stored distance in the shadow map. If the point's distance is greater than the stored distance, the point is in shadow-sm; otherwise, it's lit. This information is used to adjust the color of the point, producing the shadow effect.

Visit the following resources to learn more:

- [@article@Shadow Mapping Techniques](https://dev.to/hayyanstudio/shadow-mapping-techniques-implementing-shadows-in-3d-scenes-using-shadow-mapping-46hl/)
- [@article@A Beginner's Guide to Shadow Mapping](https://gamedev.net/blog/2080/entry-2261232-shadow-mapping-part-1-pcf-and-vsms/)
