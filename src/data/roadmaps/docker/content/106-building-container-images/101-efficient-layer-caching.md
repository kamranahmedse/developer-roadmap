# Efficient Layer Caching

When building container images, Docker caches the newly created layers. These layers can then be used later on when building other images, reducing the build time and minimizing bandwidth usage. However, to make the most of this caching mechanism, you should be aware of how to efficiently use layer caching.

## How Docker Layer Caching Works

Docker creates a new layer for each instruction (e.g., `RUN`, `COPY`, `ADD`, etc.) in the Dockerfile. If the instruction hasn't changed since the last build, Docker will reuse the existing layer.

For example, consider the following Dockerfile:

```dockerfile
FROM node:14

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

CMD ["npm", "start"]
```

Visit the following resources to learn more:

- [@official@Docker Layer Caching](https://docs.docker.com/build/cache/)
