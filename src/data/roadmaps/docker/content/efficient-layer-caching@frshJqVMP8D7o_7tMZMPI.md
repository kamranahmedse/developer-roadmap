# Efficient Layer Caching

When building container images, Docker caches the newly created layers. These layers can then be used later on when building other images, reducing the build time and minimizing bandwidth usage. However, to make the most of this caching mechanism, you should be aware of how to efficiently use layer caching. Docker creates a new layer for each instruction (e.g., `RUN`, `COPY`, `ADD`, etc.) in the Dockerfile. If the instruction hasn't changed since the last build, Docker will reuse the existing layer.

Visit the following resources to learn more:

- [@official@Docker Layer Caching](https://docs.docker.com/build/cache/)
- [@video@Layer Caching](https://www.youtube.com/watch?v=_nMpndIyaBU)