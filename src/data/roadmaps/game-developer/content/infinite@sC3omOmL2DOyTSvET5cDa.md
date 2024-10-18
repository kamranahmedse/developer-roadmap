# Infinite Shadow Volumes

**Infinite Shadow Volumes** refer to shadow volumes that extend infinitely from the shadow caster. This technique eliminates the need to artificially cap the shadow volume, which can lead to visual artifacts. Infinite shadow volumes are especially useful when dealing with large open environments or when objects casting shadows are far from the camera.

In a traditional shadow volume, the shadow geometry is capped at a certain distance, which can cause inaccuracies and popping artifacts when the camera moves through the scene. With **Infinite Shadow Volumes**, the shadow geometry extends to infinity in the opposite direction of the light source, preventing such issues.
